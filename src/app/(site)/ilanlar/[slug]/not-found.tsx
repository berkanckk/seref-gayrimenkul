import Link from "next/link"
import { SearchX } from "lucide-react"
import Container from "@/components/shared/Container"

export default function PropertyNotFound() {
  return (
    <main className="bg-bg-soft min-h-[70vh] flex items-center justify-center py-12 font-body">
      <Container className="flex flex-col items-center text-center max-w-md">
        <div className="bg-white p-5 rounded-full shadow-subtle border border-border-light text-primary-green mb-6">
          <SearchX className="h-10 w-10 text-primary-green" />
        </div>
        <h1 className="text-2xl font-extrabold text-text-primary tracking-tight mb-3">
          İlan Bulunamadı
        </h1>
        <p className="text-text-muted text-xs font-semibold leading-relaxed mb-8">
          Aradığınız ilan mevcut değil, yayından kaldırılmış veya bağlantısı değiştirilmiş olabilir. Diğer güncel fırsatlarımıza göz atabilirsiniz.
        </p>
        <Link
          href="/ilanlar"
          className="btn-premium-green text-white font-bold text-xs px-8 py-3.5 rounded-xl shadow-md transition-all inline-block hover:scale-[1.01]"
        >
          Tüm İlanları Gör
        </Link>
      </Container>
    </main>
  )
}
