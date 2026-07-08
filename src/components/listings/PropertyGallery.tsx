"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, Play, Camera } from "lucide-react"
import { getImageUrl } from "@/sanity/lib/image"
import type { SanityImage } from "@/types"

interface PropertyGalleryProps {
  coverImage: SanityImage
  images?: readonly SanityImage[]
  videoUrl?: string
}

const EMPTY_IMAGES: readonly SanityImage[] = []

export default function PropertyGallery({ coverImage, images = EMPTY_IMAGES, videoUrl }: PropertyGalleryProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState(0)

  // Combine cover image and gallery images
  const allImages = React.useMemo(() => [coverImage, ...(images || [])], [coverImage, images])
  const totalCount = allImages.length

  const handleOpen = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
    document.body.style.overflow = "hidden"
  }

  const handleClose = () => {
    setIsOpen(false)
    document.body.style.overflow = "unset"
  }

  const handlePrev = React.useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalCount - 1 : prev - 1))
  }, [totalCount])

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev === totalCount - 1 ? 0 : prev + 1))
  }, [totalCount])

  // Keyboard navigation
  React.useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "Escape") handleClose()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, handlePrev, handleNext])

  return (
    <div className="w-full font-body">
      {/* DESKTOP LAYOUT (Grid of 5 images) */}
      <div className="hidden md:grid grid-cols-4 gap-2 h-[450px] md:h-[500px] w-full rounded-2xl overflow-hidden relative">
        {/* Main large image (left half) */}
        <div 
          className="col-span-2 row-span-2 relative cursor-pointer group bg-bg-muted"
          onClick={() => handleOpen(0)}
        >
          <Image
            src={getImageUrl(allImages[0], 800, 600)}
            alt={allImages[0].alt ?? "Mülk Görseli"}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-all duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
          
          {/* Total photos badge */}
          <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md">
            <Camera className="w-4 h-4 text-primary-green-light" />
            <span>{totalCount} Fotoğraf</span>
          </div>

          {/* Video badge on cover image if videoUrl exists */}
          {videoUrl && (
            <div className="absolute top-4 left-4 bg-[#0E3414]/90 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md border border-white/10">
              <Play className="w-3.5 h-3.5 fill-white text-white" />
              <span>Videolu İlan</span>
            </div>
          )}
        </div>

        {/* 4 smaller images (right half) */}
        {[1, 2, 3, 4].map((index) => {
          const image = allImages[index]
          return (
            <div 
              key={index} 
              className="relative cursor-pointer group bg-bg-muted overflow-hidden"
              onClick={() => (image ? handleOpen(index) : handleOpen(0))}
            >
              {image ? (
                <>
                  <Image
                    src={getImageUrl(image, 400, 300)}
                    alt={image.alt ?? `Galeri Görseli ${index}`}
                    fill
                    sizes="25vw"
                    className="object-cover transition-all duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-all duration-300" />
                </>
              ) : (
                /* Fallback if less than 5 images */
                <div className="absolute inset-0 bg-gradient-to-br from-bg-soft to-bg-muted flex items-center justify-center border border-border-light/20">
                  <span className="text-text-muted/40 font-bold text-xs">Şeref Gayrimenkul</span>
                </div>
              )}

              {/* Show "+X Fotoğraf" overlay on the last thumbnail block if there are more than 5 images */}
              {index === 4 && totalCount > 5 && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                  <span className="text-xl font-extrabold">+{totalCount - 5}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">Fotoğraf</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* MOBILE LAYOUT (Full width image + horizontal strip) */}
      <div className="md:hidden space-y-2">
        <div 
          className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-bg-muted cursor-pointer"
          onClick={() => handleOpen(0)}
        >
          <Image
            src={getImageUrl(allImages[0], 600, 450)}
            alt={allImages[0].alt ?? "Mülk Görseli"}
            fill
            sizes="100vw"
            className="object-cover"
          />
          {videoUrl && (
            <div className="absolute top-3 left-3 bg-[#0E3414]/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
              <Play className="w-3 h-3 fill-white" />
              <span>Videolu</span>
            </div>
          )}
          <div className="absolute bottom-3 left-3 bg-black/75 text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
            <Camera className="w-3.5 h-3.5" />
            <span>1/{totalCount}</span>
          </div>
        </div>

        {/* Horizontal scroll strip for thumbnails */}
        {totalCount > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
            {allImages.map((image, index) => (
              <div 
                key={index} 
                className="relative h-14 w-20 flex-shrink-0 rounded-lg overflow-hidden border border-border-light/60 snap-start cursor-pointer bg-bg-muted"
                onClick={() => handleOpen(index)}
              >
                <Image
                  src={getImageUrl(image, 160, 120)}
                  alt={`Minik Galeri ${index}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX FULLSCREEN MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between select-none">
          {/* Top Bar */}
          <div className="w-full flex justify-between items-center px-4 md:px-8 py-4 bg-gradient-to-b from-black/80 to-transparent">
            <div className="text-white text-sm font-bold tracking-wide">
              {currentIndex + 1} / {totalCount}
            </div>
            <button 
              type="button" 
              onClick={handleClose} 
              className="text-white/80 hover:text-white transition-colors cursor-pointer p-1.5 rounded-full hover:bg-white/10"
              aria-label="Kapat"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Large Center Image with Navigation arrows */}
          <div className="relative flex-1 flex items-center justify-center px-4 md:px-16">
            {/* Prev Arrow */}
            <button 
              type="button" 
              onClick={handlePrev}
              className="absolute left-2 md:left-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer z-10 hover:scale-105 active:scale-95"
              aria-label="Önceki Fotoğraf"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Centered Image */}
            <div className="relative w-full h-[60vh] md:h-[75vh] max-w-5xl">
              <Image
                src={getImageUrl(allImages[currentIndex], 1200, 900)}
                alt={allImages[currentIndex].alt ?? `Lightbox Görseli ${currentIndex}`}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
              />
            </div>

            {/* Next Arrow */}
            <button 
              type="button" 
              onClick={handleNext}
              className="absolute right-2 md:right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer z-10 hover:scale-105 active:scale-95"
              aria-label="Sonraki Fotoğraf"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>

          {/* Bottom Thumbnail Strip */}
          <div className="w-full bg-gradient-to-t from-black/85 via-black/50 to-transparent py-4 px-4 overflow-x-auto flex justify-center gap-2 max-w-full scrollbar-none">
            <div className="flex gap-2">
              {allImages.map((image, idx) => {
                const isActive = idx === currentIndex
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative h-12 w-16 md:h-14 md:w-20 rounded-md overflow-hidden transition-all flex-shrink-0 cursor-pointer ${
                      isActive ? "ring-2 ring-primary-green scale-105 opacity-100" : "opacity-60 hover:opacity-90"
                    }`}
                  >
                    <Image
                      src={getImageUrl(image, 160, 120)}
                      alt={`Lightbox strip thumbnail ${idx}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
