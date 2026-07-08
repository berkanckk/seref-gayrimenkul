"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getAllCities, getDistrictsByCity } from "@/lib/turkeyLocations"

interface ListingFiltersProps {
  onApply?: () => void // Optional callback for closing the mobile sheet
}

const PROPERTY_TYPES = [
  { label: "Tüm Emlak Tipleri", value: "" },
  { label: "Daire", value: "Daire" },
  { label: "Villa", value: "Villa" },
  { label: "Müstakil Ev", value: "Müstakil Ev" },
  { label: "Arsa", value: "Arsa" },
  { label: "Dükkan", value: "Dükkan" },
  { label: "Ofis", value: "Ofis" },
  { label: "Depo", value: "Depo" },
  { label: "Bina", value: "Bina" },
  { label: "Çiftlik", value: "Çiftlik" },
]

const ROOM_COUNTS = ["1+0", "1+1", "2+1", "3+1", "4+1", "5+1", "6+ Oda"]

function normalizePropertyType(val: string | null): string {
  if (!val) return ""
  const raw = val.toLowerCase()
  if (raw === "daire") return "Daire"
  if (raw === "villa") return "Villa"
  if (raw === "mustakil" || raw === "mustakil-ev" || raw === "müstakil" || raw === "müstakil ev") return "Müstakil Ev"
  if (raw === "arsa") return "Arsa"
  if (raw === "dukkan" || raw === "dükkan") return "Dükkan"
  if (raw === "ofis") return "Ofis"
  if (raw === "depo") return "Depo"
  if (raw === "bina") return "Bina"
  if (raw === "ciftlik" || raw === "çiftlik") return "Çiftlik"
  return val
}

