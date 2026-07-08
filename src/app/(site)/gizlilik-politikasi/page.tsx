import type { Metadata } from 'next'
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Container from "@/components/shared/Container"

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Şeref Gayrimenkul gizlilik politikası. Kişisel verilerinizin nasıl korunduğu hakkında bilgi.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white min-h-screen py-12 md:py-16 font-body text-xs font-semibold">
      <Container className="max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[11px] font-bold text-text-muted uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-primary-green transition-colors">
            Ana Sayfa
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-text-muted/60" />
          <span className="text-text-primary">Gizlilik Politikası</span>
        </nav>

        {/* Header */}
        <div className="border-b border-border-light pb-6 mb-8 space-y-2 text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight">
            Gizlilik Politikası
          </h1>
          <p className="text-xs font-bold text-text-muted">
            Son Güncelleme: 26 Ocak 2025
          </p>
        </div>

        {/* Content */}
        <article className="prose prose-sm max-w-none text-text-body font-medium leading-relaxed prose-headings:font-bold prose-headings:text-text-primary prose-a:text-primary-green prose-strong:font-bold space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              1. Giriş
            </h2>
            <p>
              Şeref Gayrimenkul olarak, ziyaretçilerimizin ve müşterilerimizin kişisel verilerinin gizliliğine büyük önem veriyoruz. Bu Gizlilik Politikası, serefgayrimenkul.com web sitesini kullanırken toplanan bilgilerin nasıl kullanıldığını açıklar.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              2. Toplanan Bilgiler
            </h2>
            <p>
              Sitemizi ziyaret ettiğinizde veya iletişim formumuzu doldurduğunuzda aşağıdaki bilgiler toplanabilir:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ad, soyad</li>
              <li>Telefon numarası</li>
              <li>E-posta adresi</li>
              <li>Mesaj içeriği</li>
              <li>Ziyaret ettiğiniz sayfalar</li>
              <li>IP adresi ve tarayıcı bilgileri</li>
              <li>Çerezler aracılığıyla toplanan veriler</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              3. Bilgilerin Kullanım Amacı
            </h2>
            <p>
              Toplanan bilgiler aşağıdaki amaçlarla kullanılır:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Talep ve sorularınıza yanıt vermek</li>
              <li>Gayrimenkul danışmanlığı hizmeti sunmak</li>
              <li>Sizinle iletişim kurmak</li>
              <li>Web sitemizi geliştirmek ve iyileştirmek</li>
              <li>Yasal yükümlülüklerimizi yerine getirmek</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              4. Bilgi Paylaşımı
            </h2>
            <p>
              Kişisel bilgileriniz aşağıdaki durumlar dışında üçüncü şahıslarla paylaşılmaz:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Yasal zorunluluk durumunda yetkili mercilerle</li>
              <li>Sizin açık rızanız olması halinde</li>
              <li>Hizmet sağlayıcılarımızla (yalnızca hizmet sunumu için gerekli ölçüde)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              5. Bilgilerin Güvenliği
            </h2>
            <p>
              Kişisel verilerinizin güvenliği için endüstri standartlarında güvenlik önlemleri alıyoruz. Verileriniz güvenli sunucularda saklanır ve yetkisiz erişime karşı korunur.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              6. Çerezler
            </h2>
            <p>
              Web sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerez kullanmaktadır. Detaylı bilgi için{" "}
              <Link href="/cerez-politikasi" className="text-primary-green hover:underline font-bold">
                Çerez Politikamızı
              </Link>{" "}
              inceleyebilirsiniz.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              7. Haklarınız
            </h2>
            <p>
              KVKK kapsamında aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenen kişisel verileriniz hakkında bilgi talep etme</li>
              <li>Verilerinizin silinmesini veya düzeltilmesini talep etme</li>
              <li>Haklarınızın ihlali halinde şikayet etme</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              8. İletişim
            </h2>
            <p>
              Gizlilik Politikamız veya kişisel verileriniz hakkında sorularınız için bizimle iletişime geçebilirsiniz:
            </p>
            <p className="border-l-4 border-primary-green pl-4 italic">
              <strong>Şeref Gayrimenkul</strong><br />
              Adres: Sinanbey, Kanal Sk. No:14 D:E, 16400 İnegöl/Bursa<br />
              Telefon: 0533 518 7357
            </p>
          </section>
        </article>
      </Container>
    </main>
  )
}
