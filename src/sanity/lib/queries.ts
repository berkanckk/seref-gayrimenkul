// ─────────────────────────────────────────────────────────────────────────────
// Şeref Gayrimenkul — GROQ Queries
// All queries are typed against the Sanity schemas and match the TypeScript
// types in src/types/index.ts exactly.
// ─────────────────────────────────────────────────────────────────────────────

// ── Reusable Fragments ────────────────────────────────────────────────────────

/** Minimal projection for image assets — used everywhere */
const IMAGE_FRAGMENT = `{
  _type,
  alt,
  caption,
  hotspot,
  crop,
  asset->{
    _id,
    _ref,
    _type,
    url,
    metadata {
      dimensions {
        width,
        height,
        aspectRatio
      }
    }
  }
}`

/** Full property projection matching the Property TypeScript type */
const PROPERTY_FULL_FRAGMENT = `{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  listingNo,
  listingType,
  propertyType,
  price,
  currency,
  isFeatured,
  isPublished,
  publishedAt,
  description,
  squareMeters,
  netSquareMeters,
  roomCount,
  buildingAge,
  floorNumber,
  totalFloors,
  bathroomCount,
  heatingType,
  furnished,
  titleDeedStatus,
  suitableForLoan,
  swapAvailable,
  city,
  district,
  neighborhood,
  mapUrl,
  latitude,
  longitude,
  coverImage ${IMAGE_FRAGMENT},
  images[] ${IMAGE_FRAGMENT},
  videoUrl,
  features,
  seoTitle,
  seoDescription
}`

/** Card projection — used for lists (excludes description, addressDetails) */
const PROPERTY_CARD_FRAGMENT = `{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  listingNo,
  listingType,
  propertyType,
  price,
  currency,
  isFeatured,
  isPublished,
  publishedAt,
  squareMeters,
  netSquareMeters,
  roomCount,
  buildingAge,
  floorNumber,
  totalFloors,
  bathroomCount,
  heatingType,
  furnished,
  city,
  district,
  neighborhood,
  coverImage ${IMAGE_FRAGMENT},
  features
}`

// ── Property Queries ──────────────────────────────────────────────────────────

/**
 * Paginated + filtered list of published properties.
 *
 * Parameters:
 *   $start        number   — offset (page * limit)
 *   $end          number   — offset + limit
 *   $listingType  string   — "Satılık" | "Kiralık" | "" (empty = all)
 *   $propertyType string   — e.g. "Daire" | "" (empty = all)
 *   $city         string   — e.g. "Bursa" | "" (empty = all)
 *   $district     string   — e.g. "İnegöl" | "" (empty = all)
 *   $minPrice     number   — 0 means no minimum
 *   $maxPrice     number   — 0 means no maximum
 *   $roomCount    string   — e.g. "3+1" | "" (empty = all)
 */
export const PROPERTIES_QUERY = `
*[
  _type == "property"
  && isPublished == true
  && ($listingType == "" || listingType == $listingType)
  && ($propertyType == "" || propertyType == $propertyType)
  && ($city == "" || city == $city)
  && ($district == "" || district == $district)
  && ($minPrice == 0 || price >= $minPrice)
  && ($maxPrice == 0 || price <= $maxPrice)
  && ($roomCount == "" || roomCount == $roomCount)
  && ($searchTerm == "" || 
      title match "*" + $searchTerm + "*" || 
      description[].children[].text match "*" + $searchTerm + "*" ||
      neighborhood match "*" + $searchTerm + "*" ||
      district match "*" + $searchTerm + "*" ||
      listingNo match "*" + $searchTerm + "*")
] | order(publishedAt desc) [$start...$end] ${PROPERTY_CARD_FRAGMENT}
`

/**
 * Total count for pagination — uses the same filters as PROPERTIES_QUERY.
 * Returns a number.
 */
export const PROPERTIES_COUNT_QUERY = `
count(
  *[
    _type == "property"
    && isPublished == true
    && ($listingType == "" || listingType == $listingType)
    && ($propertyType == "" || propertyType == $propertyType)
    && ($city == "" || city == $city)
    && ($district == "" || district == $district)
    && ($minPrice == 0 || price >= $minPrice)
    && ($maxPrice == 0 || price <= $maxPrice)
    && ($roomCount == "" || roomCount == $roomCount)
    && ($searchTerm == "" || 
        title match "*" + $searchTerm + "*" || 
        description[].children[].text match "*" + $searchTerm + "*" ||
        neighborhood match "*" + $searchTerm + "*" ||
        district match "*" + $searchTerm + "*" ||
        listingNo match "*" + $searchTerm + "*")
  ]
)
`

/**
 * Up to 6 published featured properties for the home page hero.
 * Ordered by publishedAt desc so newest featured properties appear first.
 */
