import type { Metadata } from 'next'
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Container from "@/components/shared/Container"

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "Şeref Gayrimenkul çerez politikası. Sitemizde kullanılan çerezler hakkında detaylı bilgi.",
}

export default function CookiePolicyPage() {
  return (
    <main className="bg-white min-h-screen py-12 md:py-16 font-body text-xs font-semibold">
      <Container className="max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[11px] font-bold text-text-muted uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-primary-green transition-colors">
            Ana Sayfa
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-text-muted/60" />
          <span className="text-text-primary">Çerez Politikası</span>
        </nav>

        {/* Header */}
        <div className="border-b border-border-light pb-6 mb-8 space-y-2 text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight">
            Çerez Politikası
          </h1>
          <p className="text-xs font-bold text-text-muted">
            Son Güncelleme: 26 Ocak 2025
          </p>
        </div>

        {/* Content */}
        <article className="prose prose-sm max-w-none text-text-body font-medium leading-relaxed prose-headings:font-bold prose-headings:text-text-primary prose-a:text-primary-green prose-strong:font-bold space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              1. Çerez Nedir?
            </h2>
            <p>
              Çerezler (cookies), web sitemizi ziyaret ettiğinizde tarayıcınıza gönderilen ve cihazınızda saklanan küçük metin dosyalarıdır. Çerezler, sitemizi daha verimli hale getirmek ve size daha iyi bir deneyim sunmak için kullanılır.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              2. Kullandığımız Çerez Türleri
            </h2>
            
            <h3 className="text-lg font-bold text-text-primary mt-6 mb-2">
              Zorunlu Çerezler
            </h3>
            <p>
              Sitemizin temel işlevleri için gereklidir ve devre dışı bırakılamazlar. Bu çerezler, form gönderme, çerez tercihlerinizi hatırlama gibi işlemler için kullanılır.
            </p>

            <h3 className="text-lg font-bold text-text-primary mt-6 mb-2">
              Analitik Çerezler
            </h3>
            <p>
              Ziyaretçilerin sitemizi nasıl kullandığını anlamamıza yardımcı olur. Sayfa görüntüleme sayıları, ziyaret süreleri gibi anonim istatistikler toplar.
            </p>

            <h3 className="text-lg font-bold text-text-primary mt-6 mb-2">
              İşlevsellik Çerezleri
            </h3>
            <p>
              Tercihlerinizi (dil, bölge vb.) hatırlayarak size özelleştirilmiş deneyim sunar.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              3. Üçüncü Taraf Çerezleri
            </h2>
            <p>
              Sitemizde aşağıdaki üçüncü taraf servisler kullanılmaktadır:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Google Maps:</strong> Konum bilgisi göstermek için</li>
              <li><strong>WhatsApp:</strong> İletişim butonları için</li>
            </ul>
            <p>
              Bu servisler kendi çerezlerini kullanabilir ve Şeref Gayrimenkul&apos;ün bu çerezler üzerinde bir kontrolü bulunmamaktadır.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              4. Çerez Yönetimi
            </h2>
            <p>
              Çerez tercihlerinizi tarayıcı ayarlarınızdan yönetebilirsiniz:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Chrome:</strong> Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler</li>
              <li><strong>Firefox:</strong> Ayarlar &gt; Gizlilik ve Güvenlik</li>
              <li><strong>Safari:</strong> Tercihler &gt; Gizlilik</li>
              <li><strong>Edge:</strong> Ayarlar &gt; Çerezler ve Site İzinleri</li>
            </ul>
            <p>
              Çerezleri tamamen devre dışı bırakırsanız, sitemizin bazı özellikleri düzgün çalışmayabilir.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              5. Değişiklikler
            </h2>
            <p>
              Bu Çerez Politikası zaman zaman güncellenebilir. Yapılan tüm güncellemeler ve değişiklikler anında bu sayfada yayınlanarak yürürlüğe girer.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              6. İletişim
            </h2>
            <p>
              Çerez Politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:
            </p>
            <p className="border-l-4 border-primary-green pl-4 italic">
              <strong>Şeref Gayrimenkul</strong><br />
              Telefon: 0533 518 7357
            </p>
          </section>
        </article>
      </Container>
    </main>
  )
}
