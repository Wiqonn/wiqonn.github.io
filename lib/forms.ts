export const CONTACT_EMAIL = "contact@wiqonn.com"

export const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? ""

export const CAL_COM_URL = process.env.NEXT_PUBLIC_CAL_COM_URL ?? ""

export function hasBooking(): boolean {
  return CAL_COM_URL.length > 0
}

export function hasForm(): boolean {
  return WEB3FORMS_ACCESS_KEY.length > 0
}

export function bookingUrl(service?: string): string {
  if (!hasBooking()) return `mailto:${CONTACT_EMAIL}`
  const base = CAL_COM_URL
  if (!service) return base
  return `${base}?question=${encodeURIComponent(service)}`
}
