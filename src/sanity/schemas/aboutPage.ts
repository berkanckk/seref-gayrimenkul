import { defineType, defineField, defineArrayMember } from 'sanity'
import { UsersIcon } from '../studioIcons'

/**
 * aboutPage — Hakkımızda Sayfası (Singleton)
 * "Hakkımızda" sayfasının tüm içeriğini barındırır.
 */
export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Hakkımızda Sayfası',
  type: 'document',
  icon: UsersIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Sayfa Başlığı',
      type: 'string',
      description: 'Sayfanın ana başlığı. H1 etiketi olarak kullanılır.',
      initialValue: 'Hakkımızda',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'subtitle',
      title: 'Alt Başlık',
      type: 'string',
      description: 'Başlığın altında görünecek kısa açıklayıcı metin.',
    }),

    defineField({
      name: 'heroImage',
      title: 'Kapak Görseli',
      type: 'image',
      description: 'Sayfanın üst kısmında büyük görünecek kapak fotoğrafı. Önerilen: 1600x800px.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Metin',
          type: 'string',
          description: 'Görsel açıklaması (erişilebilirlik ve SEO için).',
        }),
      ],
    }),

    defineField({
      name: 'content',
      title: 'Ana İçerik',
      type: 'blockContent',
      description: 'Şirket hakkında detaylı metin. Paragraf, başlık ve listeler kullanabilirsiniz.',
    }),

    defineField({
      name: 'mission',
      title: 'Misyonumuz',
      type: 'text',
      rows: 4,
      description: 'Şirketin misyon ifadesi. 2-4 cümle önerilir.',
    }),

    defineField({
      name: 'vision',
      title: 'Vizyonumuz',
      type: 'text',
      rows: 4,
      description: 'Şirketin vizyon ifadesi. 2-4 cümle önerilir.',
    }),

    defineField({
      name: 'values',
      title: 'Değerlerimiz',
      type: 'array',
      description: 'Şirketin temel değerlerini listeleyin. Her değer ayrı bir kart olarak gösterilir.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'value',
          title: 'Değer',
          fields: [
            defineField({
              name: 'title',
              title: 'Başlık',
              type: 'string',
              description: 'Değerin adı. Örn: "Güvenilirlik", "Şeffaflık"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Açıklama',
              type: 'text',
              rows: 3,
              description: 'Bu değerin kısa açıklaması.',
            }),
            defineField({
              name: 'icon',
              title: 'İkon (emoji)',
              type: 'string',
              description: 'Bu değeri temsil eden emoji. Örn: 🤝, ⭐, 🏆',
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        }),
      ],
    }),

    defineField({
      name: 'stats',
      title: 'İstatistikler',
      type: 'array',
      description: 'Öne çıkan sayısal başarılar. Örn: "500+ Mutlu Müşteri", "10+ Yıl Deneyim"',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          title: 'İstatistik',
          fields: [
            defineField({
              name: 'value',
              title: 'Değer',
              type: 'string',
              description: 'Sayısal değer. Örn: "500+", "10 Yıl", "%98"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Etiket',
              type: 'string',
              description: 'Değerin açıklaması. Örn: "Mutlu Müşteri", "Satılan Mülk"',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        }),
      ],
    }),

    defineField({
      name: 'teamMembers',
      title: 'Ekip Üyeleri',
      type: 'array',
      description: 'Ekip sayfasında tanıtılacak çalışanlar.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'teamMember',
          title: 'Ekip Üyesi',
          fields: [
            defineField({
              name: 'name',
              title: 'Ad Soyad',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Görev / Ünvan',
              type: 'string',
              description: 'Örn: "Gayrimenkul Danışmanı", "Satış Müdürü"',
            }),
            defineField({
              name: 'photo',
              title: 'Fotoğraf',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Metin',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'phone',
              title: 'Telefon',
              type: 'string',
              description: 'Doğrudan ulaşılabilecek telefon numarası.',
            }),
            defineField({
              name: 'bio',
              title: 'Kısa Biyografi',
              type: 'text',
              rows: 3,
              description: 'Ekip üyesi hakkında 2-3 cümlelik tanıtım.',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'photo',
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'seoTitle',
      title: 'SEO Başlık',
      type: 'string',
      description: 'Boş bırakırsanız sayfa başlığı otomatik kullanılır.',
      validation: (Rule) => Rule.max(60).warning('60 karakteri aşmamalıdır'),
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO Açıklama',
      type: 'text',
      rows: 3,
      description: 'Google arama sonuçlarında görünen açıklama. 150-160 karakter önerilir.',
      validation: (Rule) => Rule.max(160).warning('160 karakteri aşmamalıdır'),
    }),
  ],

  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return {
        title: title ?? 'Hakkımızda',
        subtitle: 'Hakkımızda Sayfası',
      }
    },
  },
})
