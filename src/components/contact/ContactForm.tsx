"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Send } from "lucide-react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const contactSchema = z.object({
  name: z.string().min(2, "Ad Soyad en az 2 karakter olmalıdır"),
  phone: z.string().min(10, "Lütfen geçerli bir telefon numarası giriniz (En az 10 hane)"),
  email: z.string().email("Lütfen geçerli bir e-posta adresi giriniz").optional().or(z.literal("")),
  subject: z.string().min(1, "Lütfen bir konu seçiniz"),
  message: z.string().min(10, "Mesajınız en az 10 karakter olmalıdır"),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const resData = await response.json()

      if (response.ok && resData.success) {
        toast.success("Mesajınız başarıyla iletildi!")
        reset()
      } else {
        toast.error(resData.message || "Mesaj gönderilirken bir sorun oluştu.")
      }
    } catch (error) {
      console.error("[ContactForm] Submit error:", error)
      toast.error("Bir ağ hatası oluştu. Lütfen tekrar deneyin.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-border-light p-6 md:p-10 shadow-subtle font-body text-xs font-semibold">
      <div className="mb-6 space-y-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary-green">
          MESAJ GÖNDER
        </span>
        <h3 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">
          Bize Yazın
        </h3>
        <p className="text-text-muted text-xs font-semibold">
          Formu doldurun, size en kısa sürede dönüş yapalım.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-[11px] font-bold text-text-primary uppercase tracking-wider">
            Ad Soyad <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            placeholder="Adınızı ve soyadınızı giriniz"
            aria-invalid={!!errors.name}
            className="h-10 text-xs font-bold text-text-primary"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-[10px] font-bold text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label htmlFor="phone" className="block text-[11px] font-bold text-text-primary uppercase tracking-wider">
            Telefon Numarası <span className="text-red-500">*</span>
          </label>
          <Input
            id="phone"
            type="tel"
            placeholder="Örn: 0533 518 7357"
            aria-invalid={!!errors.phone}
            className="h-10 text-xs font-bold text-text-primary"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-[10px] font-bold text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-[11px] font-bold text-text-primary uppercase tracking-wider">
            E-posta Adresi <span className="text-text-muted font-normal">(İsteğe Bağlı)</span>
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Örn: ornek@adres.com"
            aria-invalid={!!errors.email}
            className="h-10 text-xs font-bold text-text-primary"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-[10px] font-bold text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Subject */}
        <div className="space-y-1.5">
          <label htmlFor="subject" className="block text-[11px] font-bold text-text-primary uppercase tracking-wider">
            Konu <span className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            className="w-full bg-white border border-border-light rounded-lg px-3 py-2 text-xs font-bold text-text-primary focus:outline-none focus:border-primary-green cursor-pointer shadow-subtle h-10"
            {...register("subject")}
          >
            <option value="">Lütfen konu seçiniz</option>
            <option value="Satılık İlan Hakkında">Satılık İlan Hakkında</option>
            <option value="Kiralık İlan Hakkında">Kiralık İlan Hakkında</option>
            <option value="Gayrimenkul Değerleme">Gayrimenkul Değerleme</option>
            <option value="Emlak Danışmanlığı">Emlak Danışmanlığı</option>
            <option value="Diğer">Diğer</option>
          </select>
          {errors.subject && (
            <p className="text-[10px] font-bold text-red-500">{errors.subject.message}</p>
          )}
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label htmlFor="message" className="block text-[11px] font-bold text-text-primary uppercase tracking-wider">
            Mesajınız <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="message"
            placeholder="Lütfen mesajınızı detaylıca yazınız..."
            rows={5}
            aria-invalid={!!errors.message}
            className="text-xs font-bold text-text-primary"
            {...register("message")}
          />
          {errors.message && (
            <p className="text-[10px] font-bold text-red-500">{errors.message.message}</p>
          )}
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-premium-green text-white font-bold text-xs py-4 px-6 rounded-xl shadow-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="h-4 w-4 text-white" />
            <span>{isSubmitting ? "Gönderiliyor..." : "Mesajı Gönder"}</span>
          </button>
        </div>

        <p className="text-[10px] text-text-muted/65 leading-relaxed pt-2">
          Mesaj göndererek kişisel verilerinizin Şeref Gayrimenkul KVKK Aydınlatma Metni kapsamında işlenmesini kabul etmiş olursunuz.
        </p>
      </form>
    </div>
  )
}
