import type { MetadataRoute } from "next"
import { getAllPropertySlugs } from "@/sanity/lib/fetchers"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://serefgayrimenkul.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: "", priority: 1.0, changeFrequency: "daily" as const },
    { url: "/ilanlar", priority: 0.9, changeFrequency: "daily" as const },
    {
      url: "/ilanlar?tip=satilik",
      priority: 0.9,
      changeFrequency: "daily" as const,
    },
    {
      url: "/ilanlar?tip=kiralik",
      priority: 0.9,
      changeFrequency: "daily" as const,
    },
    {
      url: "/hakkimizda",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      url: "/iletisim",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      url: "/gizlilik-politikasi",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
    { url: "/kvkk", priority: 0.3, changeFrequency: "yearly" as const },
    {
      url: "/cerez-politikasi",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
    {
      url: "/kullanim-kosullari",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
  ].map((page) => ({
    url: `${SITE_URL}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  const slugs = await getAllPropertySlugs()
  const propertyPages = slugs.map((slug) => ({
    url: `${SITE_URL}/ilanlar/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [...staticPages, ...propertyPages]
}
