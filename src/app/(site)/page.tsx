import type { Metadata } from 'next'
import { getFeaturedProperties, getSiteSettings } from "@/sanity/lib/fetchers"
import Hero from "@/components/home/Hero"
import Categories from "@/components/home/Categories"
import FeaturedListings from "@/components/home/FeaturedListings"
import MarketOverview from "@/components/home/MarketOverview"
import HomeValueCalculator from "@/components/home/HomeValueCalculator"
import MortgageCalculator from "@/components/home/MortgageCalculator"
import WhyUs from "@/components/home/WhyUs"
import CTASection from "@/components/home/CTASection"
import { JsonLd } from "@/components/shared/JsonLd"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    title:
      settings?.seoTitle ||
      "Şeref Gayrimenkul - İnegöl'ün Güvenilir Emlak Danışmanı",
    description:
      settings?.seoDescription ||
      "İnegöl ve Bursa'da satılık, kiralık daire, villa, arsa ve ticari mülkler. Uzun yıllara dayanan tecrübe ile güvenilir gayrimenkul danışmanlığı.",
    alternates: { canonical: "/" },
    openGraph: {
      title:
        settings?.seoTitle ||
        "Şeref Gayrimenkul - İnegöl'ün Güvenilir Emlak Danışmanı",
      description:
        settings?.seoDescription ||
        "İnegöl ve Bursa'da satılık, kiralık daire, villa, arsa ve ticari mülkler.",
      url: "https://serefgayrimenkul.com",
      images: settings?.seoImage
        ? []
        : [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Şeref Gayrimenkul" }],
    },
  }
}

export default async function HomePage() {
  // Fetch featured properties with ISR tag support from Sanity
  const featured = await getFeaturedProperties()

  return (
    <div className="flex flex-col min-h-screen">
      {/* JSON-LD Structured Data — RealEstateAgent */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: "Şeref Gayrimenkul",
          description: "İnegöl'ün güvenilir emlak danışmanı",
          url: "https://serefgayrimenkul.com",
          telephone: ["+905335187357", "+905332760329"],
          address: {
            "@type": "PostalAddress",
            streetAddress: "Sinanbey, Kanal Sk. No:14 D:E",
            addressLocality: "İnegöl",
            addressRegion: "Bursa",
            postalCode: "16400",
            addressCountry: "TR",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              opens: "09:00",
              closes: "19:00",
            },
          ],
          priceRange: "₺₺",
          areaServed: [
            { "@type": "City", name: "İnegöl" },
            { "@type": "City", name: "Bursa" },
          ],
        }}
      />

      {/* Emlakjet exact search & warm visual hero */}
      <Hero />

      {/* Simplified, circle-free category row */}
      <Categories />

      {/* Grid of featured listings with double filter tabs */}
      <FeaturedListings properties={featured} />

      {/* Market overview section */}
      <MarketOverview />

      {/* Home value calculator section */}
      <HomeValueCalculator />

      {/* Mortgage calculator section */}
      <MortgageCalculator />

      {/* Why choose us trust features */}
      <WhyUs />

      {/* Valuation call to action block */}
      <CTASection />
    </div>
  )
}
