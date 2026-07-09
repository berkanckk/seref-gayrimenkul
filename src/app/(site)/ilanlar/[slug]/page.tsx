import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from "next/link"
import { notFound } from "next/navigation"
import { PortableText } from '@portabletext/react'
import { 
  ChevronRight, 
  MapPin, 
  Home, 
  Maximize2, 
  Building, 
  Layers, 
  Bath, 
  Clock, 
  MessageCircle, 
  Phone, 
  Check, 
  Star, 
  Sparkles 
} from "lucide-react"

import { getPropertyBySlug, getRelatedProperties, getSiteSettings, getAllPropertySlugs } from "@/sanity/lib/fetchers"
import { getImageUrl } from "@/sanity/lib/image"
import { formatPrice, formatRelativeDate, getFullAddress } from "@/lib/formatters"
import Container from "@/components/shared/Container"
import ListingCard from "@/components/listings/ListingCard"
import PropertyGallery from "@/components/listings/PropertyGallery"
import PropertyActions from "@/components/listings/PropertyActions"
import MobileContactBar from "@/components/listings/MobileContactBar"
import { JsonLd } from "@/components/shared/JsonLd"
import type { Property, SiteSettings } from "@/types"

interface PropertyPageProps {
  params: Promise<{
    slug: string
  }>
}

/** Parses YouTube URLs to extract standard Embed format */
function getYoutubeEmbedUrl(url?: string): string | null {
  if (!url) return null
  let videoId = ""
  try {
    const parsed = new URL(url)
    if (parsed.hostname === "youtu.be") {
      videoId = parsed.pathname.slice(1)
    } else if (parsed.hostname.includes("youtube.com")) {
      videoId = parsed.searchParams.get("v") || ""
      if (!videoId && parsed.pathname.startsWith("/embed/")) {
        videoId = parsed.pathname.split("/")[2]
      }
    }
  } catch (e) {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i)
    if (match) videoId = match[1]
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null
}

