import * as React from "react"
import { Phone, MessageSquare } from "lucide-react"
import { COMPANY_INFO } from "@/lib/constants"
import { getWhatsAppUrl, getPropertyPhoneCallUrl } from "@/lib/formatters"
import Container from "@/components/shared/Container"

export default function CTASection() {
  const phoneCallUrl = getPropertyPhoneCallUrl(COMPANY_INFO.phone1)
  const whatsappUrl = getWhatsAppUrl(
    COMPANY_INFO.whatsapp1,
    "Merhaba, gayrimenkulümü satmak/kiralamak istiyorum. Bilgi alabilir miyim?"
  )

  return (
    <section className="bg-white py-12 md:py-16 font-body">
      <Container className="max-w-4xl mx-auto">
        {/* Two-column Card Wrapper */}
        <div className="bg-primary-green-softer rounded-3xl p-8 md:p-12 border border-primary-green-light/20 shadow-subtle">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Left Column: Copy */}
            <div className="space-y-4 text-left">
              <span className="inline-flex items-center rounded-full bg-primary-green px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                İletişim
              </span>
              <h2 className="text-2xl md:text-3.5xl font-extrabold text-text-primary tracking-tight leading-tight">
                İlanınızı Değerlendirelim
              </h2>
              <p className="text-sm md:text-base text-text-muted leading-relaxed font-semibold">
                Gayrimenkulünüzü satmak veya kiraya vermek için hemen bize ulaşın. Ücretsiz bölge analizi ve doğru fiyatlama desteğiyle buradayız.
              </p>
            </div>

            {/* Right Column: Stacked Contact Buttons */}
            <div className="flex flex-col gap-3 w-full">
              {/* Phone Button */}
              <a
                href={phoneCallUrl}
                className="flex flex-col items-center justify-center btn-premium-green text-white rounded-xl py-3 px-4 hover:scale-[1.01] active:scale-100 cursor-pointer"
              >
                <div className="flex items-center gap-2 font-bold text-sm md:text-base">
                  <Phone className="h-5 w-5 fill-current" />
                  <span>Hemen Ara: {COMPANY_INFO.phone1}</span>
                </div>
                <span className="text-[10px] text-white/80 font-bold uppercase tracking-wide mt-0.5">
                  {COMPANY_INFO.phone1Label}
                </span>
              </a>

              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 btn-premium-white border-2 border-primary-green text-primary-green hover:scale-[1.01] active:scale-100 font-bold py-3.5 px-4 rounded-xl cursor-pointer"
              >
                <MessageSquare className="h-5 w-5 fill-current" />
                <span>WhatsApp&apos;tan Yazın</span>
              </a>
            </div>

          </div>
        </div>
      </Container>
    </section>
  )
}