export const FEATURED_PROPERTIES_QUERY = `
*[
  _type == "property"
  && isPublished == true
  && isFeatured == true
] | order(publishedAt desc) [0...6] ${PROPERTY_CARD_FRAGMENT}
`

/**
 * Full property detail by slug.
 * Returns null if not found or not published.
 *
 * Parameters:
 *   $slug  string  — slug.current value
 */
export const PROPERTY_BY_SLUG_QUERY = `
*[
  _type == "property"
  && slug.current == $slug
  && isPublished == true
][0] ${PROPERTY_FULL_FRAGMENT}
`

/**
 * 3 related properties — same propertyType OR same district,
 * excluding the current property, only published.
 * Used on the property detail page.
 *
 * Parameters:
 *   $currentId    string  — _id to exclude
 *   $propertyType string  — current property's type
 *   $district     string  — current property's district
 */
export const RELATED_PROPERTIES_QUERY = `
*[
  _type == "property"
  && isPublished == true
  && _id != $currentId
  && (propertyType == $propertyType || district == $district)
] | order(publishedAt desc) [0...3] ${PROPERTY_CARD_FRAGMENT}
`

/**
 * Search properties by a search term across key text fields.
 *
 * Parameters:
 *   $searchTerm  string  — the search string (case-insensitive via match)
 */
export const SEARCH_PROPERTIES_QUERY = `
*[
  _type == "property"
  && isPublished == true
  && (
    title match $searchTerm
    || city match $searchTerm
    || district match $searchTerm
    || neighborhood match $searchTerm
    || propertyType match $searchTerm
    || listingNo match $searchTerm
  )
] | order(publishedAt desc) [0...20] ${PROPERTY_CARD_FRAGMENT}
`

/**
 * All published property slugs — used in generateStaticParams for SSG.
 */
export const PROPERTY_SLUGS_QUERY = `
*[_type == "property" && isPublished == true].slug.current
`

// ── Aggregation Queries ───────────────────────────────────────────────────────

/**
 * Returns { totalCount, satılıkCount, kiralıkCount } for dashboard/header stats.
 */
export const PROPERTY_STATS_QUERY = `{
  "totalCount":   count(*[_type == "property" && isPublished == true]),
  "satılıkCount": count(*[_type == "property" && isPublished == true && listingType == "Satılık"]),
  "kiralıkCount": count(*[_type == "property" && isPublished == true && listingType == "Kiralık"])
}`

/**
 * Unique cities from published properties, sorted alphabetically.
 */
export const DISTINCT_CITIES_QUERY = `
array::unique(*[_type == "property" && isPublished == true].city) | order(@)
`

/**
 * Unique districts from published properties.
 * Optionally filtered by $city (pass "" to get all districts).
 *
 * Parameters:
 *   $city  string  — filter by city | "" = all cities
 */
export const DISTINCT_DISTRICTS_QUERY = `
array::unique(
  *[
    _type == "property"
    && isPublished == true
    && ($city == "" || city == $city)
  ].district
) | order(@)
`

// ── Singleton Queries ─────────────────────────────────────────────────────────

/**
 * The one-and-only siteSettings document.
 * Includes logo images with full asset metadata.
 */
export const SITE_SETTINGS_QUERY = `
*[_type == "siteSettings"][0] {
  _id,
  _type,
  companyName,
  ownerName,
  yearEstablished,
  logo ${IMAGE_FRAGMENT},
  logoDark ${IMAGE_FRAGMENT},
  tagline,
  shortDescription,
  phone1,
  phone1Label,
  phone2,
  phone2Label,
  whatsapp1,
  whatsapp2,
  email,
  address,
  city,
  province,
  workingHours,
  mapEmbedUrl,
  instagram,
  facebook,
  twitter,
  youtube,
  linkedin,
  tiktok,
  seoTitle,
  seoDescription,
  seoImage ${IMAGE_FRAGMENT},
  footerText
}
`

/**
 * The one-and-only aboutPage document with all nested arrays.
 */
export const ABOUT_PAGE_QUERY = `
*[_type == "aboutPage"][0] {
  _id,
  _type,
  title,
  subtitle,
  heroImage ${IMAGE_FRAGMENT},
  content,
  mission,
  vision,
  values[] {
    _key,
    title,
    description,
    icon
  },
  stats[] {
    _key,
    value,
    label
  },
  teamMembers[] {
    _key,
    name,
    role,
    photo ${IMAGE_FRAGMENT},
    phone,
    bio
  },
  seoTitle,
  seoDescription
}
`

/**
 * The one-and-only contactPage document.
 */
export const CONTACT_PAGE_QUERY = `
*[_type == "contactPage"][0] {
  _id,
  _type,
  title,
  subtitle,
  description,
  formTitle,
  infoTitle,
  ctaText,
  seoTitle,
  seoDescription
}
`