export async function generateStaticParams() {
  const slugs = await getAllPropertySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)
  if (!property) return { title: "İlan Bulunamadı" }

  const title =
    property.seoTitle ||
    `${property.title} - ${property.price?.toLocaleString("tr-TR")} ${property.currency || "TL"}`

  const description =
    property.seoDescription ||
    `${property.propertyType || ""} ${property.roomCount || ""} ${
      property.squareMeters ? property.squareMeters + "m²" : ""
    } ${property.district || ""}/${property.city || ""} - İlan No: ${property.listingNo || ""}`.trim()

  const imageUrl = property.coverImage ? getImageUrl(property.coverImage, 1200, 630) : ""

  return {
    title,
    description,
    alternates: {
      canonical: `/ilanlar/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: property.title }]
        : [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Şeref Gayrimenkul" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : ["/og-image.jpg"],
    },
  }
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { slug } = await params
  
  // Await parallel fetching
  const [property, settings] = await Promise.all([
    getPropertyBySlug(slug),
    getSiteSettings()
  ])

  // Call Next.js 404 page if listing does not exist
  if (!property) {
    notFound()
  }

  // Fetch similar related listings
  const relatedProperties = await getRelatedProperties(
    property._id,
    property.propertyType,
    property.district
  )

  // Default site settings fallback values
  const safeSettings: SiteSettings = settings ?? {
    _id: 'siteSettings',
    _type: 'siteSettings',
    companyName: 'Şeref Gayrimenkul',
    ownerName: 'Şeref İnce',
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
  }

  // "NEW" logic
  const isNew = (() => {
    if (!property.publishedAt) return false
    const daysDiff = (Date.now() - new Date(property.publishedAt).getTime()) 
      / (1000 * 60 * 60 * 24)
    return daysDiff <= 7
  })()

  // Dynamic formatting
  const displayPrice = formatPrice(property.price, property.currency)
  const fullAddress = getFullAddress(property)
  const relativeDate = property.publishedAt 
    ? formatRelativeDate(property.publishedAt) 
    : "Yeni İlan"

  const whatsappMessage = `Merhaba, ${property.title} (İlan No: ${property.listingNo || property._id.slice(-6).toUpperCase()}) ilanı hakkında bilgi almak istiyorum.`
  const whatsappUrl = `https://wa.me/${safeSettings.whatsapp1 || '905335187357'}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <main className="bg-bg-soft min-h-screen pt-6 pb-20 lg:pb-10 font-body">
      {/* JSON-LD Structured Data — Property Listing */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: property.title,
          sku: property.listingNo,
          brand: { "@type": "Brand", name: "Şeref Gayrimenkul" },
          offers: {
            "@type": "Offer",
            price: property.price,
            priceCurrency:
              property.currency === "TL" ? "TRY" : property.currency,
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "RealEstateAgent",
              name: "Şeref Gayrimenkul",
              telephone: "+905335187357",
            },
          },
          additionalProperty: [
            property.roomCount
              ? {
                  "@type": "PropertyValue",
                  name: "Oda Sayısı",
                  value: property.roomCount,
                }
              : null,
            property.squareMeters
              ? {
                  "@type": "PropertyValue",
                  name: "Brüt m²",
                  value: property.squareMeters,
                }
              : null,
          ].filter(Boolean),
        }}
      />
      <Container>
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-[11px] font-bold text-text-muted mb-6 uppercase tracking-wider">
          <Link href="/" className="hover:text-primary-green transition-colors">
            Ana Sayfa
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-text-muted/60" />
          <Link href="/ilanlar" className="hover:text-primary-green transition-colors">
            İlanlar
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-text-muted/60" />
          <Link 
            href={`/ilanlar?tur=${encodeURIComponent(property.propertyType)}`} 
            className="hover:text-primary-green transition-colors"
          >
            {property.propertyType}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-text-muted/60" />
          <span className="text-text-primary truncate max-w-[200px] md:max-w-xs">
            {property.title}
          </span>
        </nav>

        {/* Gallery */}
        <div className="mb-8">
          <PropertyGallery 
            coverImage={property.coverImage} 
            images={property.images} 
            videoUrl={property.videoUrl} 
          />
        </div>

        {/* Title + Price row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start mb-8">
          <div>
            {/* Badges Row */}
            <div className="flex flex-wrap gap-2 mb-4">
              {property.isFeatured && (
                <div className="badge-featured flex items-center gap-1 px-3 py-1 rounded-md text-white text-[10px] font-bold uppercase tracking-wider">
                  <Star className="w-3 h-3 fill-white" strokeWidth={0} />
                  <span>Öne Çıkan</span>
                </div>
              )}
              {isNew && (
                <div className="badge-new flex items-center gap-1 px-3 py-1 rounded-md text-white text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" strokeWidth={2.5} />
                  <span>Yeni</span>
                </div>
              )}
              <div className={`px-3 py-1 rounded-md text-white text-[10px] font-bold uppercase tracking-wider ${
                property.listingType === "Satılık" ? "badge-satilik" : "badge-kiralik"
              }`}>
                {property.listingType}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-xl md:text-3.5xl font-extrabold text-text-primary tracking-tight leading-tight mb-3">
              {property.title}
            </h1>

            {/* Location & Listing No */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-text-muted">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4.5 w-4.5 text-primary-green/80" />
                <span>{fullAddress}</span>
              </div>
              <span className="text-text-muted/40 hidden sm:inline">•</span>
              <div>
                İlan No: <span className="text-text-primary font-bold">{property.listingNo || property._id.slice(-6).toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Price Card */}
          <div className="space-y-4 w-full">
            <div className="bg-primary-green-softer border border-primary-green-light/10 rounded-2xl p-5 shadow-subtle text-center lg:text-left">
              <span className="text-[10px] font-extrabold text-primary-green-dark uppercase tracking-wider">Fiyat</span>
              <div className="text-3xl md:text-4.5xl font-extrabold text-[#0E3414] mt-1 tracking-tight">
                {displayPrice}
              </div>
            </div>
            
            {/* Share & Favorite Buttons wrapper */}
            <PropertyActions />
          </div>
        </div>

        {/* Key Features Quick Strip */}
        <div className="bg-white rounded-2xl border border-border-light p-6 grid grid-cols-2 md:grid-cols-5 gap-6 mb-8 shadow-subtle">
          {/* Oda Sayısı */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-green-softer flex items-center justify-center flex-shrink-0">
              <Home className="h-5 w-5 text-primary-green-dark" />
            </div>
            <div>
              <div className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Oda Sayısı</div>
              <div className="text-sm font-extrabold text-text-primary mt-0.5">{property.roomCount ?? "Belirtilmemiş"}</div>
            </div>
          </div>

          {/* Metrekare */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-green-softer flex items-center justify-center flex-shrink-0">
              <Maximize2 className="h-5 w-5 text-primary-green-dark" />
            </div>
            <div>
              <div className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Metrekare</div>
              <div className="text-sm font-extrabold text-text-primary mt-0.5">{property.squareMeters ? `${property.squareMeters} m²` : "Belirtilmemiş"}</div>
            </div>
          </div>

          {/* Bina Yaşı */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-green-softer flex items-center justify-center flex-shrink-0">
              <Building className="h-5 w-5 text-primary-green-dark" />
            </div>
            <div>
              <div className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Bina Yaşı</div>
              <div className="text-sm font-extrabold text-text-primary mt-0.5">
                {typeof property.buildingAge === "number" ? `${property.buildingAge} Yaşında` : "Yeni Bina"}
              </div>
            </div>
          </div>

          {/* Bulunduğu Kat */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-green-softer flex items-center justify-center flex-shrink-0">
              <Layers className="h-5 w-5 text-primary-green-dark" />
            </div>
            <div>
              <div className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Bulunduğu Kat</div>
              <div className="text-sm font-extrabold text-text-primary mt-0.5">
                {property.floorNumber ? `${property.floorNumber}. Kat` : "Belirtilmemiş"}
              </div>
            </div>
          </div>

          {/* Banyo Sayısı */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-green-softer flex items-center justify-center flex-shrink-0">
              <Bath className="h-5 w-5 text-primary-green-dark" />
            </div>
            <div>
              <div className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Banyo Sayısı</div>
              <div className="text-sm font-extrabold text-text-primary mt-0.5">
                {typeof property.bathroomCount === "number" ? `${property.bathroomCount} Banyo` : "Belirtilmemiş"}
              </div>
            </div>
          </div>
        </div>

        {/* Two column layouts */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
          
          {/* LEFT COLUMN: Main Details */}
          <div className="space-y-8">
            
            {/* a) Description */}
            <section className="bg-white rounded-2xl border border-border-light p-6 md:p-8 shadow-subtle space-y-4">
              <h2 className="text-lg md:text-xl font-extrabold text-text-primary tracking-tight border-b border-border-light pb-3">
                Açıklama
              </h2>
              <div className="prose prose-sm max-w-none text-text-body font-medium leading-relaxed prose-headings:font-bold prose-headings:text-text-primary prose-a:text-primary-green prose-strong:font-bold">
                {property.description ? (
                  <PortableText value={property.description as any} />
                ) : (
                  <p className="text-text-muted italic">Bu ilan için detaylı açıklama eklenmemiş.</p>
                )}
              </div>
            </section>

            {/* b) Detail Table */}
            <section className="bg-white rounded-2xl border border-border-light p-6 md:p-8 shadow-subtle">
              <h2 className="text-lg md:text-xl font-extrabold text-text-primary tracking-tight border-b border-border-light pb-4 mb-6">
                İlan Detayları
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5 text-xs font-semibold text-text-body">
                {/* Construct detail rows conditionally */}
                {[
                  { label: "İlan Tipi", value: property.listingType },
                  { label: "Emlak Tipi", value: property.propertyType },
                  { label: "Fiyat", value: displayPrice },
                  { label: "Oda Sayısı", value: property.roomCount },
                  { label: "Brüt m²", value: property.squareMeters ? `${property.squareMeters} m²` : null },
                  { label: "Net m²", value: property.netSquareMeters ? `${property.netSquareMeters} m²` : null },
                  { label: "Bina Yaşı", value: typeof property.buildingAge === "number" ? `${property.buildingAge} Yıl` : null },
                  { label: "Bulunduğu Kat", value: property.floorNumber ? `${property.floorNumber}. Kat` : null },
                  { label: "Toplam Kat Sayısı", value: property.totalFloors ? `${property.totalFloors} Kat` : null },
                  { label: "Isınma Tipi", value: property.heatingType },
                  { label: "Banyo Sayısı", value: typeof property.bathroomCount === "number" ? property.bathroomCount : null },
                  { label: "Balkon", value: property.features?.includes("Balkon") ? "Var" : null },
                  { label: "Eşya Durumu", value: property.furnished },
                  { label: "Site İçinde", value: property.features?.includes("Site İçinde") ? "Evet" : null },
                  { label: "Otopark", value: property.features?.includes("Otopark") ? "Var" : null },
                  { label: "Tapu Durumu", value: property.titleDeedStatus },
                  { label: "Krediye Uygun", value: property.suitableForLoan === true ? "Evet" : property.suitableForLoan === false ? "Hayır" : null },
                  { label: "Takasa Uygun", value: property.swapAvailable === true ? "Evet" : property.swapAvailable === false ? "Hayır" : null },
                ].map((row, idx) => {
                  if (row.value === null || row.value === undefined || row.value === "") return null
                  return (
                    <div 
                      key={idx} 
                      className="flex justify-between items-center py-2.5 border-b border-border-light/60 hover:bg-bg-soft/40 px-1 rounded transition-colors"
                    >
                      <span className="text-text-muted font-bold">{row.label}</span>
                      <span className="text-text-primary text-right font-extrabold">{row.value}</span>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* c) Features / Amenities */}
            {property.features && property.features.length > 0 && (
              <section className="bg-white rounded-2xl border border-border-light p-6 md:p-8 shadow-subtle">
                <h2 className="text-lg md:text-xl font-extrabold text-text-primary tracking-tight border-b border-border-light pb-4 mb-6">
                  Özellikler
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {property.features.map((feature, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-1.5 bg-bg-soft border border-border-light/60 text-text-body text-xs font-bold px-4 py-2.5 rounded-full shadow-subtle hover:bg-bg-muted transition-colors"
                    >
                      <Check className="h-4 w-4 text-primary-green" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* d) Location / Directions Map */}
            <section className="bg-white rounded-2xl border border-border-light p-6 md:p-8 shadow-subtle space-y-5">
              <h2 className="text-lg md:text-xl font-extrabold text-text-primary tracking-tight border-b border-border-light pb-3">
                Konum Bilgisi
              </h2>
              
              <div className="flex items-center gap-2 text-xs font-bold text-text-body">
                <MapPin className="h-5 w-5 text-primary-green" />
                <span>{fullAddress}</span>
              </div>

              {property.mapUrl ? (
                <div className="space-y-4">
                  {/* Google Maps directions CTA */}
                  <a
                    href={property.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-bg-soft text-text-primary border border-border-light font-bold text-xs py-3 px-6 rounded-xl shadow-subtle transition-all active:scale-[0.98] w-full sm:w-auto"
                  >
                    <MapPin className="h-4.5 w-4.5 text-primary-green" />
                    <span>Google Haritalar'da Göster / Yol Tarifi Al</span>
                  </a>
                </div>
              ) : (
                <div className="p-8 text-center bg-bg-soft rounded-xl border border-border-light/40">
                  <p className="text-text-muted text-xs font-bold">Harita konumu eklenmemiş.</p>
                </div>
              )}
            </section>

            {/* e) Video Section */}
            {property.videoUrl && (
              <section className="bg-white rounded-2xl border border-border-light p-6 md:p-8 shadow-subtle space-y-4">
                <h2 className="text-lg md:text-xl font-extrabold text-text-primary tracking-tight border-b border-border-light pb-3">
                  İlan Videosu
                </h2>
                {getYoutubeEmbedUrl(property.videoUrl) ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow-subtle">
                    <iframe
                      src={getYoutubeEmbedUrl(property.videoUrl)!}
                      title="İlan Video Gösterimi"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                    />
                  </div>
                ) : (
                  <a
                    href={property.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-primary-green hover:underline"
                  >
                    Videoyu harici tarayıcıda izleyin
                  </a>
                )}
              </section>
            )}

          </div>

          {/* RIGHT COLUMN: Sticky Contact Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            
            {/* Contact Card */}
            <div className="bg-white rounded-2xl border border-border-light p-6 shadow-medium space-y-5">
              <h3 className="text-sm font-extrabold text-text-primary uppercase tracking-wider">
                İletişime Geçin
              </h3>
              <div className="h-px bg-border-light w-full" />
              
              {/* Phone 1 */}
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">{safeSettings.phone1Label || "Şeref İnce"}</span>
                <div className="text-lg font-extrabold text-[#0E3414] tracking-tight">{safeSettings.phone1}</div>
                <a 
                  href={`tel:${safeSettings.phone1.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-2 bg-[#0E3414] hover:bg-[#124018] text-white py-2.5 px-4 rounded-xl font-bold text-xs shadow-subtle transition-all active:scale-[0.98] w-full"
                >
                  <Phone className="h-4 w-4 text-white" />
                  <span>Ara</span>
                </a>
              </div>

              {/* Phone 2 */}
              {safeSettings.phone2 && (
                <div className="space-y-2 pt-2 border-t border-border-light/40">
                  <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">{safeSettings.phone2Label || "Can İnce"}</span>
                  <div className="text-lg font-extrabold text-text-primary tracking-tight">{safeSettings.phone2}</div>
                  <a 
                    href={`tel:${safeSettings.phone2.replace(/\s+/g, '')}`}
                    className="flex items-center justify-center gap-2 bg-white hover:bg-bg-soft border border-border-light text-text-primary py-2.5 px-4 rounded-xl font-bold text-xs shadow-subtle transition-all active:scale-[0.98] w-full"
                  >
                    <Phone className="h-4 w-4 text-text-muted" />
                    <span>Ara</span>
                  </a>
                </div>
              )}

              <div className="h-px bg-border-light w-full" />

              {/* WhatsApp Button */}
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 px-4 rounded-xl font-bold text-xs shadow-md transition-all active:scale-[0.98] w-full cursor-pointer"
              >
                <MessageCircle className="h-4.5 w-4.5 text-white" />
                <span>WhatsApp ile Sor</span>
              </a>

              {/* Working Hours */}
              {safeSettings.workingHours && (
                <>
                  <div className="h-px bg-border-light w-full" />
                  <div className="flex items-center gap-2 text-text-muted text-[10px] font-bold uppercase tracking-wider">
                    <Clock className="h-4.5 w-4.5 text-primary-green" />
                    <span>{safeSettings.workingHours}</span>
                  </div>
                </>
              )}
            </div>

            {/* Trust Badges */}
            <div className="bg-bg-soft/60 rounded-xl p-4 border border-border-light/40 flex flex-col gap-2.5 text-[10px] font-bold uppercase tracking-widest text-text-muted">
              <div className="flex items-center gap-2">
                <span className="text-primary-green text-sm">✓</span>
                <span>Güvenilir Emlak Danışmanı</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary-green text-sm">✓</span>
                <span>20+ Yıllık Tecrübe</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary-green text-sm">✓</span>
                <span>İnegöl'ün Emlakçısı</span>
              </div>
            </div>

          </aside>
        </div>

        {/* 5. Related Properties Section */}
        {relatedProperties && relatedProperties.length > 0 && (
          <section className="bg-bg-soft py-12 -mx-4 md:-mx-6 px-4 md:px-6 mt-12 border-t border-border-light">
            <div className="max-w-7xl mx-auto space-y-6">
              <div>
                <h2 className="text-lg md:text-xl font-extrabold text-text-primary tracking-tight">
                  Benzer İlanlar
                </h2>
                <p className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider mt-0.5">
                  Bu ilana benzer diğer fırsatlar
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedProperties.map((related) => (
                  <ListingCard key={related._id} property={related} />
                ))}
              </div>
            </div>
          </section>
        )}
      </Container>

      {/* 6. MOBILE CONTACT BAR */}
      <MobileContactBar 
        phone1={safeSettings.phone1} 
        whatsapp1={safeSettings.whatsapp1 || '905335187357'} 
        propertyTitle={property.title} 
        propertyListingNo={property.listingNo || property._id.slice(-6).toUpperCase()} 
      />
    </main>
  )
}
