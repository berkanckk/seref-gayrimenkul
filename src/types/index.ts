// ─────────────────────────────────────────────────────────────────────────────
// Şeref Gayrimenkul — TypeScript Types
// Mirrors every field in the Sanity schemas exactly.
// ─────────────────────────────────────────────────────────────────────────────

// ── Primitives ────────────────────────────────────────────────────────────────

export interface SanityImageAsset {
  readonly _id: string
  readonly _ref: string
  readonly _type: 'reference'
  readonly url?: string
  readonly metadata?: {
    readonly dimensions?: {
      readonly width: number
      readonly height: number
      readonly aspectRatio: number
    }
  }
}

export interface SanityHotspot {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
}

export interface SanityImage {
  readonly _type: 'image'
  readonly asset?: SanityImageAsset
  readonly hotspot?: SanityHotspot
  readonly crop?: {
    readonly top: number
    readonly bottom: number
    readonly left: number
    readonly right: number
  }
  readonly alt?: string
}

export interface SanityImageWithCaption extends SanityImage {
  readonly caption?: string
}

export interface SanityBlock {
  readonly _type: 'block'
  readonly _key: string
  readonly style?: string
  readonly children: ReadonlyArray<{
    readonly _type: 'span'
    readonly _key: string
    readonly text: string
    readonly marks?: readonly string[]
  }>
  readonly markDefs?: ReadonlyArray<{
    readonly _type: string
    readonly _key: string
    readonly [key: string]: unknown
  }>
  readonly listItem?: string
  readonly level?: number
}

export interface SanitySlug {
  readonly _type: 'slug'
  readonly current: string
}

// Portable text is a union of block and image types
export type PortableTextBlock = SanityBlock | SanityImageWithCaption

// ── Listing Types ─────────────────────────────────────────────────────────────

export type ListingType = 'Satılık' | 'Kiralık'

export type PropertyType =
  | 'Daire'
  | 'Müstakil Ev'
  | 'Villa'
  | 'Arsa'
  | 'Dükkan'
  | 'Ofis'
  | 'Depo'
  | 'Bina'
  | 'Çiftlik'

export type RoomCount =
  | 'Stüdyo'
  | '1+0'
  | '1+1'
  | '2+1'
  | '2+2'
  | '3+1'
  | '3+2'
  | '4+1'
  | '4+2'
  | '5+1'
  | '5+2'
  | '6+ Oda'

export type Currency = 'TL' | 'USD' | 'EUR'

export type HeatingType =
  | 'Doğalgaz Kombi'
  | 'Merkezi Doğalgaz'
  | 'Merkezi'
  | 'Soba'
  | 'Yerden Isıtma'
  | 'Klima'
  | 'Yok'

export type FurnishedStatus = 'Eşyasız' | 'Eşyalı' | 'Yarı Eşyalı'

export type TitleDeedStatus =
  | 'Kat Mülkiyetli'
  | 'Kat İrtifaklı'
  | 'Hisseli Tapu'
  | 'Müstakil Tapulu'
  | 'Kooperatif'
  | 'Belirtilmemiş'

// ── Property ──────────────────────────────────────────────────────────────────

export interface Property {
  readonly _id: string
  readonly _type: 'property'
  readonly _createdAt: string
  readonly _updatedAt: string

  // Basic
  readonly title: string
  readonly slug: SanitySlug
  readonly listingNo?: string
  readonly listingType: ListingType
  readonly propertyType: PropertyType
  readonly price: number
  readonly currency: Currency
  readonly isFeatured: boolean
  readonly isPublished: boolean
  readonly publishedAt: string

  // Details
  readonly description?: readonly PortableTextBlock[]
  readonly squareMeters?: number
  readonly netSquareMeters?: number
  readonly roomCount?: RoomCount
  readonly buildingAge?: number
  readonly floorNumber?: string
  readonly totalFloors?: number
  readonly bathroomCount?: number
  readonly heatingType?: HeatingType
  readonly furnished?: FurnishedStatus
  readonly titleDeedStatus?: TitleDeedStatus
  readonly suitableForLoan?: boolean
  readonly swapAvailable?: boolean

