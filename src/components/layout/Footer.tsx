import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, ChevronRight, MessageSquare, Home as HomeIcon } from "lucide-react"
import { getWhatsAppUrl, getPropertyPhoneCallUrl } from "@/lib/formatters"
import { urlFor } from "@/sanity/lib/image"
import type { SiteSettings } from "@/types"

// Set to true to show logo image alongside text
const SHOW_LOGO_IMAGE = false;

interface FooterProps {
  settings: SiteSettings
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const socials = [
    { url: settings.instagram, icon: "instagram", name: "Instagram" },
    { url: settings.facebook, icon: "facebook", name: "Facebook" },
    { url: settings.twitter, icon: "twitter", name: "Twitter" },
    { url: settings.youtube, icon: "youtube", name: "YouTube" },
    { url: settings.linkedin, icon: "linkedin", name: "LinkedIn" },
  ].filter((social) => !!social.url)

  return (
    <footer className="bg-bg-soft text-text-body border-t border-border-light pt-16 font-body">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Top Section (4 Columns) ────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-12 border-b border-border-light">
          
          {/* COLUMN 1: Company Info */}
          <div className="flex flex-col space-y-5">
            <div>
              <Link href="/" className="flex items-center gap-1.5 group mb-1.5" aria-label="Ana Sayfa">
                {SHOW_LOGO_IMAGE && settings?.logo && (
                  <Image
                    src={urlFor(settings.logo).width(200).height(200).fit("max").url()}
                    alt="Şeref GYO Logo"
                    width={48}
                    height={48}
                    className="h-10 w-auto object-contain"
                  />
                )}
                <span className="text-2xl md:text-3xl font-black tracking-tight text-text-primary group-hover:text-primary-green transition-colors duration-200 lowercase leading-none">
                  serefgyo
                </span>
              </Link>
              <p className="text-xs md:text-sm font-semibold text-text-muted leading-relaxed">
                İnegöl&apos;ün Güvenilir Emlak Danışmanı
              </p>
            </div>
            
            {settings.shortDescription && (
              <p className="text-sm text-text-muted leading-relaxed max-w-xs">
                {settings.shortDescription}
              </p>
            )}

            {settings.address && (
              <div className="flex items-start gap-2.5 text-sm text-text-muted">
                <MapPin className="h-5 w-5 text-primary-green flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{settings.address}</span>
              </div>
            )}

            {settings.yearEstablished && (
              <p className="text-xs text-text-muted/75 font-medium">
                Kuruluş Yılı: {settings.yearEstablished}
              </p>
            )}
          </div>

          {/* COLUMN 2: Hızlı Erişim */}
          <div className="flex flex-col space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">
              Hızlı Erişim
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm font-semibold text-text-muted hover:text-primary-green transition-colors duration-200 flex items-center gap-1 group">
                  <ChevronRight className="h-4 w-4 text-text-muted/30 group-hover:text-primary-green transition-colors duration-200" />
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/ilanlar?listingType=Satılık" className="text-sm font-semibold text-text-muted hover:text-primary-green transition-colors duration-200 flex items-center gap-1 group">
                  <ChevronRight className="h-4 w-4 text-text-muted/30 group-hover:text-primary-green transition-colors duration-200" />
                  Satılık İlanlar
                </Link>
              </li>
              <li>
                <Link href="/ilanlar?listingType=Kiralık" className="text-sm font-semibold text-text-muted hover:text-primary-green transition-colors duration-200 flex items-center gap-1 group">
                  <ChevronRight className="h-4 w-4 text-text-muted/30 group-hover:text-primary-green transition-colors duration-200" />
                  Kiralık İlanlar
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="text-sm font-semibold text-text-muted hover:text-primary-green transition-colors duration-200 flex items-center gap-1 group">
                  <ChevronRight className="h-4 w-4 text-text-muted/30 group-hover:text-primary-green transition-colors duration-200" />
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-sm font-semibold text-text-muted hover:text-primary-green transition-colors duration-200 flex items-center gap-1 group">
                  <ChevronRight className="h-4 w-4 text-text-muted/30 group-hover:text-primary-green transition-colors duration-200" />
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Emlak Tipleri */}
          <div className="flex flex-col space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">
              Popüler Aramalar
            </h3>
            <ul className="space-y-3">
              {["Daire", "Villa", "Arsa", "Dükkan", "Ofis"].map((type) => (
                <li key={type}>
                  <Link
                    href={`/ilanlar?propertyType=${type}`}
                    className="text-sm font-semibold text-text-muted hover:text-primary-green transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <ChevronRight className="h-4 w-4 text-text-muted/30 group-hover:text-primary-green transition-colors duration-200" />
                    {type} İlanları
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: İletişim */}
          <div className="flex flex-col space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">
              İletişim & Destek
            </h3>
            <div className="space-y-3.5">
              <a
                href={getPropertyPhoneCallUrl(settings.phone1)}
                className="flex items-center gap-3 text-sm font-semibold text-text-muted hover:text-primary-green transition-colors duration-200"
              >
                <Phone className="h-4 w-4 text-primary-green flex-shrink-0" />
                <span>{settings.phone1}</span>
              </a>

              {settings.phone2 && (
                <a
                  href={getPropertyPhoneCallUrl(settings.phone2)}
                  className="flex items-center gap-3 text-sm font-semibold text-text-muted hover:text-primary-green transition-colors duration-200"
                >
                  <Phone className="h-4 w-4 text-primary-green flex-shrink-0" />
                  <span>{settings.phone2}</span>
                </a>
              )}

              <a
                href={getWhatsAppUrl(settings.whatsapp1 ?? settings.phone1, "Merhaba, bilgi almak istiyorum.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-semibold text-whatsapp hover:text-whatsapp-dark transition-colors duration-200"
              >
                <MessageSquare className="h-4 w-4 text-whatsapp flex-shrink-0" />
                <span>WhatsApp ile Mesaj Gönder</span>
              </a>

              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3 text-sm font-semibold text-text-muted hover:text-primary-green transition-colors duration-200"
                >
                  <Mail className="h-4 w-4 text-primary-green flex-shrink-0" />
                  <span className="truncate">{settings.email}</span>
                </a>
              )}

              {settings.workingHours && (
                <div className="flex items-center gap-3 text-sm text-text-muted/75 pt-1">
                  <Clock className="h-4 w-4 text-text-muted/50 flex-shrink-0" />
                  <span className="text-xs">{settings.workingHours}</span>
                </div>
              )}

              {/* Social Media Icons */}
              {socials.length > 0 && (
                <div className="flex items-center space-x-2.5 pt-2">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-primary-green transition-colors duration-200 p-2 rounded-xl bg-bg-muted hover:bg-primary-green-softer"
                      title={social.name}
                    >
                      {social.icon === "instagram" && (
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                      )}
                      {social.icon === "facebook" && (
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                      )}
                      {social.icon === "twitter" && (
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                      )}
                      {social.icon === "youtube" && (
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                      )}
                      {social.icon === "linkedin" && (
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
          
        </div>

        {/* ── Bottom Section (Light background, dark text) ───────────────── */}
        <div className="bg-bg-muted border-t border-border-light py-6 px-4 md:px-0">
          <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center text-xs text-text-muted font-semibold space-y-4 md:space-y-0">
            <div>
              © {currentYear} Şeref Gayrimenkul. Tüm hakları saklıdır.
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link href="/gizlilik-politikasi" className="hover:text-primary-green transition-colors duration-200">
                Gizlilik Politikası
              </Link>
              <Link href="/kvkk" className="hover:text-primary-green transition-colors duration-200">
                KVKK Aydınlatma Metni
              </Link>
              <Link href="/cerez-politikasi" className="hover:text-primary-green transition-colors duration-200">
                Çerez Politikası
              </Link>
              <Link href="/kullanim-kosullari" className="hover:text-primary-green transition-colors duration-200">
                Kullanım Koşulları
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
