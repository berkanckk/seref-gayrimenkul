import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from "next/link"
import { ChevronRight, Filter, SlidersHorizontal, Inbox } from "lucide-react"
import { getProperties } from "@/sanity/lib/fetchers"
import Container from "@/components/shared/Container"
import ListingCard from "@/components/listings/ListingCard"
import ListingFilters from "@/components/listings/ListingFilters"
import SortDropdown from "@/components/listings/SortDropdown"
import Pagination from "@/components/listings/Pagination"
import MobileFilterTrigger from "@/components/listings/MobileFilterTrigger"
import type { PropertyFilters, SortOption, ListingType, PropertyType, RoomCount } from "@/types"

interface PageProps {
  searchParams: Promise<{
    tip?: string
    tur?: string
    sehir?: string
    ilce?: string
    minFiyat?: string
    maxFiyat?: string
    oda?: string
    siralama?: string
    sayfa?: string
    arama?: string
  }>
}

/** Helper to convert raw search params to typed filters */
async function parseFilters(paramsPromise: PageProps['searchParams']): Promise<PropertyFilters & { searchWord?: string }> {
  const params = await paramsPromise

  // Map tip -> ListingType
  let listingType: ListingType | undefined = undefined
  if (params.tip === "satilik") listingType = "Satılık"
  if (params.tip === "kiralik") listingType = "Kiralık"

  // Map siralama -> SortOption
  let sortBy: SortOption = "newest"
  if (params.siralama === "eski") sortBy = "oldest"
  if (params.siralama === "fiyat-artan") sortBy = "priceAsc"
  if (params.siralama === "fiyat-azalan") sortBy = "priceDesc"

  const city = params.sehir
  const district = params.ilce

  // Map tur (raw lowercase/uppercase) to exact Sanity PropertyType options
  let propertyType: PropertyType | undefined = undefined
  if (params.tur) {
    const raw = params.tur.toLowerCase()
    if (raw === "daire") propertyType = "Daire"
    else if (raw === "villa") propertyType = "Villa"
    else if (raw === "mustakil" || raw === "mustakil-ev" || raw === "müstakil" || raw === "müstakil ev") propertyType = "Müstakil Ev"
    else if (raw === "arsa") propertyType = "Arsa"
    else if (raw === "dukkan" || raw === "dükkan") propertyType = "Dükkan"
    else if (raw === "ofis") propertyType = "Ofis"
    else if (raw === "depo") propertyType = "Depo"
    else if (raw === "bina") propertyType = "Bina"
    else if (raw === "ciftlik" || raw === "çiftlik") propertyType = "Çiftlik"
    else {
      propertyType = (params.tur.charAt(0).toUpperCase() + params.tur.slice(1)) as PropertyType
    }
  }

  return {
    listingType,
    propertyType,
    city: city === "" ? undefined : city,
    district: district === "" ? undefined : district,
    minPrice: params.minFiyat ? Number(params.minFiyat) : undefined,
    maxPrice: params.maxFiyat ? Number(params.maxFiyat) : undefined,
    roomCount: params.oda as RoomCount | undefined,
    sortBy,
    page: params.sayfa ? Number(params.sayfa) : 1,
    searchTerm: params.arama,
  }
}

/** Generates human readable title based on active filters */
function getPageTitle(filters: PropertyFilters): string {
  if (filters.searchTerm) {
    return `'${filters.searchTerm}' için Sonuçlar`
  }

  let base = "Tüm İlanlar"
  if (filters.listingType) {
    if (filters.propertyType) {
      base = `Satılık ${filters.propertyType} İlanları`
      if (filters.listingType === "Kiralık") {
        base = `Kiralık ${filters.propertyType} İlanları`
      }
    } else {
      base = `${filters.listingType} İlanlar`
    }
  } else if (filters.propertyType) {
    base = `${filters.propertyType} İlanları`
  }

  let location = ""
  if (filters.district && filters.city) {
    location = ` - ${filters.district} / ${filters.city}`
  } else if (filters.city) {
    location = ` - ${filters.city}`
  }

  return `${base}${location}`
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const filters = await parseFilters(searchParams)
  const pageTitle = getPageTitle(filters)
  const desc = `Şeref Gayrimenkul - ${pageTitle}. İnegöl ve Bursa'da güvenilir emlak danışmanlığı.`

  // Noindex search result pages to avoid duplicate content
  const isSearch = Boolean(params.arama)

  return {
    title: pageTitle,
    description: desc,
    robots: isSearch
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: {
      canonical: "/ilanlar",
    },
    openGraph: {
      title: `${pageTitle} | Şeref Gayrimenkul`,
      description: desc,
    },
  }
}