  // Location
  readonly city: string
  readonly district: string
  readonly neighborhood?: string
  readonly addressDetails?: string
  readonly mapUrl?: string
  readonly latitude?: number
  readonly longitude?: number

  // Media
  readonly coverImage: SanityImage
  readonly images?: readonly SanityImage[]
  readonly videoUrl?: string

  // Features
  readonly features?: readonly string[]

  // SEO
  readonly seoTitle?: string
  readonly seoDescription?: string
}

// ── Site Settings ─────────────────────────────────────────────────────────────

export interface SiteSettings {
  readonly _id: string
  readonly _type: 'siteSettings'

  // Company
  readonly companyName: string
  readonly ownerName?: string
  readonly yearEstablished?: number
  readonly logo?: SanityImage
  readonly logoDark?: SanityImage
  readonly tagline?: string
  readonly shortDescription?: string

  // Contact
  readonly phone1: string
  readonly phone1Label?: string
  readonly phone2?: string
  readonly phone2Label?: string
  readonly whatsapp1?: string
  readonly whatsapp2?: string
  readonly email?: string
  readonly address?: string
  readonly city?: string
  readonly province?: string
  readonly workingHours?: string
  readonly mapEmbedUrl?: string

  // Social
  readonly instagram?: string
  readonly facebook?: string
  readonly twitter?: string
  readonly youtube?: string
  readonly linkedin?: string
  readonly tiktok?: string

  // SEO
  readonly seoTitle?: string
  readonly seoDescription?: string
  readonly seoImage?: SanityImage
  readonly footerText?: string
}

// ── About Page ────────────────────────────────────────────────────────────────

export interface CompanyValue {
  readonly _key: string
  readonly title: string
  readonly description?: string
  readonly icon?: string
}

export interface CompanyStat {
  readonly _key: string
  readonly value: string
  readonly label: string
}

export interface TeamMember {
  readonly _key: string
  readonly name: string
  readonly role?: string
  readonly photo?: SanityImage
  readonly phone?: string
  readonly bio?: string
}

export interface AboutPage {
  readonly _id: string
  readonly _type: 'aboutPage'

  readonly title?: string
  readonly subtitle?: string
  readonly heroImage?: SanityImage
  readonly content?: readonly PortableTextBlock[]
  readonly mission?: string
  readonly vision?: string
  readonly values?: readonly CompanyValue[]
  readonly stats?: readonly CompanyStat[]
  readonly teamMembers?: readonly TeamMember[]
  readonly seoTitle?: string
  readonly seoDescription?: string
}

// ── Contact Page ──────────────────────────────────────────────────────────────

export interface ContactPage {
  readonly _id: string
  readonly _type: 'contactPage'

  readonly title?: string
  readonly subtitle?: string
  readonly description?: string
  readonly formTitle?: string
  readonly infoTitle?: string
  readonly ctaText?: string
  readonly seoTitle?: string
  readonly seoDescription?: string
}

// ── Filters & Pagination ──────────────────────────────────────────────────────

export type SortOption = 'newest' | 'oldest' | 'priceAsc' | 'priceDesc'

export interface PropertyFilters {
  readonly listingType?: ListingType
  readonly propertyType?: PropertyType
  readonly city?: string
  readonly district?: string
  readonly minPrice?: number
  readonly maxPrice?: number
  readonly roomCount?: RoomCount
  readonly sortBy?: SortOption
  readonly page?: number
  readonly limit?: number
  readonly searchTerm?: string
}

export interface PaginatedProperties {
  readonly items: readonly Property[]
  readonly total: number
  readonly page: number
  readonly totalPages: number
}

// ── Stats ─────────────────────────────────────────────────────────────────────

export interface PropertyStats {
  readonly totalCount: number
  readonly satılıkCount: number
  readonly kiralıkCount: number
}
