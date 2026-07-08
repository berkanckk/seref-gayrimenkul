"use client"

import * as React from "react"
import { Filter, SlidersHorizontal } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import ListingFilters from "./ListingFilters"

export default function MobileFilterTrigger() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button className="w-full flex items-center justify-center gap-2 bg-white border border-border-light text-text-primary font-bold text-xs py-2 px-4 rounded-lg shadow-subtle hover:bg-bg-soft cursor-pointer">
            <Filter className="h-4 w-4 text-primary-green" />
            <span>Filtrele</span>
          </button>
        }
      />
      <SheetContent side="right" className="bg-white p-6 overflow-y-auto w-full max-w-md">
        <SheetHeader className="mb-4 p-0">
          <SheetTitle className="text-lg font-extrabold text-text-primary flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-primary-green" />
            <span>Filtre Seçenekleri</span>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <ListingFilters onApply={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