export default async function ListingsPage({ searchParams }: PageProps) {
  const filters = await parseFilters(searchParams)
  const pageTitle = getPageTitle(filters)

  // Fetch properties from Sanity data layer
  const paginated = await getProperties(filters)

  return (
    <main className="bg-bg-soft min-h-screen py-8 font-body">
      <Container>
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1 text-[11px] font-bold text-text-muted mb-6 uppercase tracking-wider">
          <Link href="/" className="hover:text-primary-green transition-colors">
            Ana Sayfa
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-text-muted/60" />
          <span className="text-text-primary">İlanlar</span>
        </nav>

        {/* Page Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3.5xl font-extrabold text-text-primary tracking-tight">
              {pageTitle}
            </h1>
            <p className="text-xs font-bold text-text-muted mt-1">
              {paginated.total} ilan bulundu
            </p>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto w-full sm:w-auto">
            {/* Mobile Filter Sheet Trigger */}
            <div className="lg:hidden w-full">
              <Suspense fallback={<div className="h-9 w-full bg-white rounded-lg animate-pulse" />}>
                <MobileFilterTrigger />
              </Suspense>
            </div>

            {/* Sort Dropdown */}
            <Suspense fallback={<div className="h-9 w-[180px] bg-white rounded-lg animate-pulse" />}>
              <SortDropdown />
            </Suspense>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Left Column: Filter Sidebar (Desktop only) */}
          <aside className="hidden lg:block relative">
            <div className="sticky top-24 bg-white rounded-2xl border border-border-light p-5 shadow-subtle">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border-light">
                <SlidersHorizontal className="h-4.5 w-4.5 text-primary-green" />
                <span className="text-sm font-bold text-text-primary">Filtrele</span>
              </div>
              <Suspense fallback={<div className="h-[400px] w-full bg-white rounded-lg animate-pulse" />}>
                <ListingFilters />
              </Suspense>
            </div>
          </aside>

          {/* Right Column: Listings Grid or Empty State */}
          <div className="space-y-8">
            {paginated.items.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginated.items.map((property) => (
                    <ListingCard key={property._id} property={property} />
                  ))}
                </div>

                {/* Pagination */}
                <Suspense fallback={<div className="h-9 w-64 bg-white rounded-lg animate-pulse mx-auto" />}>
                  <Pagination
                    currentPage={paginated.page}
                    totalPages={paginated.totalPages}
                  />
                </Suspense>
              </>
            ) : (
              /* Empty State view */
              <div className="bg-white rounded-2xl border border-border-light p-10 md:p-16 text-center max-w-xl mx-auto shadow-subtle flex flex-col items-center">
                <div className="bg-bg-soft p-4 rounded-full text-text-muted mb-5">
                  <Inbox className="h-9 w-9 text-primary-green" />
                </div>
                <h3 className="text-lg font-extrabold text-text-primary mb-2">
                  Aradığınız kriterlere uygun ilan bulunamadı
                </h3>
                <p className="text-text-muted text-xs font-bold leading-relaxed mb-6">
                  Filtreleri temizleyip tekrar deneyebilir veya farklı bir arama yapabilirsiniz.
                </p>
                <Link
                  href="/ilanlar"
                  className="btn-premium-green text-white font-bold text-xs px-6 py-3 rounded-xl shadow-sm transition-all"
                >
                  Filtreleri Temizle
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </main>
  )
}
