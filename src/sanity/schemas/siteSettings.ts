import { defineType, defineField } from 'sanity'
import { CogIcon } from '../studioIcons'

/**
 * siteSettings — Site Ayarları (Singleton)
 * Tüm site genelinde kullanılan şirket, iletişim, sosyal medya ve SEO bilgileri.
 * Bu belge listeli değil, tek bir doküman olarak yönetilir.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Ayarları',
  type: 'document',
  icon: CogIcon,

  groups: [
    {
      name: 'company',
      title: 'Şirket Bilgileri',
      default: true,
    },
    {
      name: 'contact',
      title: 'İletişim',
    },
    {
      name: 'social',
      title: 'Sosyal Medya',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],

  fields: [
    // ── ŞİRKET BİLGİLERİ ─────────────────────────────────────
    defineField({
      name: 'companyName',
      title: 'Şirket Adı',
      type: 'string',
      group: 'company',
      description: 'Şirketin tam ticari adı.',
      initialValue: 'Şeref Gayrimenkul',
      validation: (Rule) => Rule.required().error('Şirket adı zorunludur'),
    }),

    defineField({
      name: 'ownerName',
      title: 'Sahip / Yetkili',
      type: 'string',
      group: 'company',
      description: 'Şirket sahibi veya sorumlu kişinin adı.',
      initialValue: 'Şeref İnce',
    }),

    defineField({
      name: 'yearEstablished',
      title: 'Kuruluş Yılı',
      type: 'number',
      group: 'company',
      description: 'Şirketin kuruluş yılı. "X yıllık deneyim" gibi ifadelerde kullanılır.',
      validation: (Rule) => Rule.min(1900).max(new Date().getFullYear()).integer(),
    }),

    defineField({
      name: 'logo',
      title: 'Logo (Açık Zemin)',
      type: 'image',
      group: 'company',
      description: 'Açık (beyaz/gri) arka plan üzerinde kullanılan logo. PNG önerilir.',
      options: { hotspot: false },
    }),

    defineField({
      name: 'logoDark',
      title: 'Logo (Koyu Zemin)',
      type: 'image',
      group: 'company',
      description: 'Koyu (lacivert/siyah) arka plan üzerinde kullanılan logo. PNG önerilir.',
      options: { hotspot: false },
    }),

    defineField({
      name: 'tagline',
      title: 'Slogan',
      type: 'string',
      group: 'company',
      description: 'Şirketin kısa sloganı. Örn: "İnegöl\'ün Güvenilir Gayrimenkul Danışmanı"',
    }),

    defineField({
      name: 'shortDescription',
      title: 'Kısa Açıklama',
      type: 'text',
      rows: 4,
      group: 'company',
      description: 'Footer ve hakkımızda bölümlerinde kullanılacak 2-4 cümlelik tanıtım metni.',
    }),

    // ── İLETİŞİM ─────────────────────────────────────────────
    defineField({
      name: 'phone1',
      title: 'Telefon 1',
      type: 'string',
      group: 'contact',
      description: 'Birincil telefon numarası. Örn: 0533 518 7357',
      initialValue: '0533 518 7357',
      validation: (Rule) => Rule.required().error('En az bir telefon numarası zorunludur'),
    }),

    defineField({
      name: 'phone1Label',
      title: 'Telefon 1 Etiketi',
      type: 'string',
      group: 'contact',
      description: 'Telefon 1\'in sahibi veya etiketi. Örn: "Şeref İnce"',
      initialValue: 'Şeref İnce',
    }),

    defineField({
      name: 'phone2',
      title: 'Telefon 2',
      type: 'string',
      group: 'contact',
      description: 'İkincil telefon numarası. Örn: 0533 276 0329',
      initialValue: '0533 276 0329',
    }),

    defineField({
      name: 'phone2Label',
      title: 'Telefon 2 Etiketi',
      type: 'string',
      group: 'contact',
      description: 'Telefon 2\'nin sahibi veya etiketi. Örn: "Can İnce"',
      initialValue: 'Can İnce',
    }),

    defineField({
      name: 'whatsapp1',
      title: 'WhatsApp 1',
      type: 'string',
      group: 'contact',
      description: 'WhatsApp numarası — uluslararası formatta, başında 90, boşluk ve tire olmadan. Örn: 905335187357',
      initialValue: '905335187357',
    }),

    defineField({
      name: 'whatsapp2',
      title: 'WhatsApp 2',
      type: 'string',
      group: 'contact',
      description: 'İkinci WhatsApp numarası — uluslararası formatta. Örn: 905332760329',
      initialValue: '905332760329',
    }),

    defineField({
      name: 'email',
      title: 'E-posta',
      type: 'string',
      group: 'contact',
      description: 'Genel iletişim e-posta adresi.',
      validation: (Rule) =>
        Rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).warning('Geçerli bir e-posta adresi giriniz'),
    }),

    defineField({
      name: 'address',
      title: 'Adres',
      type: 'text',
      rows: 3,
      group: 'contact',
      description: 'Şirketin tam posta adresi. Footer ve iletişim sayfasında gösterilir.',
      initialValue: 'Sinanbey, Kanal Sk. No:14 D:E, 16400 İnegöl/Bursa',
    }),

    defineField({
      name: 'city',
      title: 'İlçe',
      type: 'string',
      group: 'contact',
      description: 'Şirketin bulunduğu ilçe.',
      initialValue: 'İnegöl',
    }),

    defineField({
      name: 'province',
      title: 'İl',
      type: 'string',
      group: 'contact',
      description: 'Şirketin bulunduğu il.',
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
    }),

    defineField({
      name: 'workingHours',
      title: 'Çalışma Saatleri',
      type: 'string',
      group: 'contact',
      description: 'Çalışma saatlerini giriniz. Örn: Pazartesi - Cumartesi: 09:00 - 19:00',
      initialValue: 'Pazartesi - Cumartesi: 09:00 - 19:00',
    }),

    defineField({
      name: 'mapEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
      group: 'contact',
      description: 'Google Maps embed URL\'i. Google Maps → Paylaş → Haritayı Göm → Bağlantıyı kopyala seçeneğiyle alınır. "src=" kısmındaki URL\'yi yapıştırın.',
    }),

    // ── SOSYAL MEDYA ─────────────────────────────────────────
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
      group: 'social',
      description: 'Instagram profil linki. Örn: https://www.instagram.com/serefgayrimenkul',
    }),

    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
      group: 'social',
      description: 'Facebook sayfa linki.',
    }),

    defineField({
      name: 'twitter',
      title: 'Twitter / X',
      type: 'url',
      group: 'social',
      description: 'Twitter/X profil linki.',
    }),

    defineField({
      name: 'youtube',
      title: 'YouTube',
      type: 'url',
      group: 'social',
      description: 'YouTube kanal linki.',
    }),

    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
      group: 'social',
      description: 'LinkedIn şirket sayfası linki.',
    }),

    defineField({
      name: 'tiktok',
      title: 'TikTok',
      type: 'url',
      group: 'social',
      description: 'TikTok profil linki.',
    }),

    // ── SEO ──────────────────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'Site SEO Başlık',
      type: 'string',
      group: 'seo',
      description: 'Ana sayfanın tarayıcı sekmesinde ve Google\'da görünen başlık. Önerilen: 50-60 karakter.',
      initialValue: 'Şeref Gayrimenkul - İnegöl / Bursa',
      validation: (Rule) => Rule.max(60).warning('60 karakteri aşmamalıdır'),
    }),

    defineField({
      name: 'seoDescription',
      title: 'Site SEO Açıklama',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Ana sayfanın Google arama sonuçlarında görünen açıklaması. Önerilen: 150-160 karakter.',
      validation: (Rule) => Rule.max(160).warning('160 karakteri aşmamalıdır'),
    }),

    defineField({
      name: 'seoImage',
      title: 'Site SEO Görseli',
      type: 'image',
      group: 'seo',
      description: 'Sosyal medyada paylaşımlarda görünen kapak görseli (Open Graph). Önerilen boyut: 1200x630px.',
      options: { hotspot: true },
    }),

    defineField({
      name: 'footerText',
      title: 'Footer Alt Yazısı',
      type: 'text',
      rows: 2,
      group: 'seo',
      description: 'Sitenin en altında görünen telif hakkı veya ek bilgi metni. Örn: "© 2024 Şeref Gayrimenkul. Tüm hakları saklıdır."',
    }),
  ],

  preview: {
    select: {
      title: 'companyName',
    },
    prepare({ title }) {
      return {
        title: title ?? 'Site Ayarları',
        subtitle: 'Genel Site Ayarları',
      }
    },
  },
})
