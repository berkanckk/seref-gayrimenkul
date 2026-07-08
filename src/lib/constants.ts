// ─────────────────────────────────────────────────────────────────────────────
// Şeref Gayrimenkul — App-wide Constants
// ─────────────────────────────────────────────────────────────────────────────

import type { ListingType, PropertyType, RoomCount, HeatingType, SortOption } from '@/types'

export const LISTING_TYPES: readonly ListingType[] = ['Satılık', 'Kiralık'] as const

export const PROPERTY_TYPES: readonly PropertyType[] = [
  'Daire',
  'Müstakil Ev',
  'Villa',
  'Arsa',
  'Dükkan',
  'Ofis',
  'Depo',
  'Bina',
  'Çiftlik',
] as const

export const ROOM_COUNTS: readonly RoomCount[] = [
  'Stüdyo',
  '1+0',
  '1+1',
  '2+1',
  '2+2',
  '3+1',
  '3+2',
  '4+1',
  '4+2',
  '5+1',
  '5+2',
  '6+ Oda',
] as const

export const HEATING_TYPES: readonly HeatingType[] = [
  'Doğalgaz Kombi',
  'Merkezi Doğalgaz',
  'Merkezi',
  'Soba',
  'Yerden Isıtma',
  'Klima',
  'Yok',
] as const

export const SORT_OPTIONS: ReadonlyArray<{ value: SortOption; label: string }> = [
  { value: 'newest', label: 'En Yeni İlanlar' },
  { value: 'oldest', label: 'En Eski İlanlar' },
  { value: 'priceAsc', label: 'Fiyat: Düşükten Yükseğe' },
  { value: 'priceDesc', label: 'Fiyat: Yüksekten Düşüğe' },
] as const

export const ITEMS_PER_PAGE = 12 as const

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const COMPANY_INFO = {
  name: 'Şeref Gayrimenkul',
  owner: 'Şeref İnce',
  phone1: '0533 518 7357',
  phone1Label: 'Şeref İnce',
  phone2: '0533 276 0329',
  phone2Label: 'Can İnce',
  whatsapp1: '905335187357',
  whatsapp2: '905332760329',
  address: 'Sinanbey, Kanal Sk. No:14 D:E, 16400 İnegöl/Bursa',
  city: 'İnegöl',
  province: 'Bursa',
  workingHours: 'Pazartesi - Cumartesi: 09:00 - 19:00',
} as const

/** Tailwind class names for listing type badges */
export const LISTING_TYPE_STYLES: Record<string, string> = {
  'Satılık': 'bg-emerald-100 text-emerald-800',
  'Kiralık': 'bg-sky-100 text-sky-800',
} as const

/** Property features with emoji icons for display */
export const FEATURE_ICONS: Record<string, string> = {
  'Asansör': '🛗',
  'Otopark': '🅿️',
  'Güvenlik': '🔒',
  'Havuz': '🏊',
  'Spor Salonu': '🏋️',
  'Jeneratör': '⚡',
  'Kameralı Güvenlik': '📷',
  'Bahçe': '🌳',
  'Teras': '🏡',
  'Balkon': '🌇',
  'Site İçinde': '🏘️',
  'Klima': '❄️',
  'Kombi': '🔥',
  'Çelik Kapı': '🚪',
  'Amerikan Mutfak': '🍳',
  'Ebeveyn Banyosu': '🛁',
  'Ankastre': '🍽️',
  'Depolu': '📦',
  'İnternet': '📶',
  'Uydu Sistemi': '📡',
  'Alarm Sistemi': '🚨',
} as const

/** ISR revalidation durations in seconds */
export const REVALIDATE = {
  PROPERTIES: 300,    // 5 minutes
  SETTINGS: 3600,     // 1 hour
  SLUGS: 3600,        // 1 hour
} as const

/** Cache tags for on-demand revalidation */
export const CACHE_TAGS = {
  PROPERTIES: 'properties',
  FEATURED: 'featured-properties',
  SITE_SETTINGS: 'site-settings',
  ABOUT_PAGE: 'about-page',
  CONTACT_PAGE: 'contact-page',
} as const
