"use client"

import * as React from "react"
import Link from "next/link"
import { Home, Key, Trees, Building, Store, LayoutGrid } from "lucide-react"

const CATEGORY_ITEMS = [
  {
    label: "Satılık Daire",
    icon: Home,
    href: "/ilanlar?tip=satilik&tur=Daire",
  },
  {
    label: "Kiralık Daire",
    icon: Key,
    href: "/ilanlar?tip=kiralik&tur=Daire",
  },
  {
    label: "Satılık Arsa",
    icon: Trees,
    href: "/ilanlar?tip=satilik&tur=Arsa",
  },
  {
    label: "Satılık Villa",
    icon: Building,
    href: "/ilanlar?tip=satilik&tur=Villa",
  },
  {
    label: "Satılık Dükkan",
    icon: Store,
    href: "/ilanlar?tip=satilik&tur=Dükkan",
  },
  {
    label: "Tüm İlanlar",
    icon: LayoutGrid,
    href: "/ilanlar",
  },
]

export default function Categories() {
  return (
    <section className="bg-white pt-4 pb-3 md:pt-5 md:pb-4 font-body">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-5 justify-center">
          {CATEGORY_ITEMS.map((item, index) => {
            const IconComponent = item.icon
            return (
              <Link
                key={index}
                href={item.href}
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                {/* Gray rounded icon box (Emlakjet style) */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-primary-green-softer group-hover:border-primary-green/20 transition-all duration-200">
                  <IconComponent className="h-5 w-5 md:h-6 md:w-6 text-primary-green stroke-[1.5]" />
                </div>
                {/* Label below */}
                <span className="text-xs font-semibold text-text-primary group-hover:text-primary-green transition-colors duration-200 text-center leading-tight">
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
