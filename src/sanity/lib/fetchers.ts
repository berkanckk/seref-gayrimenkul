// ─────────────────────────────────────────────────────────────────────────────
// Şeref Gayrimenkul — Sanity Data Fetchers
// All functions are typed, use Next.js ISR fetch options, and return
// sensible defaults on error so the UI never crashes from a data failure.
// ─────────────────────────────────────────────────────────────────────────────

import { client } from './client'
import {
  PROPERTIES_QUERY,
  PROPERTIES_COUNT_QUERY,
  FEATURED_PROPERTIES_QUERY,
  PROPERTY_BY_SLUG_QUERY,
  RELATED_PROPERTIES_QUERY,
  SEARCH_PROPERTIES_QUERY,
  PROPERTY_SLUGS_QUERY,
  PROPERTY_STATS_QUERY,
  DISTINCT_CITIES_QUERY,
  DISTINCT_DISTRICTS_QUERY,
  SITE_SETTINGS_QUERY,
  ABOUT_PAGE_QUERY,
  CONTACT_PAGE_QUERY,
} from './queries'
import { ITEMS_PER_PAGE, REVALIDATE, CACHE_TAGS } from '@/lib/constants'
import type {
  Property,
  PaginatedProperties,
  PropertyFilters,
  PropertyStats,
  SiteSettings,
  AboutPage,
  ContactPage,
} from '@/types'

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Shared fetch options for property lists */
const propertyFetchOptions = {
  next: {
    tags: ["property", "properties"],
  },
}

/** Shared fetch options for singletons */
const settingsFetchOptions = {
  next: {
    tags: ["siteSettings"],
  },
}

// ── Property Fetchers ─────────────────────────────────────────────────────────

/**
 * Fetches a paginated, filtered list of published properties.
 * Falls back to an empty result set on error.
 */
export async function getProperties(
  filters: PropertyFilters = {}
): Promise<PaginatedProperties> {
  const {
    listingType,
    propertyType,
    city,
    district,
    minPrice,
    maxPrice,
    roomCount,
    sortBy = 'newest',
    page = 1,
    limit = ITEMS_PER_PAGE,
    searchTerm,
  } = filters

  const start = (page - 1) * limit
  const end = start + limit

  const params = {
    start,
    end,
    listingType: listingType ?? '',
    propertyType: propertyType ?? '',
    city: city ?? '',
    district: district ?? '',
    minPrice: minPrice ?? 0,
    maxPrice: maxPrice ?? 0,
    roomCount: roomCount ?? '',
    searchTerm: searchTerm ?? '',
  }

  let sortClause = 'order(publishedAt desc)'
  if (sortBy === 'oldest') {
    sortClause = 'order(publishedAt asc)'
  } else if (sortBy === 'priceAsc') {
    sortClause = 'order(price asc)'
  } else if (sortBy === 'priceDesc') {
    sortClause = 'order(price desc)'
  }

  const query = PROPERTIES_QUERY.replace('order(publishedAt desc)', sortClause)

  try {
    const [items, total] = await Promise.all([
      client.fetch<Property[]>(query, params, propertyFetchOptions),
      client.fetch<number>(PROPERTIES_COUNT_QUERY, params, propertyFetchOptions),
    ])

    return {
      items: items ?? [],
      total: total ?? 0,
      page,
      totalPages: Math.ceil((total ?? 0) / limit),
    }
  } catch (error) {
    console.error('[getProperties] Sanity fetch error:', error)
    return { items: [], total: 0, page: 1, totalPages: 0 }
  }
}

/**
 * Fetches up to 6 published + featured properties for the home page.
 */
export async function getFeaturedProperties(): Promise<Property[]> {
  try {
    const result = await client.fetch<Property[]>(
      FEATURED_PROPERTIES_QUERY,
      {},
      {
        next: {
          tags: ["property", "properties", "featured"],
        },
      }
    )
    return result ?? []
  } catch (error) {
    console.error('[getFeaturedProperties] Sanity fetch error:', error)
    return []
  }
}

/**
 * Fetches a single property by its slug.current value.
 * Returns null if not found or if published is false.
 */
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  try {
    const result = await client.fetch<Property | null>(
      PROPERTY_BY_SLUG_QUERY,
      { slug },
      {
        next: {
          tags: ["property", `property:${slug}`],
        },
      }
    )
    return result ?? null
  } catch (error) {
    console.error('[getPropertyBySlug] Sanity fetch error:', error)
    return null
  }
}

