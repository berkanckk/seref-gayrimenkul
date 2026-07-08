import { defineType, defineField } from 'sanity'
import { EnvelopeIcon } from '../studioIcons'

/**
 * contactPage — İletişim Sayfası (Singleton)
 * "İletişim" sayfasının metin içeriklerini ve SEO bilgilerini yönetir.
 * İletişim bilgilerinin kendisi (telefon, adres vb.) siteSettings'ten alınır.
 */
export const contactPage = defineType({
  name: 'contactPage',
  title: 'İletişim Sayfası',
  type: 'document',
  icon: EnvelopeIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Sayfa Başlığı',
      type: 'string',
      description: 'Sayfanın ana başlığı. H1 etiketi olarak kullanılır.',
      initialValue: 'İletişim',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'subtitle',
      title: 'Alt Başlık',
      type: 'string',
      description: 'Başlığın altında görünen kısa açıklamı metin.',
      initialValue: 'Size yardımcı olmaktan mutluluk duyarız',
    }),

    defineField({
      name: 'description',
      title: 'Sayfa Açıklaması',
      type: 'text',
      rows: 4,
      description: 'İletişim formunun üstünde ya da yanında gösterilecek açıklama paragrafı.',
    }),

    defineField({
      name: 'formTitle',
      title: 'Form Bölümü Başlığı',
      type: 'string',
      description: 'İletişim formunun üstündeki başlık.',
      initialValue: 'Bize Ulaşın',
    }),

    defineField({
      name: 'infoTitle',
      title: 'Bilgi Bölümü Başlığı',
      type: 'string',
      description: 'Telefon, adres gibi iletişim bilgilerinin gösterildiği bölümün başlığı.',
      initialValue: 'İletişim Bilgileri',
    }),

    defineField({
      name: 'ctaText',
      title: 'CTA Metni',
      type: 'string',
      description: 'Sayfanın altında veya üstünde vurgulanan eylem çağrısı metni.',
      initialValue: 'Gayrimenkulünüzü değerlendirmek ister misiniz?',
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
        title: title ?? 'İletişim',
        subtitle: 'İletişim Sayfası',
      }
    },
  },
})
