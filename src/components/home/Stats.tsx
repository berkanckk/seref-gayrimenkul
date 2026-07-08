import * as React from "react"
import { Home, Users, Award, MapPin } from "lucide-react"
import Container from "@/components/shared/Container"

const STATS_ITEMS = [
  {
    icon: Home,
    value: "500+",
    label: "Aktif İlan",
  },
  {
    icon: Users,
    value: "1.200+",
    label: "Mutlu Müşteri",
  },
  {
    icon: Award,
    value: "20+",
    label: "Yıllık Tecrübe",
  },
  {
    icon: MapPin,
    value: "İnegöl",
    label: "Merkez Konum",
  },
]

export default function Stats() {
  return (
    <section className="bg-white py-16 border-t border-b border-border-light font-body">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 justify-center">
          {STATS_ITEMS.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-4 group transition-all duration-200"
              >
                {/* Icon Container */}
                <div className="w-14 h-14 bg-primary-green-softer rounded-full flex items-center justify-center text-primary-green mb-4 transition-transform duration-200 group-hover:scale-105">
                  <IconComponent className="h-6 w-6 stroke-[2.2]" />
                </div>
                {/* Value */}
                <span className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight">
                  {stat.value}
                </span>
                {/* Label */}
                <span className="text-xs md:text-sm font-bold text-text-muted mt-1 uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