/**
 * Fetches up to 3 related properties for the detail page sidebar.
 */
export async function getRelatedProperties(
  currentId: string,
  propertyType: string,
  district: string
): Promise<Property[]> {
  try {
    const result = await client.fetch<Property[]>(
      RELATED_PROPERTIES_QUERY,
      { currentId, propertyType, district },
      propertyFetchOptions
    )
    return result ?? []
  } catch (error) {
    console.error('[getRelatedProperties] Sanity fetch error:', error)
    return []
  }
}

/**
 * Searches properties by a term matching title, city, district, neighborhood,
 * propertyType, or listingNo. Returns up to 20 results.
 *
 * GROQ's `match` operator requires the term to end with "*" for prefix matching.
 */
export async function searchProperties(searchTerm: string): Promise<Property[]> {
  const term = `${searchTerm.trim()}*`
  try {
    const result = await client.fetch<Property[]>(
      SEARCH_PROPERTIES_QUERY,
      { searchTerm: term },
      propertyFetchOptions
    )
    return result ?? []
  } catch (error) {
    console.error('[searchProperties] Sanity fetch error:', error)
    return []
  }
}

/**
 * Returns all published property slug strings for generateStaticParams.
 */
export async function getAllPropertySlugs(): Promise<string[]> {
  try {
    const result = await client.fetch<string[]>(
      PROPERTY_SLUGS_QUERY,
      {},
      {
        next: {
          tags: ["property", "properties"],
        },
      }
    )
    return (result ?? []).filter(Boolean)
  } catch (error) {
    console.error('[getAllPropertySlugs] Sanity fetch error:', error)
    return []
  }
}

// ── Aggregation Fetchers ──────────────────────────────────────────────────────

/**
 * Returns total, satılık and kiralık property counts.
 */
export async function getPropertyStats(): Promise<PropertyStats> {
  try {
    const result = await client.fetch<PropertyStats>(
      PROPERTY_STATS_QUERY,
      {},
      propertyFetchOptions
    )
    return result ?? { totalCount: 0, satılıkCount: 0, kiralıkCount: 0 }
  } catch (error) {
    console.error('[getPropertyStats] Sanity fetch error:', error)
    return { totalCount: 0, satılıkCount: 0, kiralıkCount: 0 }
  }
}

/**
 * Returns a sorted list of unique cities from published properties.
 */
export async function getDistinctCities(): Promise<string[]> {
  try {
    const result = await client.fetch<string[]>(
      DISTINCT_CITIES_QUERY,
      {},
      propertyFetchOptions
    )
    return (result ?? []).filter(Boolean)
  } catch (error) {
    console.error('[getDistinctCities] Sanity fetch error:', error)
    return []
  }
}

/**
 * Returns unique districts, optionally filtered by city.
 * Pass no argument (or undefined) to get all districts across all cities.
 */
export async function getDistinctDistricts(city?: string): Promise<string[]> {
  try {
    const result = await client.fetch<string[]>(
      DISTINCT_DISTRICTS_QUERY,
      { city: city ?? '' },
      propertyFetchOptions
    )
    return (result ?? []).filter(Boolean)
  } catch (error) {
    console.error('[getDistinctDistricts] Sanity fetch error:', error)
    return []
  }
}

// ── Singleton Fetchers ────────────────────────────────────────────────────────

/**
 * Fetches the siteSettings singleton document.
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const result = await client.fetch<SiteSettings | null>(
      SITE_SETTINGS_QUERY,
      {},
      settingsFetchOptions
    )
    return result ?? null
  } catch (error) {
    console.error('[getSiteSettings] Sanity fetch error:', error)
    return null
  }
}

/**
 * Fetches the aboutPage singleton document.
 */
export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    const result = await client.fetch<AboutPage | null>(
      ABOUT_PAGE_QUERY,
      {},
      {
        next: {
          tags: ["aboutPage"],
        },
      }
    )
    return result ?? null
  } catch (error) {
    console.error('[getAboutPage] Sanity fetch error:', error)
    return null
  }
}

/**
 * Fetches the contactPage singleton document.
 */
export async function getContactPage(): Promise<ContactPage | null> {
  try {
    const result = await client.fetch<ContactPage | null>(
      CONTACT_PAGE_QUERY,
      {},
      {
        next: {
          tags: ["contactPage"],
        },
      }
    )
    return result ?? null
  } catch (error) {
    console.error('[getContactPage] Sanity fetch error:', error)
    return null
  }
}
