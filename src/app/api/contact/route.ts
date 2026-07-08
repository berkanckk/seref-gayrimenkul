import { NextResponse } from "next/server"
import { z } from "zod"

const contactFormSchema = z.object({
  name: z.string().min(2, "Ad Soyad en az 2 karakter olmalıdır"),
  phone: z.string().min(10, "Lütfen geçerli bir telefon numarası giriniz"),
  email: z.string().email("Lütfen geçerli bir e-posta adresi giriniz").optional().or(z.literal("")),
  subject: z.string().min(1, "Lütfen bir konu seçiniz"),
  message: z.string().min(10, "Mesajınız en az 10 karakter olmalıdır"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate request body against schema
    const result = contactFormSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, phone, email, subject, message } = result.data

    // Log the contact message payload to the console
    console.log("────────────────────────────────────────────────────────")
    console.log("[API CONTACT] New Contact Message Received:")
    console.log(`- Gönderen: ${name}`)
    console.log(`- Telefon: ${phone}`)
    console.log(`- E-posta: ${email || "Belirtilmemiş"}`)
    console.log(`- Konu: ${subject}`)
    console.log(`- Mesaj: ${message}`)
    console.log("────────────────────────────────────────────────────────")

    // TODO: Integrate with Resend or NodeMailer to send emails in production.

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[API CONTACT] Error processing contact form submission:", error)
    return NextResponse.json(
      { success: false, message: "Bir sunucu hatası oluştu." },
      { status: 500 }
    )
  }
}
