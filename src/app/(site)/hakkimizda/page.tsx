import type { Metadata } from 'next'
import Image from "next/image"
import Link from "next/link"
import { PortableText } from '@portabletext/react'
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  Users, 
  Award, 
  Handshake, 
  Phone, 
  MessageCircle,
  Clock,
  ChevronRight
} from "lucide-react"

import { getAboutPage, getSiteSettings } from "@/sanity/lib/fetchers"
import { getImageUrl } from "@/sanity/lib/image"
import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import type { SiteSettings } from "@/types"

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage()
  return {
    title: about?.seoTitle || "Hakkımızda",
    description: about?.seoDescription || 
      "Şeref Gayrimenkul - İnegöl'ün güvenilir emlak danışmanı. Yıllara dayanan tecrübe ve profesyonel hizmet.",
  }
}

/** Resolves string icons from database to Lucide components */
function ValueIcon({ iconName, className }: { iconName?: string; className?: string }) {
  const name = iconName?.toLowerCase() || ""
  if (name.includes("shield") || name.includes("güven") || name.includes("check")) {
    return <ShieldCheck className={className} />
  }
  if (name.includes("user") || name.includes("müşteri") || name.includes("ekip")) {
    return <Users className={className} />
  }
  if (name.includes("award") || name.includes("kalite") || name.includes("başarı")) {
    return <Award className={className} />
  }
  if (name.includes("handshake") || name.includes("ilişki") || name.includes("tokalaşma") || name.includes("ortak")) {
    return <Handshake className={className} />
  }
  // Default fallback
  return <Award className={className} />
}

