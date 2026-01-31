"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

interface CodeBlockProps {
  filename: string
  language?: string
  code: string
}

export function CodeBlock({ filename, language = "python", code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Tokenize and highlight
  const highlightLine = (line: string) => {
    const tokens: { text: string; className: string }[] = []
    let remaining = line

    while (remaining.length > 0) {
      // Comments
      const commentMatch = remaining.match(/^(#.*)$/)
      if (commentMatch) {
        tokens.push({ text: commentMatch[1], className: "text-gray-500" })
        remaining = ""
        continue
      }

      // Keywords
      const keywordMatch = remaining.match(/^(def|if|else|return|in|for|while|class|import|from|as|try|except|with)\b/)
      if (keywordMatch) {
        tokens.push({ text: keywordMatch[1], className: "text-pink-400" })
        remaining = remaining.slice(keywordMatch[1].length)
        continue
      }

      // Strings
      const stringMatch = remaining.match(/^("[^"]*"|'[^']*')/)
      if (stringMatch) {
        tokens.push({ text: stringMatch[1], className: "text-amber-300" })
        remaining = remaining.slice(stringMatch[1].length)
        continue
      }

      // Function calls
      const funcMatch = remaining.match(/^(\w+)(\()/)
      if (funcMatch) {
        tokens.push({ text: funcMatch[1], className: "text-blue-400" })
        tokens.push({ text: "(", className: "text-gray-200" })
        remaining = remaining.slice(funcMatch[1].length + 1)
        continue
      }

      // Default: single character
      tokens.push({ text: remaining[0], className: "text-gray-200" })
      remaining = remaining.slice(1)
    }

    return tokens
  }

  const lines = code.split('\n')

  return (
    <div className="my-6 rounded-lg overflow-hidden bg-[#1e1e1e] border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="ml-2 text-sm text-gray-400 font-mono">{filename}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 uppercase">{language}</span>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-500 hover:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Code */}
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm leading-6">
          {lines.map((line, i) => (
            <div key={i} className="flex hover:bg-white/[0.03] -mx-4 px-4 rounded">
              <span className="w-8 shrink-0 text-right pr-4 text-gray-600 select-none">
                {i + 1}
              </span>
              <code className="flex-1">
                {line === '' ? '\u00A0' : highlightLine(line).map((token, j) => (
                  <span key={j} className={token.className}>{token.text}</span>
                ))}
              </code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}

// Pre-built code block for the cache algorithm
export function CacheAlgorithmCode() {
  const code = `def generate_with_cache(image, prompt):
    # Compute content hash regardless of delivery format
    image_hash = sha256(decode_pixels(image))
    cache_key = (image_hash, prompt_prefix)

    if cache_key in prefix_cache:
        # Cache HIT → skip vision encoder
        embeddings, kv = prefix_cache[cache_key]
        return llm.generate(prompt, cached_kv=kv)

    else:
        # Cache MISS → encode, generate, store
        embeddings = vision_encoder(image)
        response, kv = llm.generate(prompt, embeddings)
        prefix_cache[cache_key] = (embeddings, kv)
        return response`

  return <CodeBlock filename="cache_generation.py" language="python" code={code} />
}
