import { defineType, defineField, defineArrayMember } from 'sanity'
import { TagIcon } from '../studioIcons'

/**
 * property — Gayrimenkul İlanı şeması
 * Satılık ve kiralık mülklerin tüm detaylarını barındırır.
 */
export const property = defineType({
  name: 'property',
  title: 'İlan',
  type: 'document',
  icon: TagIcon,

  groups: [
    {
      name: 'basic',
      title: 'Temel Bilgiler',
      default: true,
    },
    {
      name: 'details',
      title: 'Detaylar',
    },
    {
      name: 'location',
      title: 'Konum',
    },
    {
      name: 'media',
      title: 'Görseller',
    },
    {
      name: 'features',
      title: 'Özellikler',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],

  fields: [
    // ── BASIC ────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'İlan Başlığı',
      type: 'string',
      group: 'basic',
      description: 'İlanın ana başlığı. Örn: "3+1 Satılık Daire, Atatürk Mah."',
      validation: (Rule) => Rule.required().min(10).max(120).error('İlan başlığı 10-120 karakter arasında olmalıdır'),
    }),

    defineField({
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      group: 'basic',
      description: 'Sayfanın web adresi. Başlıktan otomatik oluşturulur.',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required().error('URL alanı zorunludur'),
    }),

    defineField({
      name: 'listingNo',
      title: 'İlan No',
      type: 'string',
      group: 'basic',
      description: 'Benzersiz ilan numarası. Boş bırakırsanız otomatik atanır.',
      initialValue: () => `ILN-${Date.now()}`,
    }),

    defineField({
      name: 'listingType',
      title: 'İlan Tipi',
      type: 'string',
      group: 'basic',
      description: 'İlanın satılık mı yoksa kiralık mı olduğunu belirtin.',
      options: {
        list: [
          { title: 'Satılık', value: 'Satılık' },
          { title: 'Kiralık', value: 'Kiralık' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule) => Rule.required().error('İlan tipi seçilmesi zorunludur'),
    }),

    defineField({
      name: 'propertyType',
      title: 'Emlak Tipi',
      type: 'string',
      group: 'basic',
      description: 'Mülkün türünü seçin.',
      options: {
        list: [
          { title: 'Daire', value: 'Daire' },
          { title: 'Müstakil Ev', value: 'Müstakil Ev' },
          { title: 'Villa', value: 'Villa' },
          { title: 'Arsa', value: 'Arsa' },
          { title: 'Tarla', value: 'Tarla' },
          { title: 'Dükkan / Mağaza', value: 'Dükkan / Mağaza' },
          { title: 'Ofis', value: 'Ofis' },
          { title: 'Depo', value: 'Depo' },
          { title: 'Bina', value: 'Bina' },
          { title: 'Fabrika', value: 'Fabrika' },
          { title: 'Çiftlik', value: 'Çiftlik' },
        ],
      },
      validation: (Rule) => Rule.required().error('Emlak tipi seçilmesi zorunludur'),
    }),

    defineField({
      name: 'price',
      title: 'Fiyat',
      type: 'number',
      group: 'basic',
      description: 'Rakam olarak fiyat giriniz. Para birimi aşağıdan seçilebilir.',
      validation: (Rule) => Rule.required().positive().error('Geçerli bir fiyat giriniz'),
    }),

    defineField({
      name: 'currency',
      title: 'Para Birimi',
      type: 'string',
      group: 'basic',
      description: 'Fiyatın para birimi.',
      initialValue: 'TL',
      options: {
        list: [
          { title: 'Türk Lirası (₺)', value: 'TL' },
          { title: 'Amerikan Doları ($)', value: 'USD' },
          { title: 'Euro (€)', value: 'EUR' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),

    defineField({
      name: 'isFeatured',
      title: 'Öne Çıkan İlan',
      type: 'boolean',
      group: 'basic',
      description: 'Açık ise bu ilan ana sayfada öne çıkan ilanlar bölümünde gösterilir.',
      initialValue: false,
    }),

    defineField({
      name: 'isPublished',
      title: 'Yayında',
      type: 'boolean',
      group: 'basic',
      description: 'Kapalı ise ilan web sitesinde görünmez.',
      initialValue: true,
    }),

    defineField({
      name: 'publishedAt',
      title: 'Yayın Tarihi',
      type: 'datetime',
      group: 'basic',
      description: 'İlanın yayına alındığı tarih ve saat.',
      initialValue: () => new Date().toISOString(),
      options: {
        dateFormat: 'DD.MM.YYYY',
        timeFormat: 'HH:mm',
      },
    }),

    // ── DETAILS ──────────────────────────────────────────────
    defineField({
      name: 'description',
      title: 'Detaylı Açıklama',
      type: 'blockContent',
      group: 'details',
      description: 'Mülk hakkında detaylı açıklama. Başlık, paragraf ve liste ekleyebilirsiniz.',
    }),

    defineField({
      name: 'squareMeters',
      title: 'm² (Brüt)',
      type: 'number',
      group: 'details',
      description: 'Brüt kullanım alanı (metrekare).',
      validation: (Rule) => Rule.positive().integer(),
    }),

    defineField({
      name: 'netSquareMeters',
      title: 'm² (Net)',
      type: 'number',
      group: 'details',
      description: 'Net kullanım alanı (metrekare).',
      validation: (Rule) => Rule.positive().integer(),
    }),

    defineField({
      name: 'roomCount',
      title: 'Oda Sayısı',
      type: 'string',
      group: 'details',
      description: 'Mülkün oda + salon sayısı kombinasyonu.',
      options: {
        list: [
          { title: 'Stüdyo', value: 'Stüdyo' },
          { title: '1+0', value: '1+0' },
          { title: '1+1', value: '1+1' },
          { title: '2+0', value: '2+0' },
          { title: '2+1', value: '2+1' },
          { title: '2+2', value: '2+2' },
          { title: '3+0', value: '3+0' },
          { title: '3+1', value: '3+1' },
          { title: '3+2', value: '3+2' },
          { title: '4+0', value: '4+0' },
          { title: '4+1', value: '4+1' },
          { title: '4+2', value: '4+2' },
          { title: '5+0', value: '5+0' },
          { title: '5+1', value: '5+1' },
          { title: '5+2', value: '5+2' },
          { title: '6+ Oda', value: '6+ Oda' },
        ],
      },
    }),

    defineField({
      name: 'buildingAge',
      title: 'Bina Yaşı',
      type: 'number',
      group: 'details',
      description: 'Binanın yapım yılından bu yana geçen süre (yıl). Sıfır bina için 0 giriniz.',
      validation: (Rule) => Rule.min(0).integer(),
    }),

    defineField({
      name: 'floorNumber',
      title: 'Bulunduğu Kat',
      type: 'string',
      group: 'details',
      description: 'Mülkün bulunduğu kat. Örn: "3", "Zemin", "Bahçe Katı", "Çatı Katı"',
    }),

    defineField({
      name: 'totalFloors',
      title: 'Toplam Kat Sayısı',
      type: 'number',
      group: 'details',
      description: 'Binanın toplam kat sayısı.',
      validation: (Rule) => Rule.positive().integer(),
    }),

    defineField({
      name: 'bathroomCount',
      title: 'Banyo Sayısı',
      type: 'number',
      group: 'details',
      description: 'Mülkteki banyo ve tuvalet sayısı.',
      validation: (Rule) => Rule.min(0).integer(),
    }),

    defineField({
      name: 'heatingType',
      title: 'Isınma Tipi',
      type: 'string',
      group: 'details',
      description: 'Mülkün ısınma sistemi.',
      options: {
        list: [
          { title: 'Doğalgaz Kombi', value: 'Doğalgaz Kombi' },
          { title: 'Merkezi Doğalgaz', value: 'Merkezi Doğalgaz' },
          { title: 'Merkezi Sistem', value: 'Merkezi' },
          { title: 'Soba', value: 'Soba' },
          { title: 'Yerden Isıtma', value: 'Yerden Isıtma' },
          { title: 'Klima', value: 'Klima' },
          { title: 'Yok', value: 'Yok' },
        ],
      },
    }),

    defineField({
      name: 'furnished',
      title: 'Eşya Durumu',
      type: 'string',
      group: 'details',
      description: 'Mülkün eşya durumu.',
      options: {
        list: [
          { title: 'Eşyasız', value: 'Eşyasız' },
          { title: 'Eşyalı', value: 'Eşyalı' },
          { title: 'Yarı Eşyalı', value: 'Yarı Eşyalı' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),

    defineField({
      name: 'titleDeedStatus',
      title: 'Tapu Durumu',
      type: 'string',
      group: 'details',
      description: 'Mülkün tapu/hukuki durumu.',
      options: {
        list: [
          { title: 'Kat Mülkiyetli', value: 'Kat Mülkiyetli' },
          { title: 'Kat İrtifaklı', value: 'Kat İrtifaklı' },
          { title: 'Hisseli Tapu', value: 'Hisseli Tapu' },
          { title: 'Müstakil Tapulu', value: 'Müstakil Tapulu' },
          { title: 'Kooperatif', value: 'Kooperatif' },
          { title: 'Belirtilmemiş', value: 'Belirtilmemiş' },
        ],
      },
    }),

    defineField({
      name: 'suitableForLoan',
      title: 'Krediye Uygun',
      type: 'boolean',
      group: 'details',
      description: 'Mülk banka kredisine uygun mu?',
      initialValue: true,
    }),

    defineField({
      name: 'swapAvailable',
      title: 'Takas Uygun',
      type: 'boolean',
      group: 'details',
      description: 'Takas teklifi kabul ediliyor mu?',
      initialValue: false,
    }),

    // ── LOCATION ─────────────────────────────────────────────
    defineField({
      name: 'city',
      title: 'İl',
      type: 'string',
      group: 'location',
      description: 'Mülkün bulunduğu il.',
      initialValue: 'Bursa',
      options: {
        list: [
          { title: "Bursa", value: "Bursa" },
          { title: "Adana", value: "Adana" },
          { title: "Adıyaman", value: "Adıyaman" },
          { title: "Afyonkarahisar", value: "Afyonkarahisar" },
          { title: "Ağrı", value: "Ağrı" },
          { title: "Aksaray", value: "Aksaray" },
          { title: "Amasya", value: "Amasya" },
          { title: "Ankara", value: "Ankara" },
          { title: "Antalya", value: "Antalya" },
          { title: "Ardahan", value: "Ardahan" },
          { title: "Artvin", value: "Artvin" },
          { title: "Aydın", value: "Aydın" },
          { title: "Balıkesir", value: "Balıkesir" },
          { title: "Bartın", value: "Bartın" },
          { title: "Batman", value: "Batman" },
          { title: "Bayburt", value: "Bayburt" },
          { title: "Bilecik", value: "Bilecik" },
          { title: "Bingöl", value: "Bingöl" },
          { title: "Bitlis", value: "Bitlis" },
          { title: "Bolu", value: "Bolu" },
          { title: "Burdur", value: "Burdur" },
          { title: "Çanakkale", value: "Çanakkale" },
          { title: "Çankırı", value: "Çankırı" },
          { title: "Çorum", value: "Çorum" },
          { title: "Denizli", value: "Denizli" },
          { title: "Diyarbakır", value: "Diyarbakır" },
          { title: "Düzce", value: "Düzce" },
          { title: "Edirne", value: "Edirne" },
          { title: "Elazığ", value: "Elazığ" },
          { title: "Erzincan", value: "Erzincan" },
          { title: "Erzurum", value: "Erzurum" },
          { title: "Eskişehir", value: "Eskişehir" },
          { title: "Gaziantep", value: "Gaziantep" },
          { title: "Giresun", value: "Giresun" },
          { title: "Gümüşhane", value: "Gümüşhane" },
          { title: "Hakkari", value: "Hakkari" },
          { title: "Hatay", value: "Hatay" },
          { title: "Iğdır", value: "Iğdır" },
          { title: "Isparta", value: "Isparta" },
          { title: "İstanbul", value: "İstanbul" },
          { title: "İzmir", value: "İzmir" },
          { title: "Kahramanmaraş", value: "Kahramanmaraş" },
          { title: "Karabük", value: "Karabük" },
          { title: "Karaman", value: "Karaman" },
          { title: "Kars", value: "Kars" },
          { title: "Kastamonu", value: "Kastamonu" },
          { title: "Kayseri", value: "Kayseri" },
          { title: "Kırıkkale", value: "Kırıkkale" },
          { title: "Kırklareli", value: "Kırklareli" },
          { title: "Kırşehir", value: "Kırşehir" },
          { title: "Kilis", value: "Kilis" },
          { title: "Kocaeli", value: "Kocaeli" },
          { title: "Konya", value: "Konya" },
          { title: "Kütahya", value: "Kütahya" },
          { title: "Malatya", value: "Malatya" },
          { title: "Manisa", value: "Manisa" },
          { title: "Mardin", value: "Mardin" },
          { title: "Mersin", value: "Mersin" },
          { title: "Muğla", value: "Muğla" },
          { title: "Muş", value: "Muş" },
          { title: "Nevşehir", value: "Nevşehir" },
          { title: "Niğde", value: "Niğde" },
          { title: "Ordu", value: "Ordu" },
          { title: "Osmaniye", value: "Osmaniye" },
          { title: "Rize", value: "Rize" },
          { title: "Sakarya", value: "Sakarya" },
          { title: "Samsun", value: "Samsun" },
          { title: "Siirt", value: "Siirt" },
          { title: "Sinop", value: "Sinop" },
          { title: "Sivas", value: "Sivas" },
          { title: "Şanlıurfa", value: "Şanlıurfa" },
          { title: "Şırnak", value: "Şırnak" },
          { title: "Tekirdağ", value: "Tekirdağ" },
          { title: "Tokat", value: "Tokat" },
          { title: "Trabzon", value: "Trabzon" },
          { title: "Tunceli", value: "Tunceli" },
          { title: "Uşak", value: "Uşak" },
          { title: "Van", value: "Van" },
          { title: "Yalova", value: "Yalova" },
          { title: "Yozgat", value: "Yozgat" },
          { title: "Zonguldak", value: "Zonguldak" },
        ],
      },
      validation: (Rule) => Rule.required().error('İl bilgisi zorunludur'),
    }),

    defineField({
      name: 'district',
      title: 'İlçe',
      type: 'string',
      group: 'location',
      description: 'İlçe adını yazın (Örn: İnegöl)',
      initialValue: 'İnegöl',
      validation: (Rule) => Rule.required().error('İlçe bilgisi zorunludur'),
    }),

    defineField({
      name: 'neighborhood',
      title: 'Mahalle',
      type: 'string',
      group: 'location',
      description: 'Mülkün bulunduğu mahalle adı.',
    }),

    defineField({
      name: 'addressDetails',
      title: 'Adres Detayı',
      type: 'text',
      rows: 3,
      group: 'location',
      description: '⚠️ Bu alan sadece yönetim panelinde görünür, web sitesinde müşterilere gösterilmez.',
    }),

    defineField({
      name: 'mapUrl',
      title: 'Google Maps Linki',
      type: 'url',
      group: 'location',
      description: 'Google Maps paylaşım linki. maps.google.com üzerinden "Paylaş → Bağlantıyı Kopyala" ile alabilirsiniz.',
    }),

    defineField({
      name: 'latitude',
      title: 'Enlem (Latitude)',
      type: 'number',
      group: 'location',
      description: 'Coğrafi enlem koordinatı. Örn: 40.0833',
    }),

    defineField({
      name: 'longitude',
      title: 'Boylam (Longitude)',
      type: 'number',
      group: 'location',
      description: 'Coğrafi boylam koordinatı. Örn: 29.5167',
    }),

    // ── MEDIA ────────────────────────────────────────────────
    defineField({
      name: 'coverImage',
      title: 'Kapak Görseli',
      type: 'image',
      group: 'media',
      description: 'İlan listelerinde ve ilan detay sayfasında ana görsel olarak kullanılır. Önerilen boyut: 1200x800px.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Metin',
          type: 'string',
          description: 'Görselin açıklaması (SEO için önemli). Örn: "3+1 Satılık Daire İnegöl"',
        }),
      ],
      validation: (Rule) => Rule.required().error('Kapak görseli zorunludur'),
    }),

    defineField({
      name: "images",
      title: "Galeri Fotoğrafları",
      type: "array",
      group: "media",
      description: "Birden fazla fotoğrafı aynı anda seçip yükleyebilirsiniz. Fotoğrafları sürükleyip bırakarak sıralayabilirsiniz.",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Alt Metin",
              type: "string",
              description: "SEO için görsel açıklaması (opsiyonel)",
            },
          ],
        },
      ],
      options: {
        layout: "grid",
      },
      validation: (Rule) => Rule.min(1).error("En az 1 fotoğraf gereklidir"),
    }),

    defineField({
      name: 'videoUrl',
      title: 'Video URL (YouTube)',
      type: 'url',
      group: 'media',
      description: 'YouTube video linki. Örn: https://www.youtube.com/watch?v=XXXXX',
    }),

    // ── FEATURES ─────────────────────────────────────────────
    defineField({
      name: 'features',
      title: 'Özellikler ve İç Donanım',
      type: 'array',
      group: 'features',
      description: 'Mülkün sahip olduğu özellik ve donanımları seçin veya yazın.',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
        list: [
          { title: 'Asansör', value: 'Asansör' },
          { title: 'Otopark', value: 'Otopark' },
          { title: 'Güvenlik', value: 'Güvenlik' },
          { title: 'Havuz', value: 'Havuz' },
          { title: 'Spor Salonu', value: 'Spor Salonu' },
          { title: 'Jeneratör', value: 'Jeneratör' },
          { title: 'Kameralı Güvenlik', value: 'Kameralı Güvenlik' },
          { title: 'Bahçe', value: 'Bahçe' },
          { title: 'Teras', value: 'Teras' },
          { title: 'Balkon', value: 'Balkon' },
          { title: 'Site İçinde', value: 'Site İçinde' },
          { title: 'Klima', value: 'Klima' },
          { title: 'Kombi', value: 'Kombi' },
          { title: 'Çelik Kapı', value: 'Çelik Kapı' },
          { title: 'Amerikan Mutfak', value: 'Amerikan Mutfak' },
          { title: 'Ebeveyn Banyosu', value: 'Ebeveyn Banyosu' },
          { title: 'Ankastre', value: 'Ankastre' },
          { title: 'Depolu', value: 'Depolu' },
          { title: 'İnternet', value: 'İnternet' },
          { title: 'Uydu Sistemi', value: 'Uydu Sistemi' },
          { title: 'Alarm Sistemi', value: 'Alarm Sistemi' },
          { title: 'Çift Banyo', value: 'Çift Banyo' },
          { title: 'Gömme Dolap', value: 'Gömme Dolap' },
          { title: 'Parke Zemin', value: 'Parke Zemin' },
          { title: 'Seramik Zemin', value: 'Seramik Zemin' },
        ],
      },
    }),

    // ── SEO ──────────────────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'SEO Başlık',
      type: 'string',
      group: 'seo',
      description: 'Boş bırakırsanız ilan başlığı otomatik kullanılır. Önerilen: 50-60 karakter.',
      validation: (Rule) => Rule.max(60).warning('SEO başlığı 60 karakteri aşmamalıdır'),
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO Açıklama',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Google arama sonuçlarında görünecek açıklama. Önerilen: 150-160 karakter.',
      validation: (Rule) => Rule.max(160).warning('SEO açıklaması 160 karakteri aşmamalıdır'),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      listingType: 'listingType',
      propertyType: 'propertyType',
      city: 'city',
      district: 'district',
      price: 'price',
      currency: 'currency',
      media: 'coverImage',
      isPublished: 'isPublished',
      isFeatured: 'isFeatured',
    },
    prepare(selection) {
      const { title, listingType, propertyType, city, district, price, currency, media, isPublished, isFeatured } = selection
      const formattedPrice = price ? new Intl.NumberFormat('tr-TR').format(price) : '—'
      const statusBadge = !isPublished ? ' 🔴' : isFeatured ? ' ⭐' : ''
      return {
        title: `${title}${statusBadge}`,
        subtitle: `${listingType ?? '—'} • ${propertyType ?? '—'} • ${city ?? '—'}/${district ?? '—'} • ${formattedPrice} ${currency ?? 'TL'}`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'En Yeni İlanlar',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'En Eski İlanlar',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Fiyat Artan',
      name: 'priceAsc',
      by: [{ field: 'price', direction: 'asc' }],
    },
    {
      title: 'Fiyat Azalan',
      name: 'priceDesc',
      by: [{ field: 'price', direction: 'desc' }],
    },
    {
      title: 'Başlığa Göre (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
