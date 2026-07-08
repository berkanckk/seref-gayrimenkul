// ─────────────────────────────────────────────────────────────────────────────
// Şeref Gayrimenkul — Utility Formatters
// All pure functions — no side effects, no external dependencies.
// ─────────────────────────────────────────────────────────────────────────────

import type { Currency, Property } from '@/types'

// ── Price Formatting ──────────────────────────────────────────────────────────

/**
 * Formats a numeric price with the correct currency symbol and locale.
 *
 * @example
 * formatPrice(3_500_000)         → "3.500.000 ₺"
 * formatPrice(150_000, "USD")    → "$150,000"
 * formatPrice(200_000, "EUR")    → "€200.000"
 */
export function formatPrice(price: number, currency: Currency = 'TL'): string {
  switch (currency) {
    case 'USD':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(price)

    case 'EUR':
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
      }).format(price)

    case 'TL':
    default:
      return `${new Intl.NumberFormat('tr-TR', {
        maximumFractionDigits: 0,
      }).format(price)} ₺`
  }
}

// ── Area Formatting ───────────────────────────────────────────────────────────

/**
 * Formats a square meter value.
 * @example formatArea(120) → "120 m²"
 */
export function formatArea(sqm: number): string {
  return `${sqm.toLocaleString('tr-TR')} m²`
}

// ── Date Formatting ───────────────────────────────────────────────────────────

const TURKISH_MONTHS: readonly string[] = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
] as const

/**
 * Formats an ISO date string to Turkish long date.
 * @example formatDate("2025-01-15") → "15 Ocak 2025"
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate)
  if (isNaN(date.getTime())) return isoDate
  return `${date.getDate()} ${TURKISH_MONTHS[date.getMonth()]} ${date.getFullYear()}`
}

/**
 * Returns a human-readable relative time in Turkish.
 * @example formatRelativeDate("2025-01-13") → "2 gün önce"
 */
export function formatRelativeDate(isoDate: string): string {
  const date = new Date(isoDate)
  if (isNaN(date.getTime())) return isoDate

  const diffMs = Date.now() - date.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30)

  if (diffSecs < 60) return 'Az önce'
  if (diffMins < 60) return `${diffMins} dakika önce`
  if (diffHours < 24) return `${diffHours} saat önce`
  if (diffDays === 1) return 'Dün'
  if (diffDays < 7) return `${diffDays} gün önce`
  if (diffWeeks === 1) return '1 hafta önce'
  if (diffWeeks < 5) return `${diffWeeks} hafta önce`
  if (diffMonths === 1) return '1 ay önce'
  if (diffMonths < 12) return `${diffMonths} ay önce`
  return formatDate(isoDate)
}

// ── Property Title Helpers ────────────────────────────────────────────────────

/**
 * Returns the full SEO-friendly property title.
 * @example "Satılık 3+1 Daire - İnegöl / Bursa"
 */
export function getPropertyFullTitle(property: Property): string {
  const parts: string[] = [property.listingType]
  if (property.roomCount) parts.push(property.roomCount)
  parts.push(property.propertyType)
  parts.push(`- ${property.district} / ${property.city}`)
  return parts.join(' ')
}

/**
 * Returns a compact card title.
 * @example "3+1 Daire, İnegöl"
 */
export function getPropertyShortTitle(property: Property): string {
  const parts: string[] = []
  if (property.roomCount) parts.push(property.roomCount)
  parts.push(property.propertyType)
  return `${parts.join(' ')}, ${property.district}`
}

// ── Address Helpers ───────────────────────────────────────────────────────────

/**
 * Returns a display-safe address (no private street details).
 * @example "Atatürk Mah., İnegöl / Bursa"
 */
export function getFullAddress(property: Property): string {
  const parts: string[] = []
  if (property.neighborhood) parts.push(`${property.neighborhood},`)
  parts.push(`${property.district} / ${property.city}`)
  return parts.join(' ')
}

// ── Communication URL Helpers ─────────────────────────────────────────────────

/**
 * Strips all non-digit characters from a phone string.
 */
function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '')
}

/**
 * Builds a WhatsApp deep-link URL.
 *
 * @param phone   — Phone number in any format (spaces/dashes OK).
 *                  If it starts with "0", replaces with "90" for Turkey.
 * @param message — Optional pre-filled message text.
 *
 * @example getWhatsAppUrl("0533 518 7357", "Merhaba")
 *          → "https://wa.me/905335187357?text=Merhaba"
 */
export function getWhatsAppUrl(phone: string, message?: string): string {
  let digits = normalizePhone(phone)
  if (digits.startsWith('0')) digits = `90${digits.slice(1)}`
  const base = `https://wa.me/${digits}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

/**
 * Generates a property-specific WhatsApp pre-filled message.
 */
export function getPropertyWhatsAppMessage(property: Property): string {
  const id = property.listingNo ?? property._id.slice(-6).toUpperCase()
  const shortTitle = `${property.roomCount ? property.roomCount + ' ' : ''}${property.listingType} ${property.propertyType}`
  return `Merhaba, "${id} - ${shortTitle}" ilanı hakkında bilgi almak istiyorum.`
}

/**
 * Returns a tel: URL for direct phone calls.
 *
 * @example getPropertyPhoneCallUrl("0533 518 7357") → "tel:+905335187357"
 */
export function getPropertyPhoneCallUrl(phone: string): string {
  let digits = normalizePhone(phone)
  if (digits.startsWith('0')) digits = `90${digits.slice(1)}`
  return `tel:+${digits}`
}

// ── Text Utilities ────────────────────────────────────────────────────────────

/**
 * Truncates text to maxLength characters, appending "…" if needed.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1).trimEnd()}…`
}

/**
 * Turkish-aware slugify.
 * Converts special Turkish characters before applying standard slugification.
 *
 * @example slugify("3+1 Satılık Daire İnegöl") → "3-1-satilik-daire-inegol"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// ── Currency Symbol Helper ────────────────────────────────────────────────────

/**
 * Returns the currency symbol for a given currency code.
 */
export function getCurrencySymbol(currency: Currency): string {
  const symbols: Record<Currency, string> = {
    TL: '₺',
    USD: '$',
    EUR: '€',
  }
  return symbols[currency]
}
