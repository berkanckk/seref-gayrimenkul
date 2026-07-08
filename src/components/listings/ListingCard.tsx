"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, MapPin, Camera, Star, Sparkles } from "lucide-react"
import { formatPrice, formatRelativeDate, getFullAddress } from "@/lib/formatters"
import { getImageUrl } from "@/sanity/lib/image"
import type { Property } from "@/types"

interface ListingCardProps {
  property: Property
}

export default function ListingCard({ property }: ListingCardProps) {
  const [isFavorite, setIsFavorite] = React.useState(false)

  // Generate fallback display values
  const displayPrice = formatPrice(property.price, property.currency)
  const displayAddress = getFullAddress(property)
  const relativeDate = property.publishedAt 
    ? formatRelativeDate(property.publishedAt) 
    : "Yeni İlan"

  // Fallback values for layout details
  const roomCountStr = property.roomCount ?? "Belirtilmemiş"
  const areaStr = property.squareMeters ? `${property.squareMeters} m²` : "Belirtilmemiş"
  const ageStr = typeof property.buildingAge === "number" 
    ? `${property.buildingAge} Yaşında` 
    : "Yeni Bina"
  
  const listingNumber = property.listingNo ?? property._id.slice(-6).toUpperCase()

  // Dynamic image list count
  const imageCount = property.images ? property.images.length + 1 : 1
  const imageUrl = getImageUrl(property.coverImage, 600, 450)

  // "NEW" LOGIC
  const isNew = (() => {
    if (!property.publishedAt) return false;
    const daysDiff = (Date.now() - new Date(property.publishedAt).getTime()) 
      / (1000 * 60 * 60 * 24);
    return daysDiff <= 7; // Show "YENİ" for 7 days
  })();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-primary-green/20 transition-all duration-300 group cursor-pointer flex flex-col h-full font-body">
      <Link href={`/ilanlar/${property.slug.current}`} className="flex flex-col h-full">
        {/* Image Section */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg-muted">
          <Image
            src={imageUrl}
            alt={property.coverImage.alt ?? property.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />

          {/* New / Featured Badges (Side by Side) */}
          <div className="absolute top-3 left-3 flex gap-1.5 z-10">
            {property.isFeatured && (
              <div className="badge-featured flex items-center gap-1 px-2 py-1 rounded-md text-white text-[10px] font-bold uppercase tracking-wider">
                <Star className="w-3 h-3 fill-white" strokeWidth={0} />
                <span>Öne Çıkan</span>
              </div>
            )}
            {isNew && (
              <div className="badge-new px-2 py-1 rounded-md text-white text-[10px] font-bold uppercase tracking-wider">
                Yeni
              </div>
            )}
          </div>

          {/* Favorite Toggle Button */}
          <button
            type="button"
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 h-8 w-8 bg-white hover:bg-bg-soft rounded-full flex items-center justify-center shadow-subtle border border-border-light/20 z-10 transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Favorilere Ekle"
          >
            <Heart 
              className={`h-4 w-4 transition-all duration-200 ${
                isFavorite 
                  ? "fill-red-500 text-red-500 scale-110" 
                  : "text-text-primary hover:text-red-500"
              }`} 
            />
          </button>

          {/* Image Count Overlay */}
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs rounded-md px-2 py-1 flex items-center gap-1">
            <Camera className="h-3 w-3" />
            <span>1/{imageCount}</span>
          </div>

          {/* Listing Type Badge */}
          <div className={`absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-white text-[10px] font-bold uppercase tracking-wider z-10 ${
            property.listingType === "Satılık" ? "badge-satilik" : "badge-kiralik"
          }`}>
            {property.listingType}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-1 justify-between min-h-[160px]">
          <div>
            {/* Title */}
            <h3 className="text-sm font-bold text-text-primary line-clamp-2 leading-snug group-hover:text-primary-green transition-colors duration-200 min-h-[40px]">
              {property.title}
            </h3>

            {/* Location details */}
            <div className="flex items-center gap-1 mt-1.5 text-xs text-text-muted">
              <span className="truncate">{displayAddress}</span>
            </div>

            {/* Property specs details row */}
            {(() => {
              const details: React.ReactNode[] = [];
              
              // 1. Room Count (or Property Type as fallback)
              if (property.roomCount) {
                details.push(<span key="room" className="whitespace-nowrap">{property.roomCount}</span>);
              } else if (property.propertyType) {
                details.push(<span key="type" className="whitespace-nowrap">{property.propertyType}</span>);
              }

              // 2. Square Meters
              if (property.squareMeters) {
                details.push(<span key="area" className="whitespace-nowrap">{property.squareMeters} m²</span>);
              }

              // 3. Building Age (or Loan Suitability as fallback)
              if (property.buildingAge !== undefined && property.buildingAge !== null) {
                details.push(
                  <span key="age" className="whitespace-nowrap">
                    {property.buildingAge === 0 ? "Yeni Bina" : `${property.buildingAge} Yaşında`}
                  </span>
                );
              } else if (property.suitableForLoan) {
                details.push(<span key="loan" className="whitespace-nowrap">Krediye Uygun</span>);
              }

              if (details.length === 0) return null;

              // Build rendering list using plain forEach to avoid TS reduce type issues
              const rendered: React.ReactNode[] = [];
              details.forEach((item, index) => {
                if (index > 0) {
                  rendered.push(<span key={`dot-${index}`} className="text-gray-300 select-none">•</span>);
                }
                rendered.push(item);
              });

              return (
                <div className="flex items-center mt-1 text-xs text-text-muted flex-wrap gap-x-1.5 gap-y-0.5">
                  {rendered}
                </div>
              );
            })()}
          </div>

          {/* Price (bottom aligned) */}
          <div className="mt-3">
            <p className="text-lg md:text-xl font-black text-text-primary leading-none">
              {displayPrice}
            </p>
          </div>
        </div>
      </Link>
    </article>
  )
}
