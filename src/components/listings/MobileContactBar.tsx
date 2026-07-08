"use client"

import * as React from "react"
import { Phone, MessageCircle } from "lucide-react"

interface MobileContactBarProps {
  phone1: string
  whatsapp1: string
  propertyTitle: string
  propertyListingNo: string
}

export default function MobileContactBar({ phone1, whatsapp1, propertyTitle, propertyListingNo }: MobileContactBarProps) {
  const cleanPhone = phone1.replace(/\s+/g, "")
  
  const encodedMsg = React.useMemo(() => {
    const text = `Merhaba, ${propertyTitle} (İlan No: ${propertyListingNo}) ilanı hakkında bilgi almak istiyorum.`
    return encodeURIComponent(text)
  }, [propertyTitle, propertyListingNo])

  const whatsappUrl = `https://wa.me/${whatsapp1}?text=${encodedMsg}`

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border-light p-3 flex gap-3 z-40 shadow-medium font-body">
      <a 
        href={`tel:${cleanPhone}`} 
        className="btn-premium-green flex-1 rounded-xl py-3 flex items-center justify-center gap-2 text-white text-xs font-bold shadow-md cursor-pointer transition-all active:scale-[0.98]"
      >
        <Phone className="h-4.5 w-4.5 text-white" /> 
        <span>Hemen Ara</span>
      </a>
      <a 
        href={whatsappUrl} 
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] hover:bg-[#20ba5a] flex-1 rounded-xl py-3 flex items-center justify-center gap-2 text-white text-xs font-bold shadow-md cursor-pointer transition-all active:scale-[0.98]"
      >
        <MessageCircle className="h-4.5 w-4.5 text-white fill-white" /> 
        <span>WhatsApp</span>
      </a>
    </div>
  )
}