export default async function AboutPage() {
  // Parallel fetch aboutPage document and siteSettings
  const [aboutData, settings] = await Promise.all([
    getAboutPage(),
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

  const hasHeroImage = !!aboutData?.heroImage
  const hasStats = !!(aboutData?.stats && aboutData.stats.length > 0)
  const hasStory = !!(aboutData?.content && aboutData.content.length > 0)
  const hasMission = !!aboutData?.mission
  const hasVision = !!aboutData?.vision
  const hasValues = !!(aboutData?.values && aboutData.values.length > 0)
  const hasTeam = !!(aboutData?.teamMembers && aboutData.teamMembers.length > 0)

  const whatsappMessage = "Merhaba, web siteniz aracılığıyla size ulaşıyorum. Gayrimenkul danışmanlık hizmetleriniz hakkında bilgi almak istiyorum."
  const whatsappUrl = `https://wa.me/${safeSettings.whatsapp1 || '905335187357'}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <main className="bg-white min-h-screen font-body">
      
      {/* SECTION 1: HERO / HEADER */}
      <section className="relative overflow-hidden border-b border-border-light bg-bg-soft/20 py-12 md:py-20">
        <Container>
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-[11px] font-bold text-text-muted mb-8 uppercase tracking-wider">
            <Link href="/" className="hover:text-primary-green transition-colors">
              Ana Sayfa
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-text-muted/60" />
            <span className="text-text-primary">Hakkımızda</span>
          </nav>

          <div className={hasHeroImage ? "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center" : "max-w-3xl"}>
            {/* Left Column: Text & Stats */}
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary-green">
                HAKKIMIZDA
              </span>
              <h1 className="text-3.5xl md:text-5xl font-extrabold text-text-primary tracking-tight leading-tight">
                {aboutData?.title || "Hakkımızda"}
              </h1>
              {aboutData?.subtitle && (
                <p className="text-base md:text-lg font-medium text-text-muted leading-relaxed">
                  {aboutData.subtitle}
                </p>
              )}

              {/* Stats Block */}
              {hasStats && (
                <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t border-border-light">
                  {aboutData!.stats!.map((stat) => (
                    <div key={stat._key} className="space-y-1">
                      <div className="text-2.5xl md:text-4xl font-extrabold text-[#0E3414] tracking-tight">
                        {stat.value}
                      </div>
                      <div className="text-[10px] md:text-xs font-extrabold text-text-muted uppercase tracking-wider leading-snug">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Hero Image */}
            {hasHeroImage && (
              <div className="relative aspect-[4/5] w-full max-w-lg mx-auto lg:max-w-none rounded-3xl overflow-hidden shadow-medium bg-bg-muted border border-border-light/40 animate-fade-in">
                <Image
                  src={getImageUrl(aboutData!.heroImage!, 800, 1000)}
                  alt={aboutData?.title || "Şeref Gayrimenkul Hakkımızda"}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* SECTION 2: STORY / CONTENT */}
      {hasStory && (
        <section className="bg-bg-soft py-16 md:py-24 border-b border-border-light">
          <Container className="max-w-4xl">
            <SectionTitle 
              title="Hikayemiz" 
              align="center"
            />
            <div className="prose prose-sm md:prose-base max-w-none text-text-body font-medium leading-relaxed prose-headings:font-bold prose-headings:text-text-primary prose-a:text-primary-green prose-strong:font-bold mt-8">
              <PortableText value={aboutData!.content as any} />
            </div>
          </Container>
        </section>
      )}

      {/* SECTION 3: MISSION & VISION */}
      {(hasMission || hasVision) && (
        <section className="py-16 md:py-24 border-b border-border-light bg-white">
          <Container>
            <div className={`grid gap-8 ${hasMission && hasVision ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
              {/* Mission Card */}
              {hasMission && (
                <div className="bg-primary-green-softer border border-primary-green-light/10 rounded-3xl p-8 md:p-12 shadow-subtle flex flex-col justify-between items-start space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-subtle border border-border-light/20">
                    <Target className="w-6 h-6 text-primary-green-dark" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-extrabold text-text-primary">Misyonumuz</h3>
                    <p className="text-xs md:text-sm font-semibold text-text-body leading-relaxed">
                      {aboutData!.mission}
                    </p>
                  </div>
                </div>
              )}

              {/* Vision Card */}
              {hasVision && (
                <div className="bg-white border border-border-light rounded-3xl p-8 md:p-12 shadow-subtle flex flex-col justify-between items-start space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary-green-softer flex items-center justify-center">
                    <Eye className="w-6 h-6 text-primary-green-dark" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-extrabold text-text-primary">Vizyonumuz</h3>
                    <p className="text-xs md:text-sm font-semibold text-text-muted leading-relaxed">
                      {aboutData!.vision}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* SECTION 4: VALUES */}
      {hasValues && (
        <section className="bg-bg-soft py-16 md:py-24 border-b border-border-light">
          <Container>
            <SectionTitle
              eyebrow="DEĞERLERİMİZ"
              title="Neye İnanıyoruz?"
              subtitle="Çalışma prensiplerimiz ve size verdiğimiz sözler"
              align="center"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {aboutData!.values!.map((value) => (
                <div 
                  key={value._key}
                  className="bg-white border border-border-light/60 rounded-2xl p-6 shadow-subtle transition-all duration-300 hover:-translate-y-1 hover:shadow-medium group"
                >
                  <div className="w-12 h-12 bg-primary-green-softer rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    <ValueIcon iconName={value.icon} className="w-5 h-5 text-primary-green-dark" />
                  </div>
                  <h4 className="text-base font-extrabold text-text-primary mt-4 mb-2">
                    {value.title}
                  </h4>
                  {value.description && (
                    <p className="text-[11px] font-semibold text-text-muted leading-relaxed">
                      {value.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* SECTION 5: TEAM */}
      {hasTeam && (
        <section className="py-16 md:py-24 bg-white border-b border-border-light">
          <Container>
            <SectionTitle
              eyebrow="EKİBİMİZ"
              title="Uzman Kadromuz"
              subtitle="Profesyonel ve deneyimli danışmanlarımızla tanışın"
              align="center"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 justify-center">
              {aboutData!.teamMembers!.map((member) => {
                const photoUrl = member.photo ? getImageUrl(member.photo, 400, 500) : null

                return (
                  <div 
                    key={member._key}
                    className="bg-white rounded-2xl overflow-hidden border border-border-light shadow-subtle flex flex-col hover:shadow-medium transition-shadow"
                  >
                    {photoUrl && (
                      <div className="relative aspect-[4/5] bg-bg-muted w-full overflow-hidden">
                        <Image
                          src={photoUrl}
                          alt={member.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h4 className="text-lg font-extrabold text-text-primary leading-tight">
                          {member.name}
                        </h4>
                        {member.role && (
                          <p className="text-[10px] font-extrabold text-primary-green uppercase tracking-wider mt-1">
                            {member.role}
                          </p>
                        )}
                        {member.bio && (
                          <p className="text-[11px] font-semibold text-text-muted mt-3 leading-relaxed">
                            {member.bio}
                          </p>
                        )}
                      </div>

                      {member.phone && (
                        <div className="pt-3 border-t border-border-light/40">
                          <a 
                            href={`tel:${member.phone.replace(/\s+/g, '')}`}
                            className="inline-flex items-center gap-2 text-xs font-extrabold text-text-primary hover:text-primary-green transition-colors cursor-pointer"
                          >
                            <Phone className="h-4 w-4 text-primary-green" />
                            <span>{member.phone}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </Container>
        </section>
      )}

      {/* SECTION 6: CTA */}
      <section className="bg-bg-soft py-16 md:py-24">
        <Container className="max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-green">
            İLETİŞİM
          </span>
          <h2 className="text-2.5xl md:text-4xl font-extrabold text-text-primary tracking-tight mt-3 mb-4">
            Sizinle Çalışmayı Bekliyoruz
          </h2>
          <p className="text-xs md:text-sm font-semibold text-text-muted max-w-lg mx-auto leading-relaxed mb-8">
            Gayrimenkul ihtiyaçlarınız için hemen bize ulaşın. Portföyünüzü değerlendirmek ve ücretsiz danışmanlık hizmetimizden yararlanmak için buradayız.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 text-xs font-bold">
            <a 
              href={`tel:${safeSettings.phone1.replace(/\s+/g, '')}`}
              className="btn-premium-green text-white py-4 px-8 rounded-xl shadow-md transition-all active:scale-[0.98] inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="h-4.5 w-4.5 text-white" />
              <span>Hemen Ara: {safeSettings.phone1}</span>
            </a>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white py-4 px-8 rounded-xl shadow-md transition-all active:scale-[0.98] inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="h-4.5 w-4.5 text-white" />
              <span>WhatsApp'tan Yaz</span>
            </a>
          </div>
        </Container>
      </section>

    </main>
  )
}
