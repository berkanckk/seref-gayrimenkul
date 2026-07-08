"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search, History, Home as HomeIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import Link from "next/link"

type TabType = "Satılık" | "Kiralık"

export default function Hero() {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState<TabType>("Satılık")
  const [searchText, setSearchText] = React.useState("")

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    let url = "/ilanlar"
    const params: string[] = []

    params.push(`tip=${activeTab === "Satılık" ? "satilik" : "kiralik"}`)

    if (searchText.trim()) {
      params.push(`arama=${encodeURIComponent(searchText.trim())}`)
    }

    if (params.length > 0) {
      url += `?${params.join("&")}`
    }

    router.push(url)
  }

  const chips = [
    { label: "Satılık Daire", href: "/ilanlar?tip=satilik&tur=Daire" },
    { label: "Kiralık Daire", href: "/ilanlar?tip=kiralik&tur=Daire" },
    { label: "Satılık Arsa", href: "/ilanlar?tip=satilik&tur=Arsa" },
  ]

  return (
    <section className="relative px-3 md:px-4 py-0 md:py-1 font-body">
      {/* Outer Card Hero Container - Shorter height & compact spacing */}
      <div className="relative mx-auto max-w-7xl min-h-[440px] md:min-h-[440px] rounded-3xl overflow-hidden shadow-medium flex flex-col items-center justify-start pt-14 md:pt-16 pb-16 px-4 md:px-8">
        
        {/* Background Image - Warm evening architectural photography */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80')" 
          }}
        />
        {/* Triple atmospheric overlay layers for perfect contrast */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0E3414]/20 to-black/60" />

        {/* Heading - Dynamic typography with drop shadow */}
        <div className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-green-300 mb-2 shadow-sm select-none">
            şeref gayrimenkul
          </span>
          <h1 
            className="text-lg md:text-2xl lg:text-[28px] font-black tracking-tight text-white leading-tight"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
          >
            İnegöl&apos;ün <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-200 bg-clip-text text-transparent">Güvenilir</span> Emlak Danışmanı
          </h1>
        </div>

        {/* Search Box - mt-5 md:mt-8 space */}
        <div className="relative z-10 w-full max-w-[calc(100%-16px)] md:max-w-2xl mx-auto flex flex-col mt-5 md:mt-8">
          {/* Tabs row - overlapping visually using -mb-1 */}
          <div className="flex gap-1 pl-4 relative z-10 -mb-1">
            <button
              type="button"
              onClick={() => setActiveTab("Satılık")}
              className={cn(
                "px-5 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-bold transition-all duration-200 rounded-t-xl cursor-pointer",
                activeTab === "Satılık"
                  ? "bg-white text-[#0E3414] z-10 shadow-sm"
                  : "bg-white/10 hover:bg-white/20 border border-white/10 text-white"
              )}
            >
              Satılık
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("Kiralık")}
              className={cn(
                "px-5 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-bold transition-all duration-200 rounded-t-xl cursor-pointer",
                activeTab === "Kiralık"
                  ? "bg-white text-[#0E3414] z-10 shadow-sm"
                  : "bg-white/10 hover:bg-white/20 border border-white/10 text-white"
              )}
            >
              Kiralık
            </button>
          </div>

          {/* Search box body connected visually */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="bg-white shadow-2xl p-2 md:p-2.5 flex items-center gap-2 rounded-2xl border-t-0 z-0"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Kelime, semt veya ilan no ile ara..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-sm font-semibold text-text-primary placeholder:text-gray-400 focus:outline-none"
              />
            </div>

            {/* Smaller Search Button sitting inside the box wrapper */}
            <button
              type="submit"
              className="btn-premium-green w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center flex-shrink-0 hover:opacity-95 transition-opacity text-white cursor-pointer shadow-sm"
              aria-label="Ara"
            >
              <Search className="w-4 h-4 text-white" strokeWidth={2.5} />
            </button>
          </form>
        </div>

        {/* Quick chips below search box (Bigger & Rectangular, mt-4 space) */}
        <div className="relative z-10 flex flex-wrap gap-1.5 justify-start px-1 mt-4 w-full max-w-[calc(100%-16px)] md:max-w-2xl mx-auto">
          {chips.map((chip, index) => (
            <Link
              key={index}
              href={chip.href}
              className="chip-premium text-white text-[11px] md:text-sm font-semibold rounded-md px-3 py-1.5 md:px-5 md:py-2.5 flex items-center gap-1 md:gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
            >
              <History className="w-3.5 h-3.5 text-white/60 shrink-0 hidden md:block" />
              <span>{chip.label}</span>
            </Link>
          ))}
        </div>

        {/* Elegant Small Bottom Banner (Outlined White/Green Pill at bottom-3 md:bottom-5) */}
        <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 chip-premium rounded-full pl-3 md:pl-4 pr-1 md:pr-1.5 py-1 md:py-1.5 flex items-center gap-2 md:gap-3 shadow-lg max-w-[calc(100%-24px)] md:max-w-none z-10">
          <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
            <HomeIcon className="w-3.5 md:w-4 h-3.5 md:h-4 text-white/90 flex-shrink-0" />
            <span className="text-white text-[11px] md:text-sm font-medium truncate">
              <span className="hidden md:inline">Evinizin değerini öğrenmek ister misiniz?</span>
              <span className="md:hidden">Evinizin değerini öğrenin</span>
            </span>
          </div>
          <a 
            href="https://wa.me/905335187357?text=Merhaba,%20evimin%20değerini%20öğrenmek%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium-amber text-white font-bold text-[10px] md:text-xs rounded-full px-2.5 md:px-3 py-1 md:py-1.5 whitespace-nowrap flex-shrink-0 cursor-pointer"
          >
            Değerini Öğren
          </a>
        </div>

      </div>
    </section>
  )
}
