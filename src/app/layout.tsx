import type { Metadata } from 'next'
import { Onest } from "next/font/google"
import './globals.css'

const onest = Onest({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-onest",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://serefgayrimenkul.com"
  ),
  title: {
    default: "Şeref Gayrimenkul - İnegöl'ün Güvenilir Emlak Danışmanı",
    template: "%s | Şeref Gayrimenkul",
  },
  description:
    "İnegöl ve Bursa'da satılık, kiralık daire, villa, arsa ve ticari mülkler. Uzun yıllara dayanan tecrübe ile güvenilir gayrimenkul danışmanlığı.",
  keywords: [
    "Şeref Gayrimenkul",
    "İnegöl emlak",
    "Bursa emlak",
    "İnegöl satılık daire",
    "İnegöl kiralık daire",
    "İnegöl satılık arsa",
    "İnegöl villa",
    "İnegöl emlakçı",
    "İnegöl gayrimenkul",
    "Kemalpasa emlak",
    "Bursa satılık daire",
    "Bursa kiralık daire",
  ],
  authors: [{ name: "Şeref İnce" }],
  creator: "Şeref Gayrimenkul",
  publisher: "Şeref Gayrimenkul",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://serefgayrimenkul.com",
    siteName: "Şeref Gayrimenkul",
    title: "Şeref Gayrimenkul - İnegöl'ün Güvenilir Emlak Danışmanı",
    description:
      "İnegöl ve Bursa'da satılık, kiralık daire, villa, arsa ve ticari mülkler.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Şeref Gayrimenkul",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Şeref Gayrimenkul - İnegöl'ün Güvenilir Emlak Danışmanı",
    description:
      "İnegöl ve Bursa'da satılık, kiralık daire, villa, arsa ve ticari mülkler.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "Mj7pFi7hfOJwg2TRnEbyJik9dvQkVSBptS7Uexcbrnc",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${onest.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
