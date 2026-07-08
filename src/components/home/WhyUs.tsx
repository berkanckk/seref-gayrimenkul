import * as React from "react"
import { ShieldCheck, MapPin, Users } from "lucide-react"
import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"

const WHY_US_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Güvenilir Hizmet",
    description: "Uzun yıllara dayanan tecrübemiz ve dürüst iş anlayışımızla her adımda yanınızdayız.",
  },
  {
    icon: MapPin,
    title: "Yerel Uzmanlık",
    description: "İnegöl ve çevresindeki gayrimenkul piyasasını en iyi biz tanıyoruz. Doğru fiyat, doğru bölge.",
  },
  {
    icon: Users,
    title: "Kişisel İlgi",
    description: "Her müşterimize özel ilgi gösterir, ihtiyacınıza en uygun çözümü birlikte buluruz.",
  },
]

export default function WhyUs() {
  return (
    <section className="bg-bg-soft py-12 md:py-16 border-b border-border-light font-body">
      <Container>
        <SectionTitle
          title="Neden Şeref Gayrimenkul?"
          subtitle="İnegöl'de yıllara dayanan tecrübe ve güvenle hizmetinizdeyiz."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {WHY_US_ITEMS.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-border-light shadow-card transition-all duration-300 hover:shadow-medium hover:-translate-y-0.5 group"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 bg-primary-green-softer text-primary-green rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200">
                  <IconComponent className="h-6 w-6 stroke-[2.2]" />
                </div>
                {/* Title */}
                <h3 className="text-lg md:text-xl font-extrabold text-text-primary mb-3">
                  {item.title}
                </h3>
                {/* Description */}
                <p className="text-sm md:text-base text-text-muted leading-relaxed font-semibold">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
