"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, ClipboardList, Home as HomeIcon, ChevronLeft, ChevronRight } from "lucide-react"
import Container from "@/components/shared/Container"
import ListingCard from "@/components/listings/ListingCard"
import type { Property } from "@/types"
import { cn } from "@/lib/utils"

interface FeaturedListingsProps {
  properties: readonly Property[]
}

type CategoryGroup = "Hepsi" | "Konut" | "Arsa" | "Ticari"

export default function FeaturedListings({ properties }: FeaturedListingsProps) {
  const [activeGroup, setActiveGroup] = React.useState<CategoryGroup>("Hepsi")
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollRef.current
    if (!container) return
    // Scroll by the width of the container (one full page of visible items)
    const cardWidth = container.clientWidth
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth
    container.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }

  const filteredProperties = React.useMemo(() => {
    if (!properties) return []
    if (activeGroup === "Hepsi") {
      return [...properties]
    }
    if (activeGroup === "Konut") {
      return properties.filter(p => 
        ["Daire", "Villa", "Müstakil Ev"].includes(p.propertyType)
      )
    }
    if (activeGroup === "Arsa") {
      return properties.filter(p => 
        ["Arsa", "Tarla"].includes(p.propertyType)
      )
    }
    if (activeGroup === "Ticari") {
      return properties.filter(p => 
        ["Dükkan / Mağaza", "Ofis", "Depo", "Fabrika"].includes(p.propertyType)
      )
    }
    return []
  }, [properties, activeGroup])

  const hasProperties = filteredProperties.length > 0

  return (
    <section className="bg-bg-soft pt-6 pb-8 md:pt-8 md:pb-10 border-t border-border-light font-body">
      <Container>
        {/* Title & Subtitle Centered */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-text-primary">
            Öne Çıkan İlanlar
          </h2>
          <p className="text-xs md:text-sm font-semibold text-text-muted mt-2">
            En seçkin satılık ve kiralık ilanlarımız
          </p>

          {/* Emlakjet centered individual filter tabs row */}
          <div className="flex justify-center gap-2 flex-wrap mt-5 text-xs font-bold w-full max-w-4xl mx-auto">
            <button
              type="button"
              onClick={() => setActiveGroup("Hepsi")}
              className={cn(
                "px-5 py-2 text-sm font-semibold rounded-full border transition-all cursor-pointer",
                activeGroup === "Hepsi"
                  ? "bg-primary-green text-white border-transparent shadow-md"
                  : "bg-white border-gray-200 text-text-muted hover:text-text-primary hover:border-gray-300 shadow-sm"
              )}
            >
              Hepsi
            </button>
            <button
              type="button"
              onClick={() => setActiveGroup("Konut")}
              className={cn(
                "px-5 py-2 text-sm font-semibold rounded-full border transition-all cursor-pointer",
                activeGroup === "Konut"
                  ? "bg-primary-green text-white border-transparent shadow-md"
                  : "bg-white border-gray-200 text-text-muted hover:text-text-primary hover:border-gray-300 shadow-sm"
              )}
            >
              Konut
            </button>
            <button
              type="button"
              onClick={() => setActiveGroup("Arsa")}
              className={cn(
                "px-5 py-2 text-sm font-semibold rounded-full border transition-all cursor-pointer",
                activeGroup === "Arsa"
                  ? "bg-primary-green text-white border-transparent shadow-md"
                  : "bg-white border-gray-200 text-text-muted hover:text-text-primary hover:border-gray-300 shadow-sm"
              )}
            >
              Arsa
            </button>
            <button
              type="button"
              onClick={() => setActiveGroup("Ticari")}
              className={cn(
                "px-5 py-2 text-sm font-semibold rounded-full border transition-all cursor-pointer",
                activeGroup === "Ticari"
                  ? "bg-primary-green text-white border-transparent shadow-md"
                  : "bg-white border-gray-200 text-text-muted hover:text-text-primary hover:border-gray-300 shadow-sm"
              )}
            >
              Ticari
            </button>
            <button
              type="button"
              className="px-5 py-2 text-sm font-semibold rounded-full border bg-primary-green text-white border-transparent cursor-pointer shadow-md"
            >
              En Yeni
            </button>
          </div>
        </div>

        {/* Listings Slider Carousel with absolute navigation arrows */}
        {hasProperties ? (
          <>
            <div className="relative group/slider mt-6">
              {/* Left navigation arrow */}
              <button
                type="button"
                onClick={() => handleScroll("left")}
                className="absolute left-[-22px] top-[40%] -translate-y-1/2 z-20 bg-white border border-gray-100 rounded-full w-11 h-11 flex items-center justify-center shadow-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer opacity-0 group-hover/slider:opacity-100 -translate-x-2 group-hover/slider:translate-x-0 disabled:opacity-0"
                aria-label="Geri"
              >
                <ChevronLeft className="w-5 h-5 text-text-primary" />
              </button>

              {/* Right navigation arrow */}
              <button
                type="button"
                onClick={() => handleScroll("right")}
                className="absolute right-[-22px] top-[40%] -translate-y-1/2 z-20 bg-white border border-gray-100 rounded-full w-11 h-11 flex items-center justify-center shadow-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer opacity-0 group-hover/slider:opacity-100 translate-x-2 group-hover/slider:translate-x-0 disabled:opacity-0"
                aria-label="İleri"
              >
                <ChevronRight className="w-5 h-5 text-text-primary" />
              </button>

              {/* The scrollable row */}
              <div 
                ref={scrollRef}
                className="flex flex-row overflow-x-auto gap-5 pb-4 scrollbar-none scroll-smooth snap-x snap-mandatory w-full"
                style={{
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none',
                }}
              >
                {filteredProperties.map((property) => (
                  <div 
                    key={property._id} 
                    className="w-[85%] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)] flex-shrink-0 snap-start max-w-sm"
                  >
                    <ListingCard property={property} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Outlined View All Button */}
            <div className="mt-10 text-center">
              <Link 
                href="/ilanlar" 
                className="inline-flex items-center gap-2 border border-primary-green text-primary-green hover:bg-primary-green/5 font-bold px-6 py-2.5 rounded-lg text-sm transition-all duration-200 shadow-sm cursor-pointer group"
              >
                <span>Tüm İlanları Gör</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </>
        ) : (
          /* Clean Empty State */
          <div className="bg-white rounded-2xl p-8 md:p-10 text-center border border-gray-100 max-w-md mx-auto shadow-sm flex flex-col items-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-green-softer flex items-center justify-center">
              <HomeIcon className="w-8 h-8 text-primary-green" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Bu kategoride öne çıkan ilan yok
            </h3>
            <p className="text-sm text-text-muted mb-4">
              Farklı bir kategori seçin veya tüm ilanlarimizi inceleyin.
            </p>
            <Link 
              href="/ilanlar" 
              className="inline-flex items-center gap-2 border border-primary-green text-primary-green hover:bg-primary-green/5 font-bold px-6 py-2.5 rounded-lg text-sm transition-all duration-200 shadow-sm cursor-pointer group"
            >
              <span>Tüm İlanları Gör</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </Container>
    </section>
  )
}
