"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SortDropdown() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get current sorting parameter or default to "yeni"
  const currentSort = searchParams.get("siralama") || "yeni"

  const handleSortChange = (value: string | null) => {
    if (!value) return
    const params = new URLSearchParams(searchParams.toString())
    if (value === "yeni") {
      params.delete("siralama")
    } else {
      params.set("siralama", value)
    }
    // Reset to page 1 on sort change
    params.delete("sayfa")

    router.push(`/ilanlar?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2 font-body text-xs font-semibold">
      <span className="text-text-muted hidden sm:inline">Sıralama:</span>
      <Select value={currentSort} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px] bg-white border border-border-light text-text-primary rounded-lg font-bold text-xs py-2 shadow-subtle hover:bg-bg-soft cursor-pointer">
          <SelectValue placeholder="Sıralama Seçin" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-border-light rounded-lg shadow-medium text-xs font-bold text-text-primary z-50">
          <SelectItem value="yeni">En Yeni İlanlar</SelectItem>
          <SelectItem value="eski">En Eski İlanlar</SelectItem>
          <SelectItem value="fiyat-artan">Fiyat: Düşükten Yükseğe</SelectItem>
          <SelectItem value="fiyat-azalan">Fiyat: Yüksekten Düşüğe</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
