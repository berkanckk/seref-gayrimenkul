"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useSearchParams } from "next/navigation"
import { Phone, Menu, Home as HomeIcon, Calculator, Wallet, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { getPropertyPhoneCallUrl } from "@/lib/formatters"
import { urlFor } from "@/sanity/lib/image"
import MobileMenu from "./MobileMenu"
import type { SiteSettings } from "@/types"

// Set to true to show logo image alongside text
const SHOW_LOGO_IMAGE = false;

interface HeaderProps {
  settings: SiteSettings
}

export default function Header({ settings }: HeaderProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  const activeTip = searchParams.get("tip")

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full bg-white border-b border-border-light font-body transition-all duration-300",
          isScrolled
            ? "h-14 md:h-16 shadow-md"
            : "h-16 md:h-[68px] shadow-subtle"
        )}
      >
        {/* DESKTOP NAVBAR */}
        <div className="hidden md:flex container mx-auto max-w-7xl h-full px-6 justify-between items-center">
          {/* Left: Navigation Menu */}
          <nav className="flex items-center space-x-6 lg:space-x-8">
            <Link
              href="/ilanlar?tip=satilik"
              className={cn(
                "text-sm font-semibold tracking-wide text-text-body hover:text-primary-green transition-colors duration-200",
                pathname === "/ilanlar" && activeTip === "satilik" && "text-primary-green"
              )}
            >
              Satılık
            </Link>

            <Link
              href="/ilanlar?tip=kiralik"
              className={cn(
                "text-sm font-semibold tracking-wide text-text-body hover:text-primary-green transition-colors duration-200",
                pathname === "/ilanlar" && activeTip === "kiralik" && "text-primary-green"
              )}
            >
              Kiralık
            </Link>

            <Link
              href="/hakkimizda"
              className={cn(
                "text-sm font-semibold tracking-wide text-text-body hover:text-primary-green transition-colors duration-200",
                isLinkActive("/hakkimizda") && "text-primary-green"
              )}
            >
              Hakkımızda
            </Link>

            <Link
              href="/iletisim"
              className={cn(
                "text-sm font-semibold tracking-wide text-text-body hover:text-primary-green transition-colors duration-200",
                isLinkActive("/iletisim") && "text-primary-green"
              )}
            >
              İletişim
            </Link>

            <div className="relative group">
              <button className="text-sm font-semibold tracking-wide text-text-body hover:text-primary-green transition-colors flex items-center gap-1 cursor-pointer">
                Araçlar
                <ChevronDown className="w-3 h-3" />
              </button>
              
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link 
                  href="/#home-value" 
                  className="flex items-center gap-2 px-4 py-2 text-sm text-text-primary hover:bg-primary-green-softer hover:text-primary-green transition-colors font-medium"
                >
                  <Calculator className="w-4 h-4" />
                  Evimin Değeri
                </Link>
                <Link 
                  href="/#mortgage" 
                  className="flex items-center gap-2 px-4 py-2 text-sm text-text-primary hover:bg-primary-green-softer hover:text-primary-green transition-colors font-medium"
                >
                  <Wallet className="w-4 h-4" />
                  Konut Kredisi
                </Link>
              </div>
            </div>
          </nav>

          {/* Center: Logo (Sanity icon + lowercase "serefgyo" text) */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <Link href="/" className="flex items-center gap-1.5 group" aria-label="Ana Sayfa">
              {SHOW_LOGO_IMAGE && settings?.logo && (
                <Image
                  src={urlFor(settings.logo).width(200).height(200).fit("max").url()}
                  alt="Şeref GYO Logo"
                  width={40}
                  height={40}
                  className={cn(
                    "w-auto object-contain transition-all duration-300",
                    isScrolled ? "h-7 md:h-8" : "h-8 md:h-9"
                  )}
                  priority
                />
              )}
              <span className={cn(
                "font-black tracking-tight text-text-primary group-hover:text-primary-green leading-none transition-all duration-300 lowercase inline-block",
                isScrolled ? "text-lg md:text-xl" : "text-xl md:text-2xl"
              )}>
                serefgyo
              </span>
            </Link>
          </div>

          {/* Right: CTA & Actions */}
          <div className="flex items-center space-x-5 lg:space-x-6">
            {settings.phone1 && (
              <a
                href={getPropertyPhoneCallUrl(settings.phone1)}
                className="flex items-center gap-1.5 text-sm font-semibold text-text-body hover:text-primary-green transition-colors duration-200"
              >
                <Phone className="h-4 w-4 text-primary-green" />
                <span>{settings.phone1}</span>
              </a>
            )}

            <a
              href="https://wa.me/905335187357?text=Merhaba,%20h%C4%B1zl%C4%B1%20teklif%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium-green text-white text-xs lg:text-sm font-bold tracking-wide rounded-lg px-5 py-2 inline-flex items-center"
            >
              Hızlı Teklif
            </a>
          </div>
        </div>

        {/* MOBILE NAVBAR */}
        <div className="md:hidden grid grid-cols-3 items-center h-full px-4 w-full">
          {/* Mobile Hamburger on Left */}
          <div className="flex justify-start">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-lg text-text-primary hover:bg-bg-soft transition-colors duration-200 focus:outline-none cursor-pointer"
              aria-label="Menüyü Aç"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Logo in Center */}
          <div className="flex justify-center">
            <Link href="/" className="flex items-center gap-1.5 group" aria-label="Ana Sayfa">
              {SHOW_LOGO_IMAGE && settings?.logo && (
                <Image
                  src={urlFor(settings.logo).width(200).height(200).fit("max").url()}
                  alt="Şeref GYO Logo"
                  width={36}
                  height={36}
                  className="h-7 w-auto object-contain"
                  priority
                />
              )}
              <span className="text-base font-black tracking-tight text-text-primary group-hover:text-primary-green leading-none lowercase">
                serefgyo
              </span>
            </Link>
          </div>

          {/* Mobile Single CTA on Right */}
          <div className="flex justify-end">
            <a
              href="https://wa.me/905335187357?text=Merhaba,%20h%C4%B1zl%C4%B1%20teklif%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium-green text-white text-xs font-bold rounded-lg px-3.5 py-1.5 inline-flex items-center"
            >
              Teklif Al
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
        settings={settings}
      />
    </>
  )
}
