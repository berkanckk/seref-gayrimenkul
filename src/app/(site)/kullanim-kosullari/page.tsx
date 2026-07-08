import type { Metadata } from 'next'
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Container from "@/components/shared/Container"

export const metadata: Metadata = {
  title: "Kullanım Koşulları",
  description: "Şeref Gayrimenkul web sitesi kullanım koşulları.",
}

export default function TermsOfUsePage() {
  return (
    <main className="bg-white min-h-screen py-12 md:py-16 font-body text-xs font-semibold">
      <Container className="max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[11px] font-bold text-text-muted uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-primary-green transition-colors">
            Ana Sayfa
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-text-muted/60" />
          <span className="text-text-primary">Kullanım Koşulları</span>
        </nav>

        {/* Header */}
        <div className="border-b border-border-light pb-6 mb-8 space-y-2 text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight">
            Kullanım Koşulları
          </h1>
          <p className="text-xs font-bold text-text-muted">
            Son Güncelleme: 26 Ocak 2025
          </p>
        </div>

        {/* Content */}
        <article className="prose prose-sm max-w-none text-text-body font-medium leading-relaxed prose-headings:font-bold prose-headings:text-text-primary prose-a:text-primary-green prose-strong:font-bold space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              1. Genel
            </h2>
            <p>
              serefgayrimenkul.com web sitesini ziyaret ederek ve kullanarak, aşağıda belirtilen kullanım koşullarını kabul etmiş sayılırsınız.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              2. Hizmet Tanımı
            </h2>
            <p>
              Web sitemiz, Şeref Gayrimenkul tarafından İnegöl ve çevresinde satılık, kiralık gayrimenkul ilanlarını sergileme, iletişim sağlama ve danışmanlık hizmeti sunma amacıyla oluşturulmuştur.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              3. Kullanıcı Yükümlülükleri
            </h2>
            <p>
              Web sitemizi kullanırken:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Doğru ve güncel bilgi vermeyi</li>
              <li>Sitemize zarar verecek eylemlerden kaçınmayı</li>
              <li>Yasal düzenlemelere uymayı</li>
              <li>Diğer kullanıcıların haklarına saygı göstermeyi</li>
            </ul>
            <p>
              kabul etmiş olursunuz.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              4. Fikri Mülkiyet
            </h2>
            <p>
              Web sitemizdeki tüm içerik (yazılar, logolar, tasarımlar, fotoğraflar vb.) Şeref Gayrimenkul&apos;e aittir ve fikri mülkiyet hakları kapsamında korunmaktadır. İzinsiz kopyalama, dağıtma veya kullanım yasaktır.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              5. İlan Bilgilerinin Doğruluğu
            </h2>
            <p>
              Sitemizde yer alan ilanlar, bilgi verme amaçlıdır ve zaman zaman güncellenmemiş olabilir. Kesin bilgi için lütfen bizimle iletişime geçin. İlanlarda belirtilen fiyat, özellik ve durum bilgilerinin doğruluğu garanti edilmemektedir.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              6. Sorumluluk Reddi
            </h2>
            <p>
              Şeref Gayrimenkul, web sitemizin kesintisiz veya hatasız çalışacağını garanti etmez. Site kullanımından kaynaklanabilecek doğrudan veya dolaylı zararlardan sorumlu tutulamaz.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              7. Bağlantılar
            </h2>
            <p>
              Web sitemiz, üçüncü taraf sitelere bağlantılar içerebilir. Bu sitelerin içeriğinden ve gizlilik uygulamalarından sorumlu değiliz.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              8. Değişiklikler
            </h2>
            <p>
              Bu Kullanım Koşulları önceden bildirim yapılmaksızın değiştirilebilir. Değişiklikler yayınlandığı anda geçerlilik kazanır.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              9. Yürürlük ve Uygulanacak Hukuk
            </h2>
            <p>
              Bu Kullanım Koşulları Türkiye Cumhuriyeti kanunlarına tabidir. Uyuşmazlıklar İnegöl mahkemelerinde çözülür.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              10. İletişim
            </h2>
            <p>
              Kullanım koşulları veya web sitemiz hakkındaki sorularınız için bizimle iletişime geçebilirsiniz:
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
