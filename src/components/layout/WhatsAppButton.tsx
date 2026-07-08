"use client"

import * as React from "react"
import { getWhatsAppUrl } from "@/lib/formatters"
import { cn } from "@/lib/utils"

interface WhatsAppButtonProps {
  whatsapp1: string
  whatsapp2?: string
  phone1Label?: string
}

export default function WhatsAppButton({ whatsapp1, whatsapp2, phone1Label }: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = React.useState(true)
  const [lastScrollY, setLastScrollY] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // Show when scrolling up, hide when scrolling down (if scrolled past 300px)
      if (currentScrollY > 300) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(false) // Scrolling down
        } else {
          setIsVisible(true) // Scrolling up
        }
      } else {
        setIsVisible(true) // Near the top
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If there is a second WhatsApp number, we can let user choose or just default to the first one.
    // Defaulting to the primary (whatsapp1) with a premium message.
    const message = "Merhaba, web siteniz üzerinden ulaşıyorum. Gayrimenkul ilanlarınız hakkında bilgi alabilir miyim?"
    const url = getWhatsAppUrl(whatsapp1, message)
    window.open(url, "_blank", "noopener,noreferrer")
    e.preventDefault()
  }

  return (
    <a
      href={`https://wa.me/${whatsapp1}`}
      onClick={handleClick}
      aria-label="WhatsApp ile İletişime Geçin"
      className={cn(
        "fixed bottom-6 right-6 z-40 flex items-center justify-center rounded-full bg-whatsapp text-white shadow-strong transition-premium hover:bg-whatsapp-dark hover:scale-110 pulse-ring",
        "w-14 h-14 md:w-16 md:h-16",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      )}
      title="WhatsApp ile İletişim"
    >
      {/* WhatsApp SVG Icon */}
      <svg
        className="h-7 w-7 md:h-8 md:w-8 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.782 1.451 5.436 0 9.86-4.413 9.863-9.847.001-2.63-1.019-5.101-2.872-6.958C16.512 1.986 14.04 1.96 12.01 1.96c-5.44 0-9.866 4.415-9.869 9.85-.001 2.09.546 4.13 1.588 5.923L2.73 21.223l3.917-1.433zM17.487 14.4c-.27-.136-1.602-.79-1.85-.88-.25-.09-.43-.136-.61.136-.18.27-.694.88-.85 1.057-.158.178-.318.202-.588.067-1.32-.656-2.312-1.2-3.118-2.585-.213-.365-.02-.303.185-.508.18-.18.27-.318.406-.54.135-.223.067-.417-.034-.617-.1-.2-1.85-2.025-1.85-2.17-.18-.145-.36-.135-.515-.135-.145 0-.315-.01-.485-.01-.17 0-.45.064-.686.32-.236.256-.9.88-.9 2.148 0 1.27.922 2.497 1.047 2.667.125.17 1.815 2.772 4.397 3.882.614.264 1.094.42 1.468.54.617.196 1.178.168 1.62.102.495-.074 1.602-.655 1.83-1.288.225-.633.225-1.178.157-1.288-.068-.11-.25-.203-.52-.338z" />
      </svg>

      {/* Online indicator badge */}
      <span className="absolute top-1.5 right-1.5 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
      </span>
      
      {/* Small "1" for attention badge */}
      <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm">
        1
      </span>
    </a>
  )
}
