"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useT } from "@/components/language-provider"
import { CONTACT_EMAIL, WEB3FORMS_ACCESS_KEY, hasForm } from "@/lib/forms"

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  size: z.string(),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

const SIZE_OPTIONS = ["<50", "50–200", "200–500", "500+"] as const

export function LeadForm() {
  const t = useT()
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (values: FormValues) => {
    setError(false)

    if (!hasForm()) {
      const emailBody = [
        t.cta.emailBody,
        "",
        `${t.cta.form.name}: ${values.name}`,
        `${t.cta.form.email}: ${values.email}`,
        `${t.cta.form.company}: ${values.company}`,
        `${t.cta.form.size}: ${values.size}`,
        values.message ? `${t.cta.form.message}: ${values.message}` : "",
      ]
        .filter(Boolean)
        .join("\n")

      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.cta.emailSubject)}&body=${encodeURIComponent(emailBody)}`
      return
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          ...values,
          subject: t.cta.emailSubject,
          from_name: "Wiqonn - sitio web",
        }),
      })
      const data = await response.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-secondary/40 bg-secondary/10 px-6 py-6 max-w-lg mx-auto text-left"
      >
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle2 className="w-6 h-6 text-secondary" aria-hidden="true" />
          <p className="text-lg font-semibold text-foreground">{t.cta.form.successTitle}</p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t.cta.form.successBody}
        </p>
      </div>
    )
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 transition-colors"

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 max-w-lg mx-auto text-left space-y-4"
      noValidate
    >
      {hasForm() && <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lead-name" className="block text-sm font-medium mb-1.5 text-foreground">
            {t.cta.form.name}
          </label>
          <input
            id="lead-name"
            type="text"
            autoComplete="name"
            className={inputClass}
            placeholder={t.cta.form.namePlaceholder}
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="lead-email" className="block text-sm font-medium mb-1.5 text-foreground">
            {t.cta.form.email}
          </label>
          <input
            id="lead-email"
            type="email"
            autoComplete="email"
            className={inputClass}
            placeholder={t.cta.form.emailPlaceholder}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lead-company" className="block text-sm font-medium mb-1.5 text-foreground">
            {t.cta.form.company}
          </label>
          <input
            id="lead-company"
            type="text"
            autoComplete="organization"
            className={inputClass}
            placeholder={t.cta.form.companyPlaceholder}
            {...register("company")}
          />
          {errors.company && (
            <p className="mt-1 text-xs text-destructive">{errors.company.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="lead-size" className="block text-sm font-medium mb-1.5 text-foreground">
            {t.cta.form.size}
          </label>
          <select id="lead-size" className={inputClass} defaultValue="" {...register("size")}>
            <option value="" disabled>
              {t.cta.form.sizePlaceholder}
            </option>
            {SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.size && (
            <p className="mt-1 text-xs text-destructive">{errors.size.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="lead-message" className="block text-sm font-medium mb-1.5 text-foreground">
          {t.cta.form.message}
        </label>
        <textarea
          id="lead-message"
          rows={3}
          className={inputClass}
          placeholder={t.cta.form.messagePlaceholder}
          {...register("message")}
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {t.cta.form.error}
          {CONTACT_EMAIL}.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="btn-gradient glow-cyan hover:scale-105 transition-all w-full text-base h-13 text-[#0A0E1A] font-semibold"
      >
        {isSubmitting ? t.cta.form.sending : t.cta.emailButton}
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        {t.cta.trust}
      </p>
    </form>
  )
}
