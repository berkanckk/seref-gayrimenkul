"use client"

import * as React from "react"
import { Share2, Heart } from "lucide-react"
import { toast } from "sonner"

export default function PropertyActions() {
  const [isFavorite, setIsFavorite] = React.useState(false)

  const handleShare = () => {
    if (typeof window === "undefined") return
    
    const url = window.location.href
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: url
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(url)
      toast.success("Bağlantı panoya kopyalandı!")
    }
  }

  return (
    <div className="flex gap-2 font-body text-xs font-semibold">
      <button
        type="button"
        onClick={handleShare}
        className="flex-1 flex items-center justify-center gap-2 border border-border-light bg-white hover:bg-bg-soft text-text-primary py-2.5 px-4 rounded-lg shadow-subtle cursor-pointer transition-all active:scale-95"
      >
        <Share2 className="h-4 w-4 text-text-muted" />
        <span>Paylaş</span>
      </button>

      <button
        type="button"
        onClick={() => {
          setIsFavorite(!isFavorite)
          toast.success(isFavorite ? "Favorilerden kaldırıldı." : "Favorilere eklendi!")
        }}
        className="flex-1 flex items-center justify-center gap-2 border border-border-light bg-white hover:bg-bg-soft text-text-primary py-2.5 px-4 rounded-lg shadow-subtle cursor-pointer transition-all active:scale-95"
      >
        <Heart className={`h-4.5 w-4.5 transition-all ${isFavorite ? "fill-red-500 text-red-500 scale-110" : "text-text-muted"}`} />
        <span>{isFavorite ? "Favorilerde" : "Favori"}</span>
      </button>
    </div>
  )
}
