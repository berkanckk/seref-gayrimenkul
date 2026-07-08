"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"

const LOCATIONS = [
  {
    name: "Sinanbey",
    count: 45,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  },
  {
    name: "Cuma Mahallesi",
    count: 32,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
  },
  {
    name: "Yeni Mahalle",
    count: 28,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
  },
  {
    name: "Osmaniye",
    count: 21,
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&q=80",
  },
  {
    name: "Hoca Kasım",
    count: 18,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  },
  {
    name: "Turgutalp",
    count: 15,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
  },
  {
    name: "Kemalpaşa",
    count: 12,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
  },
  {
    name: "Bahçekaya",
    count: 10,
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&q=80",
  },
]

export default function Locations() {
  return (
    <section className="bg-white py-16 md:py-20 font-body">
      <Container>
        <SectionTitle
          title="Popüler Bölgeler"
          subtitle="İnegöl'ün en çok rağbet gören, gelişen ve yaşam standartları yüksek mahallelerindeki ilanları keşfedin."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {LOCATIONS.map((loc, index) => {
            return (
              <Link
                key={index}
                href={`/ilanlar?district=İnegöl&neighborhood=${encodeURIComponent(loc.name)}`}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-card border border-border-light cursor-pointer block"
              >
                {/* Background Image */}
                <Image
                  src={loc.image}
                  alt={`${loc.name} Mahallesi Gayrimenkul`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  priority={false}
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 text-white flex flex-col justify-end z-10">
                  <h3 className="text-base md:text-xl font-extrabold tracking-tight">
                    {loc.name}
                  </h3>
                  <span className="text-[11px] md:text-xs font-bold text-primary-green-light mt-0.5 uppercase tracking-wider bg-primary-green-softer/20 border border-primary-green-light/35 rounded-full px-2.5 py-0.5 w-fit">
                    {loc.count} İlan
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
