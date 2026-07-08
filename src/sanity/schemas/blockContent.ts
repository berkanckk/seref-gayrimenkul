import { defineType, defineArrayMember } from 'sanity'

/**
 * blockContent — Zengin metin içerik türü
 * Tüm şemalarda yeniden kullanılan ortak içerik bloğu.
 */
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Zengin Metin İçerik',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Başlık 2 (H2)', value: 'h2' },
        { title: 'Başlık 3 (H3)', value: 'h3' },
        { title: 'Başlık 4 (H4)', value: 'h4' },
        { title: 'Alıntı', value: 'blockquote' },
      ],
      lists: [
        { title: 'Madde İşaretli Liste', value: 'bullet' },
        { title: 'Numaralı Liste', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Kalın', value: 'strong' },
          { title: 'İtalik', value: 'em' },
          { title: 'Altı Çizili', value: 'underline' },
          { title: 'Üstü Çizili', value: 'strike-through' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Bağlantı',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                description: 'Bağlantı adresi (https:// ile başlamalı)',
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
              {
                name: 'blank',
                type: 'boolean',
                title: 'Yeni Sekmede Aç',
                description: 'İşaretlenirse bağlantı yeni sekmede açılır',
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      title: 'Görsel',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Metin',
          description: 'Görsel açıklaması (SEO ve erişilebilirlik için önemli)',
          validation: (Rule) => Rule.required().warning('Alt metin eklemeniz tavsiye edilir'),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Altyazı',
          description: 'Görselin altında görüntülenecek açıklama (isteğe bağlı)',
        },
      ],
    }),
  ],
})
