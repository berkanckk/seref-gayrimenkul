"use client"

import * as React from "react"
import Link from "next/link"
import { Cookie } from "lucide-react"

export default function CookieBanner() {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    // Check localStorage on mount
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      // Delay slightly for smooth entering
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setIsVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 z-50 max-w-4xl mx-auto animate-fade-in font-body">
      <div className="bg-white border border-border-light rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side: Info */}
        <div className="flex items-start gap-4 flex-1">
          <div className="bg-primary-green-softer p-2.5 rounded-xl shrink-0 text-primary-green">
            <Cookie className="h-6 w-6 stroke-[1.8]" />
          </div>
          <div className="space-y-1 text-left">
            <h4 className="text-sm font-extrabold text-text-primary">
              Çerezleri Kullanıyoruz
            </h4>
            <p className="text-xs font-semibold text-text-muted leading-relaxed">
              Size en iyi deneyimi sunmak için çerezler kullanıyoruz. Sitemizi kullanmaya devam ederek çerez kullanımını kabul etmiş olursunuz.{" "}
              <Link
                href="/cerez-politikasi"
                className="text-primary-green hover:text-primary-green-dark underline font-bold"
              >
                Detaylı Bilgi
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end text-xs font-bold shrink-0">
          <button
            type="button"
            onClick={handleReject}
            className="w-1/2 md:w-auto border border-border-medium hover:bg-bg-soft text-text-primary px-5 py-2.5 rounded-xl transition-all active:scale-[0.98] cursor-pointer"
          >
            Reddet
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="w-1/2 md:w-auto btn-premium-green text-white px-6 py-2.5 rounded-xl transition-all active:scale-[0.98] cursor-pointer"
          >
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  )
}
