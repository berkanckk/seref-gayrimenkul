import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import type { StructureBuilder } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemas'
import { env } from './src/sanity/env'
import {
  TagIcon,
  CogIcon,
  UsersIcon,
  EnvelopeIcon,
  HomeIcon,
} from './src/sanity/studioIcons'

/**
 * Singleton document IDs.
 * These document types have exactly one instance — they are not lists.
 */
const SINGLETONS = {
  siteSettings: 'siteSettings',
  aboutPage: 'aboutPage',
  contactPage: 'contactPage',
}

/**
 * Custom Studio structure.
 * - İlanlar → standard list view with create/filter
 * - Singletons → opens directly as a single document (no list)
 */
function customStructure(S: StructureBuilder) {
  return S.list()
    .title('Yönetim Paneli')
    .items([
      // ── İLANLAR ────────────────────────────────────────────
      S.listItem()
        .title('İlanlar')
        .icon(TagIcon)
        .child(
          S.list()
            .title('İlanlar')
            .items([
              S.listItem()
                .title('Tüm İlanlar')
                .icon(TagIcon)
                .child(
                  S.documentTypeList('property')
                    .title('Tüm İlanlar')
                    .defaultOrdering([
                      { field: 'publishedAt', direction: 'desc' },
                    ])
                ),
              S.listItem()
                .title('Satılık İlanlar')
                .icon(HomeIcon)
                .child(
                  S.documentTypeList('property')
                    .title('Satılık İlanlar')
                    .apiVersion(env.NEXT_PUBLIC_SANITY_API_VERSION)
                    .filter('_type == "property" && listingType == "Satılık"')
                    .defaultOrdering([
                      { field: 'publishedAt', direction: 'desc' },
                    ])
                ),
              S.listItem()
                .title('Kiralık İlanlar')
                .icon(HomeIcon)
                .child(
                  S.documentTypeList('property')
                    .title('Kiralık İlanlar')
                    .apiVersion(env.NEXT_PUBLIC_SANITY_API_VERSION)
                    .filter('_type == "property" && listingType == "Kiralık"')
                    .defaultOrdering([
                      { field: 'publishedAt', direction: 'desc' },
                    ])
                ),
              S.listItem()
                .title('Öne Çıkan İlanlar')
                .icon(TagIcon)
                .child(
                  S.documentTypeList('property')
                    .title('Öne Çıkan İlanlar')
                    .apiVersion(env.NEXT_PUBLIC_SANITY_API_VERSION)
                    .filter('_type == "property" && isFeatured == true')
                    .defaultOrdering([
                      { field: 'publishedAt', direction: 'desc' },
                    ])
                ),
              S.listItem()
                .title('Yayında Olmayanlar')
                .icon(TagIcon)
                .child(
                  S.documentTypeList('property')
                    .title('Yayında Olmayanlar')
                    .apiVersion(env.NEXT_PUBLIC_SANITY_API_VERSION)
                    .filter('_type == "property" && isPublished == false')
                    .defaultOrdering([
                      { field: 'publishedAt', direction: 'desc' },
                    ])
                ),
            ])
        ),

      S.divider(),

      // ── SITE SETTINGS SINGLETON ─────────────────────────────
      S.listItem()
        .title('Site Ayarları')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId(SINGLETONS.siteSettings)
            .title('Site Ayarları')
        ),

      // ── ABOUT PAGE SINGLETON ────────────────────────────────
      S.listItem()
        .title('Hakkımızda Sayfası')
        .icon(UsersIcon)
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId(SINGLETONS.aboutPage)
            .title('Hakkımızda Sayfası')
        ),

      // ── CONTACT PAGE SINGLETON ──────────────────────────────
      S.listItem()
        .title('İletişim Sayfası')
        .icon(EnvelopeIcon)
        .child(
          S.document()
            .schemaType('contactPage')
            .documentId(SINGLETONS.contactPage)
            .title('İletişim Sayfası')
        ),
    ])
}

export default defineConfig({
  basePath: '/studio',
  name: 'seref-gayrimenkul',
  title: 'Şeref Gayrimenkul',

  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,

  plugins: [
    structureTool({
      structure: customStructure,
    }),
    visionTool({
      defaultApiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
    }),
  ],

  schema: {
    types: schemaTypes,
    // Prevent singletons from appearing as creatable document types
    // in the "New document" dialog
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) =>
          !Object.values(SINGLETONS).includes(schemaType)
      ),
  },
})
