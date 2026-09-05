"""Check crawler-visible SEO after `npm run build`, without JavaScript or dependencies."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse
import json
import unittest
import xml.etree.ElementTree as ET


SITE = "https://www.wiqonn.com"
OUT = Path(__file__).resolve().parents[1] / "out"
PAGES = {
    "/": ("index.html", "es"),
    "/en": ("en.html", "en"),
    "/blog": ("blog.html", "en"),
    "/blog/dgx-spark-finetune": ("blog/dgx-spark-finetune.html", "en"),
    "/blog/vllm-mlx": ("blog/vllm-mlx.html", "en"),
    "/brochure/": ("brochure/index.html", "en"),
    "/brochure/es/": ("brochure/es/index.html", "es"),
}


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.lang = None
        self.meta = {}
        self.canonicals = []
        self.alternates = {}
        self.links = []
        self.headings = []
        self.images = []
        self.title = ""
        self.active = None
        self.email_protected = False
        self.unprotected_emails = []
        self.body_text = []
        self.in_body = False
        self.ignored_tag = None
        self.json_ld = []
        self.script_text = None
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "body":
            self.in_body = True
        if tag in ("script", "style"):
            self.ignored_tag = tag
            if attrs.get("type") == "application/ld+json":
                self.script_text = ""
        if tag == "html":
            self.lang = attrs.get("lang")
        elif tag == "meta":
            key = attrs.get("name", attrs.get("property"))
            self.meta.setdefault(key, []).append(attrs.get("content", ""))
        elif tag == "link":
            if attrs.get("rel") == "canonical":
                self.canonicals.append(attrs.get("href"))
            elif attrs.get("hreflang"):
                self.alternates[attrs["hreflang"]] = attrs.get("href")
        elif tag == "a":
            self.links.append([attrs.get("href", ""), ""])
            self.active = "a"
            if attrs.get("href", "").startswith("mailto:") and not self.email_protected:
                self.unprotected_emails.append(attrs["href"])
        elif tag == "title":
            self.active = "title"
        elif tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self.headings.append((int(tag[1]), ""))
        elif tag == "img":
            self.images.append(attrs)

    def handle_endtag(self, tag):
        if tag == "body":
            self.in_body = False
        if tag == self.ignored_tag:
            self.ignored_tag = None
            if self.script_text is not None:
                self.json_ld.append(json.loads(self.script_text))
                self.script_text = None
        if tag == self.active:
            self.active = None

    def handle_data(self, data):
        if self.script_text is not None:
            self.script_text += data
        if self.in_body and self.ignored_tag is None:
            self.body_text.append(data)
        if self.active == "title":
            self.title += data
        elif self.active == "a":
            self.links[-1][1] += data

    def handle_comment(self, data):
        if data == "email_off":
            self.email_protected = True
        elif data == "/email_off":
            self.email_protected = False


class SeoExportTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.pages = {
            url: Page((OUT / file).read_text())
            for url, (file, _) in PAGES.items() if (OUT / file).exists()
        }

    def test_export_contains_all_indexable_routes(self):
        self.assertEqual(set(self.pages), set(PAGES))

    def test_homepages_are_localized_before_javascript(self):
        expected = {
            "/": ("IA a la medida para empresas | Wiqonn", "Los modelos generales son potentes"),
            "/en": ("Custom AI Systems for Businesses | Wiqonn", "General-purpose models are powerful"),
        }
        for url, (title, intro) in expected.items():
            with self.subTest(url=url):
                self.assertIn(url, self.pages)
                page = self.pages[url]
                self.assertEqual(page.title, title)
                self.assertIn(intro, " ".join(page.body_text))
                self.assertEqual(set(page.alternates), {"es", "en", "x-default"})
                targets = {href for href, _ in page.links}
                self.assertTrue({"/", "/en"}.issubset(targets))
                faq = next(item for item in page.json_ld if item.get("@type") == "FAQPage")
                self.assertEqual(faq["inLanguage"], PAGES[url][1])
                self.assertEqual(faq["@id"], SITE + url + "#faq")
                body = " ".join(" ".join(page.body_text).split())
                for question in faq["mainEntity"]:
                    self.assertIn(" ".join(question["name"].split()), body)
                    self.assertIn(" ".join(question["acceptedAnswer"]["text"].split()), body)

    def test_english_navigation_stays_in_english(self):
        for url, page in self.pages.items():
            if PAGES[url][1] == "en":
                with self.subTest(url=url):
                    targets = {href for href, _ in page.links}
                    self.assertTrue({"/en", SITE + "/en"} & targets)
                    self.assertNotIn("/#services", targets)
                    self.assertNotIn("/#contact", targets)

    def test_sitemap_contains_localized_homepages(self):
        namespaces = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9", "x": "http://www.w3.org/1999/xhtml"}
        root = ET.parse(OUT / "sitemap.xml").getroot()
        entries = {item.find("s:loc", namespaces).text: item for item in root.findall("s:url", namespaces)}
        self.assertEqual(set(entries), {SITE + url for url in PAGES})
        for url in ("/", "/en"):
            with self.subTest(url=url):
                self.assertIn(SITE + url, entries)
                alternates = {item.attrib["hreflang"]: item.attrib["href"] for item in entries[SITE + url].findall("x:link", namespaces)}
                self.assertEqual(alternates, {"es": SITE + "/", "en": SITE + "/en", "x-default": SITE + "/"})

    def test_document_languages_match_content(self):
        for url, page in self.pages.items():
            with self.subTest(url=url):
                self.assertEqual(page.lang, PAGES[url][1])

    def test_contact_links_are_exempt_from_cloudflare_rewriting(self):
        for url, page in self.pages.items():
            with self.subTest(url=url):
                self.assertEqual(page.unprotected_emails, [])

    def test_unique_concise_metadata_and_canonicals(self):
        titles, descriptions = [], []
        for url, page in self.pages.items():
            with self.subTest(url=url):
                self.assertTrue(page.title.strip())
                self.assertLessEqual(len(page.title), 60)
                description = page.meta.get("description", [])
                self.assertEqual(len(description), 1)
                self.assertTrue(80 <= len(description[0]) <= 160, description)
                # Next.js normalizes a root canonical to the origin without '/'.
                self.assertEqual(len(page.canonicals), 1)
                canonical = urlparse(page.canonicals[0])
                self.assertEqual(canonical.scheme + "://" + canonical.netloc, SITE)
                self.assertEqual(canonical.path or "/", url)
                self.assertNotIn("nofollow", ",".join(page.meta.get("robots", [])))
                self.assertNotIn("noindex", ",".join(page.meta.get("robots", [])))
                titles.append(page.title)
                descriptions.append(description[0])
        self.assertEqual(len(titles), len(set(titles)))
        self.assertEqual(len(descriptions), len(set(descriptions)))

    def test_alternates_point_to_actual_translations(self):
        for url, page in self.pages.items():
            for lang, target in page.alternates.items():
                with self.subTest(url=url, lang=lang):
                    target_path = urlparse(target).path or "/"
                    translated = self.pages[target_path]
                    if lang != "x-default":
                        self.assertEqual(translated.lang, lang)
                        backlink = translated.alternates.get(page.lang)
                        self.assertIsNotNone(backlink)
                        self.assertEqual(urlparse(backlink).path or "/", url)

    def test_pages_have_crawlable_internal_navigation(self):
        for url, page in self.pages.items():
            with self.subTest(url=url):
                targets = set()
                for href, label in page.links:
                    target = urlparse(urljoin(SITE + url, href))
                    if target.netloc == urlparse(SITE).netloc:
                        targets.add(target.path or "/")
                        self.assertLessEqual(len(" ".join(label.split())), 120, href)
                self.assertGreaterEqual(len(targets - {url}), 3)

    def test_headings_and_image_alternatives(self):
        for url, page in self.pages.items():
            with self.subTest(url=url):
                self.assertEqual(sum(level == 1 for level, _ in page.headings), 1)
                previous = 0
                for level, _ in page.headings:
                    self.assertLessEqual(level, previous + 1, page.headings)
                    previous = level
                for image in page.images:
                    self.assertIn("alt", image)
                    if not image["alt"]:
                        self.assertEqual(image.get("aria-hidden"), "true")


if __name__ == "__main__":
    unittest.main()
