import { Suspense } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { getSiteSettings } from '@/sanity/lib/fetchers'
import { COMPANY_INFO } from '@/lib/constants'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import CookieBanner from '@/components/shared/CookieBanner'
import type { SiteSettings } from '@/types'

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

  // Fallback SiteSettings built from constants so the layout never breaks
  // when Sanity project is empty or unreachable.
  const safeSettings: SiteSettings = settings ?? {
    _id: 'siteSettings',
    _type: 'siteSettings',
    companyName: COMPANY_INFO.name,
    ownerName: COMPANY_INFO.owner,
    phone1: COMPANY_INFO.phone1,
    phone1Label: COMPANY_INFO.phone1Label,
    phone2: COMPANY_INFO.phone2,
    phone2Label: COMPANY_INFO.phone2Label,
    whatsapp1: COMPANY_INFO.whatsapp1,
    whatsapp2: COMPANY_INFO.whatsapp2,
    address: COMPANY_INFO.address,
    city: COMPANY_INFO.city,
    province: COMPANY_INFO.province,
    workingHours: COMPANY_INFO.workingHours,
  }

  return (
    <>
      <Suspense fallback={<div className="h-16 w-full bg-white border-b border-border-light" />}>
        <Header settings={safeSettings} />
      </Suspense>
      <main className="min-h-screen">
        {children}
      </main>
      <Footer settings={safeSettings} />
      <WhatsAppButton
        whatsapp1={safeSettings.whatsapp1 ?? COMPANY_INFO.whatsapp1}
        whatsapp2={safeSettings.whatsapp2 ?? COMPANY_INFO.whatsapp2}
        phone1Label={safeSettings.phone1Label ?? COMPANY_INFO.phone1Label}
      />
      <CookieBanner />
      <Toaster
        position="bottom-right"
        richColors
        toastOptions={{
          style: { fontFamily: 'var(--font-inter)' },
        }}
      />
    </>
  )
}
