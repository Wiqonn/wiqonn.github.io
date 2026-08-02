"use client"

import { CalendarClock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useT } from "@/components/language-provider"
import { CONTACT_EMAIL, bookingUrl, hasBooking } from "@/lib/forms"

interface BookingButtonProps {
  service?: string
  size?: "default" | "sm" | "lg"
  className?: string
  variant?: "default" | "outline"
  label?: string
}

export function BookingButton({
  service,
  size = "lg",
  className = "",
  variant = "default",
  label,
}: BookingButtonProps) {
  const t = useT()
  const url = hasBooking()
    ? bookingUrl(service)
    : `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.hero.emailSubject)}&body=${encodeURIComponent(t.hero.emailBody)}`

  return (
    <Button size={size} variant={variant} asChild className={className}>
      <a href={url} target={hasBooking() ? "_blank" : undefined} rel={hasBooking() ? "noopener noreferrer" : undefined}>
        {hasBooking() ? (
          <CalendarClock className="mr-2 w-5 h-5" aria-hidden="true" />
        ) : (
          <Mail className="mr-2 w-5 h-5" aria-hidden="true" />
        )}
        {label ?? t.hero.ctaPrimary}
      </a>
    </Button>
  )
}
