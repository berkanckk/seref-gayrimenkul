import type { Metadata } from 'next'
import Link from "next/link"
import { 
  ChevronRight, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Mail, 
  Clock 
} from "lucide-react"

import { getContactPage, getSiteSettings } from "@/sanity/lib/fetchers"
import { getPropertyPhoneCallUrl } from "@/lib/formatters"
import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import ContactForm from "@/components/contact/ContactForm"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { SiteSettings } from "@/types"

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContactPage()
  return {
    title: contact?.seoTitle || "İletişim",
    description: contact?.seoDescription || 
      "Şeref Gayrimenkul ile iletişime geçin. Telefon, WhatsApp, e-posta ve ofisimizden bize ulaşın. İnegöl, Bursa.",
  }
}

export default async function ContactPage() {
  const [contactData, settings] = await Promise.all([
    getContactPage(),
    getSiteSettings()
  ])

  // Safe settings fallback
  const safeSettings: SiteSettings = settings ?? {
    _id: 'siteSettings',
    _type: 'siteSettings',
    companyName: 'Şeref Gayrimenkul',
    ownerName: 'Şeref İnce',
    phone1: '0533 518 7357',
    phone1Label: 'Şeref İnce',
    phone2: '0533 276 0329',
    phone2Label: 'Can İnce',
    whatsapp1: '905335187357',
    whatsapp2: '905332760329',
    address: 'Sinanbey, Kanal Sk. No:14 D:E, 16400 İnegöl/Bursa',
    city: 'İnegöl',
    province: 'Bursa',
    workingHours: 'Pazartesi - Cumartesi: 09:00 - 19:00',
  }

  const cleanPhone1 = safeSettings.phone1.replace(/\s+/g, "")
  const cleanPhone2 = safeSettings.phone2?.replace(/\s+/g, "")

  const whatsappMessage = "Merhaba, gayrimenkul danışmanlığı için bilgi almak istiyorum."
  const whatsappUrl = `https://wa.me/${safeSettings.whatsapp1 || '905335187357'}?text=${encodeURIComponent(whatsappMessage)}`

  const mapEmbedUrl = safeSettings.mapEmbedUrl || 
    "https://www.google.com/maps?q=Sinanbey+Kanal+Sk+No+14+İnegöl+Bursa&output=embed"

  const socials = [
    { url: safeSettings.instagram, icon: "instagram", name: "Instagram" },
    { url: safeSettings.facebook, icon: "facebook", name: "Facebook" },
    { url: safeSettings.twitter, icon: "twitter", name: "Twitter" },
    { url: safeSettings.youtube, icon: "youtube", name: "YouTube" },
    { url: safeSettings.linkedin, icon: "linkedin", name: "LinkedIn" },
  ].filter((social) => !!social.url)

  return (
    <main className="bg-bg-soft/40 min-h-screen pb-16 font-body">
      
      {/* SECTION 1: HERO / HEADER */}
      <section className="bg-white border-b border-border-light py-12 md:py-16">
        <Container className="max-w-4xl text-center space-y-4">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">
            <Link href="/" className="hover:text-primary-green transition-colors">
              Ana Sayfa
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-text-muted/60" />
            <span className="text-text-primary">İletişim</span>
          </nav>

          <span className="text-xs font-bold uppercase tracking-wider text-primary-green">
            İLETİŞİM
          </span>
          <h1 className="text-3.5xl md:text-5xl font-extrabold text-text-primary tracking-tight leading-tight">
            {contactData?.title || "Bize Ulaşın"}
          </h1>
          {contactData?.subtitle && (
            <p className="text-base font-extrabold text-text-muted max-w-2xl mx-auto">
              {contactData.subtitle}
            </p>
          )}
          <p className="text-sm font-semibold text-text-body/80 leading-relaxed max-w-2xl mx-auto">
            {contactData?.description || 
              "Sorularınız, ilan talepleriniz veya gayrimenkul danışmanlığı için bize aşağıdaki kanallardan ulaşabilirsiniz. En kısa sürede dönüş yapıyoruz."}
          </p>
        </Container>
      </section>

      {/* SECTION 2: QUICK CONTACT CARDS */}
      <section className="py-10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-semibold text-xs text-text-body">
            {/* CARD 1 - Phone */}
            <div className="bg-white rounded-2xl border border-border-light p-6 shadow-subtle flex flex-col justify-between items-start space-y-4">
              <div className="w-12 h-12 bg-primary-green-softer rounded-xl flex items-center justify-center">
                <Phone className="h-5 w-5 text-primary-green-dark" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Telefon</div>
                <div className="text-lg font-extrabold text-[#0E3414]">{safeSettings.phone1}</div>
                <div className="text-[10px] text-text-muted">{safeSettings.phone1Label || "Şeref İnce"}</div>
              </div>
              <a 
                href={`tel:${cleanPhone1}`}
                className="w-full btn-premium-green text-center text-white py-3 rounded-xl font-bold text-xs shadow-sm transition-all active:scale-[0.98]"
              >
                Hemen Ara
              </a>
            </div>

            {/* CARD 2 - WhatsApp */}
            <div className="bg-white rounded-2xl border border-border-light p-6 shadow-subtle flex flex-col justify-between items-start space-y-4">
              <div className="w-12 h-12 bg-[#25D366]/10 rounded-xl flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-[#25D366]" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">WhatsApp</div>
                <div className="text-lg font-extrabold text-text-primary">Anında Yanıt</div>
                <div className="text-[10px] text-text-muted">7/24 mesaj gönderin</div>
              </div>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-center text-white py-3 rounded-xl font-bold text-xs shadow-sm transition-all active:scale-[0.98]"
              >
                WhatsApp'tan Yaz
              </a>
            </div>

            {/* CARD 3 - Address */}
            <div className="bg-white rounded-2xl border border-border-light p-6 shadow-subtle flex flex-col justify-between items-start space-y-4">
              <div className="w-12 h-12 bg-primary-green-softer rounded-xl flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary-green-dark" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Adres</div>
                <div className="text-lg font-extrabold text-text-primary">Ofisimize Gelin</div>
                <div className="text-[10px] text-text-muted">{safeSettings.city}, {safeSettings.province}</div>
              </div>
              {safeSettings.address ? (
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(safeSettings.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-border-light hover:bg-bg-soft text-center text-text-primary py-3 rounded-xl font-bold text-xs shadow-subtle transition-all active:scale-[0.98]"
                >
                  Yol Tarifi Al
                </a>
              ) : (
                <div className="w-full text-center text-text-muted py-3 text-[10px]">Adres bilgisi mevcut değil.</div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 3: FORM + INFO */}
      <section className="py-6">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
            
            {/* Contact Form Left Column */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Info Card Right Column */}
            <aside className="lg:sticky lg:top-24 space-y-6">
              <div className="bg-primary-green-softer border border-primary-green-light/10 rounded-3xl p-6 md:p-8 shadow-subtle space-y-5 font-semibold text-xs text-text-body">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-primary-green-dark uppercase tracking-wider">İLETİŞİM BİLGİLERİ</span>
                  <h4 className="text-lg font-extrabold text-[#0E3414] tracking-tight">Tüm Kanallardan Ulaşın</h4>
                </div>
                <div className="h-px bg-primary-green-light/20 w-full" />

                <div className="space-y-4">
                  {/* Phone 1 */}
                  <div className="flex gap-3 items-start">
                    <Phone className="h-4.5 w-4.5 text-primary-green-dark mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-[9px] font-extrabold text-text-muted uppercase tracking-wider leading-none mb-1">{safeSettings.phone1Label || "Şeref İnce"}</div>
                      <a href={`tel:${cleanPhone1}`} className="text-sm font-extrabold text-[#0E3414] hover:underline">
                        {safeSettings.phone1}
                      </a>
                    </div>
                  </div>

                  {/* Phone 2 */}
                  {safeSettings.phone2 && (
                    <div className="flex gap-3 items-start">
                      <Phone className="h-4.5 w-4.5 text-primary-green-dark mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-[9px] font-extrabold text-text-muted uppercase tracking-wider leading-none mb-1">{safeSettings.phone2Label || "Can İnce"}</div>
                        <a href={`tel:${cleanPhone2}`} className="text-sm font-extrabold text-text-primary hover:underline">
                          {safeSettings.phone2}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* WhatsApp */}
                  <div className="flex gap-3 items-start">
                    <MessageCircle className="h-4.5 w-4.5 text-[#25D366] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-[9px] font-extrabold text-text-muted uppercase tracking-wider leading-none mb-1">WhatsApp</div>
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-extrabold text-text-primary hover:underline">
                        7/24 Hızlı Yanıt
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  {safeSettings.email && (
                    <div className="flex gap-3 items-start">
                      <Mail className="h-4.5 w-4.5 text-primary-green-dark mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-[9px] font-extrabold text-text-muted uppercase tracking-wider leading-none mb-1">E-posta</div>
                        <a href={`mailto:${safeSettings.email}`} className="text-sm font-extrabold text-text-primary hover:underline break-all block">
                          {safeSettings.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Address */}
                  {safeSettings.address && (
                    <div className="flex gap-3 items-start">
                      <MapPin className="h-4.5 w-4.5 text-primary-green-dark mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-[9px] font-extrabold text-text-muted uppercase tracking-wider leading-none mb-1">Ofis Adresi</div>
                        <span className="text-xs font-bold text-text-body leading-relaxed">
                          {safeSettings.address}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Working Hours */}
                  {safeSettings.workingHours && (
                    <div className="flex gap-3 items-start">
                      <Clock className="h-4.5 w-4.5 text-primary-green-dark mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-[9px] font-extrabold text-text-muted uppercase tracking-wider leading-none mb-1">Çalışma Saatleri</div>
                        <span className="text-xs font-bold text-text-body">
                          {safeSettings.workingHours}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Social media icons */}
                {socials.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-primary-green-light/20">
                    <span className="text-[9px] font-extrabold text-text-muted uppercase tracking-wider leading-none">SOSYAL MEDYA</span>
                    <div className="flex items-center gap-2">
                      {socials.map((social) => (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-white border border-border-light flex items-center justify-center text-text-muted hover:text-primary-green hover:border-primary-green transition-all"
                          title={social.name}
                        >
                          {social.icon === "instagram" && (
                            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                          )}
                          {social.icon === "facebook" && (
                            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                          )}
                          {social.icon === "twitter" && (
                            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                          )}
                          {social.icon === "youtube" && (
                            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                          )}
                          {social.icon === "linkedin" && (
                            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>

          </div>
        </Container>
      </section>

      {/* SECTION 4: GOOGLE MAPS */}
      <section className="bg-white py-12 md:py-16 border-y border-border-light">
        <Container className="space-y-6">
          <SectionTitle
            eyebrow="KONUM"
            title="Ofisimizi Ziyaret Edin"
            subtitle={safeSettings.address || "Sinanbey, Kanal Sk. No:14 D:E, 16400 İnegöl/Bursa"}
            align="center"
          />

          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-subtle border border-border-light/40 bg-bg-muted">
            <iframe
              src={mapEmbedUrl}
              title="Şeref Gayrimenkul Ofis Konumu"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>

          {safeSettings.address && (
            <div className="flex justify-center mt-4">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(safeSettings.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium-green text-white font-bold text-xs py-3 px-8 rounded-xl shadow-md transition-all active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
              >
                <MapPin className="h-4.5 w-4.5 text-white" />
                <span>Yol Tarifi Al</span>
              </a>
            </div>
          )}
        </Container>
      </section>

      {/* SECTION 5: FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <Container className="max-w-3xl">
          <SectionTitle
            eyebrow="SIKÇA SORULAN SORULAR"
            title="Merak Edilenler"
            align="center"
          />

          <div className="mt-8">
            <Accordion defaultValue={["item-1"]}>
              {/* Question 1 */}
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm font-extrabold text-text-primary pt-4 pb-2.5">
                  Randevusuz gelebilir miyim?
                </AccordionTrigger>
                <AccordionContent className="text-xs font-semibold text-text-muted leading-relaxed pb-4">
                  Elbette, çalışma saatlerimiz içinde randevusuz gelebilirsiniz. Ancak randevu alarak gelmeniz, sizinle daha detaylı ilgilenebilmemiz ve beklememeniz açısından faydalı olacaktır.
                </AccordionContent>
              </AccordionItem>

              {/* Question 2 */}
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm font-extrabold text-text-primary pt-4 pb-2.5">
                  Değerleme hizmeti veriyor musunuz?
                </AccordionTrigger>
                <AccordionContent className="text-xs font-semibold text-text-muted leading-relaxed pb-4">
                  Evet, İnegöl ve çevresindeki gayrimenkuller için ücretsiz ön değerleme yapıyoruz. Detaylı piyasa analizi ve fiyat değerlemesi almak için bizimle iletişime geçebilirsiniz.
                </AccordionContent>
              </AccordionItem>

              {/* Question 3 */}
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-sm font-extrabold text-text-primary pt-4 pb-2.5">
                  Sadece İnegöl'de mi hizmet veriyorsunuz?
                </AccordionTrigger>
                <AccordionContent className="text-xs font-semibold text-text-muted leading-relaxed pb-4">
                  Ağırlıklı olarak İnegöl ve Bursa genelinde faaliyet göstermekle birlikte, gelişen konum veri tabanımız sayesinde tüm Türkiye genelindeki ilanlara da aracılık hizmeti sunabilmekteyiz.
                </AccordionContent>
              </AccordionItem>

              {/* Question 4 */}
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-sm font-extrabold text-text-primary pt-4 pb-2.5">
                  İlan vermek için ne yapmalıyım?
                </AccordionTrigger>
                <AccordionContent className="text-xs font-semibold text-text-muted leading-relaxed pb-4">
                  İlanınızı sitemizde yayınlamak için sayfamızdaki formu doldurabilir, bizi arayabilir ya da doğrudan WhatsApp hattımızdan mülk fotoğrafları ve bilgileri ile birlikte bizimle iletişime geçebilirsiniz.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Container>
      </section>

    </main>
  )
}
