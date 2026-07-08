import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

// Fallback to a dummy key during build time to prevent constructor throw when env var is missing
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummykey");

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "iletisim@serefgayrimenkul.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "iletisim@send.serefgayrimenkul.com";

interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactFormData = await req.json();

    // Validation
    if (!body.name || !body.phone || !body.subject || !body.message) {
      return NextResponse.json(
        { success: false, message: "Lütfen tüm zorunlu alanları doldurun." },
        { status: 400 }
      );
    }

    if (body.message.length < 10) {
      return NextResponse.json(
        { success: false, message: "Mesaj en az 10 karakter olmalıdır." },
        { status: 400 }
      );
    }

    // Send email
    const emailResult = await resend.emails.send({
      from: `Şeref Gayrimenkul <${FROM_EMAIL}>`,
      to: [CONTACT_EMAIL],
      replyTo: body.email || undefined,
      subject: `[Web Form] ${body.subject} - ${body.name}`,
      html: `
        <div style="font-family: 'Manrope', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(180deg, #164E22 0%, #0E3414 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Yeni İletişim Formu Mesajı</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <strong style="color: #0E3414;">Ad Soyad:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  ${body.name}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <strong style="color: #0E3414;">Telefon:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <a href="tel:${body.phone}" style="color: #164E22; text-decoration: none;">
                    ${body.phone}
                  </a>
                </td>
              </tr>
              ${body.email ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <strong style="color: #0E3414;">E-posta:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <a href="mailto:${body.email}" style="color: #164E22; text-decoration: none;">
                    ${body.email}
                  </a>
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <strong style="color: #0E3414;">Konu:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  ${body.subject}
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 20px 0;">
                  <strong style="color: #0E3414; display: block; margin-bottom: 10px;">Mesaj:</strong>
                  <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; border-left: 4px solid #164E22;">
                    ${body.message.replace(/\n/g, '<br>')}
                  </div>
                </td>
              </tr>
            </table>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px;">
              <p>Bu mesaj serefgayrimenkul.com iletişim formundan gönderilmiştir.</p>
              <p>Cevaplamak için doğrudan bu maile yanıt verebilirsiniz.</p>
            </div>
          </div>
        </div>
      `,
    });

    if (emailResult.error) {
      console.error("Resend error:", emailResult.error);
      return NextResponse.json(
        { success: false, message: "Mesaj gönderilemedi. Lütfen tekrar deneyin." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Mesajınız başarıyla iletildi! En kısa sürede size dönüş yapacağız.",
      id: emailResult.data?.id,
    });

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
