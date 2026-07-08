import type { Metadata } from 'next'
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Container from "@/components/shared/Container"

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: "Şeref Gayrimenkul KVKK aydınlatma metni. Kişisel verilerinizin işlenmesi hakkında yasal bilgilendirme.",
}

export default function KvkkPage() {
  return (
    <main className="bg-white min-h-screen py-12 md:py-16 font-body text-xs font-semibold">
      <Container className="max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[11px] font-bold text-text-muted uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-primary-green transition-colors">
            Ana Sayfa
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-text-muted/60" />
          <span className="text-text-primary">KVKK Aydınlatma Metni</span>
        </nav>

        {/* Header */}
        <div className="border-b border-border-light pb-6 mb-8 space-y-2 text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight">
            KVKK Aydınlatma Metni
          </h1>
          <p className="text-xs font-bold text-text-muted">
            Son Güncelleme: 26 Ocak 2025
          </p>
        </div>

        {/* Content */}
        <article className="prose prose-sm max-w-none text-text-body font-medium leading-relaxed prose-headings:font-bold prose-headings:text-text-primary prose-a:text-primary-green prose-strong:font-bold space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              1. Veri Sorumlusu
            </h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında, Şeref Gayrimenkul olarak &quot;Veri Sorumlusu&quot; sıfatıyla kişisel verilerinizin işlenmesine ilişkin sizleri bilgilendirmek istiyoruz.
            </p>
            <p className="border-l-4 border-primary-green pl-4 italic">
              <strong>Veri Sorumlusu Bilgileri:</strong><br />
              Unvan: Şeref Gayrimenkul<br />
              Adres: Sinanbey, Kanal Sk. No:14 D:E, 16400 İnegöl/Bursa<br />
              Telefon: 0533 518 7357
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              2. Kişisel Verilerin İşlenme Amaçları
            </h2>
            <p>
              Kişisel verilerinizin işlenme amaçları aşağıda listelenmiştir:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Gayrimenkul alım, satım ve kiralama süreçlerinin yürütülmesi</li>
              <li>Müşteri talep ve şikayetlerinin yönetimi</li>
              <li>İletişim faaliyetlerinin yürütülmesi</li>
              <li>İlan bilgilendirme ve pazarlama faaliyetleri (izin verildiği takdirde)</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              3. İşlenen Kişisel Veri Kategorileri
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Kimlik Bilgileri:</strong> Ad, soyad</li>
              <li><strong>İletişim Bilgileri:</strong> Telefon, e-posta, adres</li>
              <li><strong>İşlem Bilgileri:</strong> Gayrimenkul talep ve tercihleri</li>
              <li><strong>Dijital İzleme Verileri:</strong> IP adresi, çerez bilgileri</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              4. Kişisel Verilerin Aktarımı
            </h2>
            <p>
              Kişisel verileriniz, yasal zorunluluklar dışında üçüncü şahıslarla paylaşılmamaktadır. Aşağıdaki durumlarda aktarım gerçekleşebilir:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Yasal düzenleme ve talep halinde yetkili mercilerle</li>
              <li>Hizmet sağlayıcılarımızla (hosting, e-posta servisi vb.) yalnızca hizmet sunumu için gerekli ölçüde</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              5. Kişisel Veri Toplama Yöntemi ve Hukuki Sebep
            </h2>
            <p>
              Kişisel verileriniz; web sitemiz üzerinden doldurulan formlar, telefon veya WhatsApp aracılığıyla yapılan iletişim veya ofisimize yapılan ziyaretler yollarıyla, KVKK&apos;nın 5. maddesinde belirtilen &quot;meşru menfaat&quot; ve &quot;açık rıza&quot; hukuki sebeplerine dayanılarak işlenmektedir.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              6. İlgili Kişi Hakları
            </h2>
            <p>
              KVKK&apos;nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>a) Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>b) İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>c) İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>d) Yurt içinde/dışında aktarıldığı üçüncü kişileri bilme</li>
              <li>e) Eksik/yanlış işlenmişse düzeltilmesini isteme</li>
              <li>f) KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini/yok edilmesini isteme</li>
              <li>g) Yapılan işlemlerin, verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
              <li>h) İşlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
              <li>i) Kanuna aykırı işlenme sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary mt-8 mb-3">
              7. Başvuru Yöntemi
            </h2>
            <p>
              Haklarınızı kullanmak için başvurularınızı yazılı olarak Sinanbey, Kanal Sk. No:14 D:E, 16400 İnegöl/Bursa adresine veya telefon ile 0533 518 7357 numaramıza iletebilirsiniz.
            </p>
          </section>
        </article>
      </Container>
    </main>
  )
}