export default function ListingFilters({ onApply }: ListingFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Local state initialized from URL params, defaulting to Bursa/İnegöl visually if not set in query params
  const [tip, setTip] = React.useState(searchParams.get("tip") || "")
  const [tur, setTur] = React.useState(normalizePropertyType(searchParams.get("tur")))
  
  const initialSehir = searchParams.get("sehir") !== null ? searchParams.get("sehir")! : "Bursa"
  const initialIlce = searchParams.get("ilce") !== null ? searchParams.get("ilce")! : (initialSehir === "Bursa" ? "İnegöl" : "")
  
  const [sehir, setSehir] = React.useState(initialSehir)
  const [ilce, setIlce] = React.useState(initialIlce)
  
  const [minFiyat, setMinFiyat] = React.useState(searchParams.get("minFiyat") || "")
  const [maxFiyat, setMaxFiyat] = React.useState(searchParams.get("maxFiyat") || "")
  const [oda, setOda] = React.useState(searchParams.get("oda") || "")

  // Watch URL changes to update filters (e.g. when reset outside)
  React.useEffect(() => {
    setTip(searchParams.get("tip") || "")
    setTur(normalizePropertyType(searchParams.get("tur")))
    
    const currentSehir = searchParams.get("sehir") !== null ? searchParams.get("sehir")! : "Bursa"
    const currentIlce = searchParams.get("ilce") !== null ? searchParams.get("ilce")! : (currentSehir === "Bursa" ? "İnegöl" : "")
    
    setSehir(currentSehir)
    setIlce(currentIlce)
    setMinFiyat(searchParams.get("minFiyat") || "")
    setMaxFiyat(searchParams.get("maxFiyat") || "")
    setOda(searchParams.get("oda") || "")
  }, [searchParams])

  const handleCityChange = (newCity: string) => {
    setSehir(newCity)
    // On city change, reset district to default or empty
    if (newCity === "Bursa") {
      setIlce("İnegöl")
    } else {
      setIlce("")
    }
  }

  const handleApplyFilters = () => {
    const params = new URLSearchParams()

    if (tip) params.set("tip", tip)
    if (tur) params.set("tur", tur)
    if (sehir) params.set("sehir", sehir)
    if (ilce) params.set("ilce", ilce)
    if (minFiyat) params.set("minFiyat", minFiyat)
    if (maxFiyat) params.set("maxFiyat", maxFiyat)
    if (oda) params.set("oda", oda)

    // Preserve search term if present
    const arama = searchParams.get("arama")
    if (arama) params.set("arama", arama)

    // Preserve sorting if present
    const sort = searchParams.get("siralama")
    if (sort) params.set("siralama", sort)

    // Reset to page 1
    router.push(`/ilanlar?${params.toString()}`)
    if (onApply) onApply()
  }

  const handleClearFilters = () => {
    setTip("")
    setTur("")
    setSehir("Bursa")
    setIlce("İnegöl")
    setMinFiyat("")
    setMaxFiyat("")
    setOda("")
    router.push("/ilanlar")
    if (onApply) onApply()
  }

  const handlePricePreset = (min: string, max: string) => {
    setMinFiyat(min)
    setMaxFiyat(max)
  }

  const toggleRoomCount = (value: string) => {
    if (oda === value) {
      setOda("") // Toggle off
    } else {
      setOda(value)
    }
  }

  // Get dynamic districts lists based on selected city
  const districtList = getDistrictsByCity(sehir)

  return (
    <div className="space-y-6 font-body text-xs font-semibold">
      {/* 1. LISTING TYPE (İlan Tipi) */}
      <div className="pb-5 border-b border-border-light">
        <label className="block text-xs font-bold uppercase tracking-wider text-text-primary mb-3">
          İlan Tipi
        </label>
        <div className="grid grid-cols-3 gap-1 bg-bg-muted p-1 rounded-xl border border-border-light/40">
          {(
            [
              { label: "Tümü", value: "" },
              { label: "Satılık", value: "satilik" },
              { label: "Kiralık", value: "kiralik" },
            ] as const
          ).map((opt) => {
            const isActive = tip === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setTip(opt.value)}
                className={`py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? "bg-primary-green text-white shadow-subtle"
                    : "text-text-body hover:bg-bg-soft"
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. PROPERTY TYPE (Emlak Tipi) */}
      <div className="pb-5 border-b border-border-light">
        <label htmlFor="property-type-select" className="block text-xs font-bold uppercase tracking-wider text-text-primary mb-3">
          Emlak Tipi
        </label>
        <select
          id="property-type-select"
          value={tur}
          onChange={(e) => setTur(e.target.value)}
          className="w-full bg-white border border-border-light rounded-lg px-3 py-2.5 text-xs font-bold text-text-primary focus:outline-none focus:border-primary-green cursor-pointer shadow-subtle"
        >
          {PROPERTY_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* 3. PRICE RANGE (Fiyat Aralığı) */}
      <div className="pb-5 border-b border-border-light">
        <label className="block text-xs font-bold uppercase tracking-wider text-text-primary mb-3">
          Fiyat Aralığı
        </label>
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted font-bold">₺</span>
            <input
              type="number"
              placeholder="Min"
              value={minFiyat}
              onChange={(e) => setMinFiyat(e.target.value)}
              className="w-full pl-7 pr-2 py-2 border border-border-light rounded-lg text-xs font-bold text-text-primary focus:outline-none focus:border-primary-green bg-white shadow-subtle"
              aria-label="Minimum Fiyat"
            />
          </div>
          <span className="text-text-muted">-</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted font-bold">₺</span>
            <input
              type="number"
              placeholder="Max"
              value={maxFiyat}
              onChange={(e) => setMaxFiyat(e.target.value)}
              className="w-full pl-7 pr-2 py-2 border border-border-light rounded-lg text-xs font-bold text-text-primary focus:outline-none focus:border-primary-green bg-white shadow-subtle"
              aria-label="Maksimum Fiyat"
            />
          </div>
        </div>
        {/* Preset buttons */}
        <div className="flex gap-1.5 flex-wrap mt-3">
          <button
            type="button"
            onClick={() => handlePricePreset("0", "500000")}
            className="px-2.5 py-1 rounded bg-bg-muted hover:bg-bg-soft border border-border-light/20 text-[10px] font-bold text-text-body cursor-pointer"
          >
            0-500K
          </button>
          <button
            type="button"
            onClick={() => handlePricePreset("500000", "1000000")}
            className="px-2.5 py-1 rounded bg-bg-muted hover:bg-bg-soft border border-border-light/20 text-[10px] font-bold text-text-body cursor-pointer"
          >
            500K-1M
          </button>
          <button
            type="button"
            onClick={() => handlePricePreset("1000000", "")}
            className="px-2.5 py-1 rounded bg-bg-muted hover:bg-bg-soft border border-border-light/20 text-[10px] font-bold text-text-body cursor-pointer"
          >
            1M+
          </button>
        </div>
      </div>

      {/* 4. ROOM COUNT (Oda Sayısı) */}
      <div className="pb-5 border-b border-border-light">
        <label className="block text-xs font-bold uppercase tracking-wider text-text-primary mb-3">
          Oda Sayısı
        </label>
        <div className="flex flex-wrap gap-1.5">
          {ROOM_COUNTS.map((opt) => {
            const isActive = oda === opt
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleRoomCount(opt)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer shadow-subtle ${
                  isActive
                    ? "bg-primary-green text-white border-primary-green"
                    : "bg-bg-soft border-border-light text-text-body hover:bg-bg-muted"
                }`}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>

      {/* 5. LOCATION (Konum) */}
      <div className="pb-5 border-b border-border-light space-y-4">
        <div>
          <label htmlFor="city-select" className="block text-xs font-bold uppercase tracking-wider text-text-primary mb-2">
            Şehir
          </label>
          <select
            id="city-select"
            value={sehir}
            onChange={(e) => handleCityChange(e.target.value)}
            className="w-full bg-white border border-border-light rounded-lg px-3 py-2 text-xs font-bold text-text-primary focus:outline-none focus:border-primary-green cursor-pointer shadow-subtle"
          >
            <option value="">Tüm İller</option>
            {getAllCities().map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="district-select" className="block text-xs font-bold uppercase tracking-wider text-text-primary mb-2">
            İlçe
          </label>
          <select
            id="district-select"
            value={ilce}
            onChange={(e) => setIlce(e.target.value)}
            disabled={sehir === ""}
            className="w-full bg-white border border-border-light rounded-lg px-3 py-2 text-xs font-bold text-text-primary focus:outline-none focus:border-primary-green cursor-pointer shadow-subtle disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Tüm İlçeler</option>
            {districtList.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-2 space-y-3">
        <button
          type="button"
          onClick={handleApplyFilters}
          className="w-full btn-premium-green text-white text-xs font-bold py-3 rounded-xl cursor-pointer shadow-sm"
        >
          Filtreleri Uygula
        </button>
        <button
          type="button"
          onClick={handleClearFilters}
          className="w-full text-center text-xs font-bold text-text-muted hover:text-primary-green transition-colors cursor-pointer"
        >
          Temizle
        </button>
      </div>
    </div>
  )
}
