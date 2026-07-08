import type { SchemaTypeDefinition } from 'sanity'
import { property } from './property'
import { siteSettings } from './siteSettings'
import { aboutPage } from './aboutPage'
import { contactPage } from './contactPage'
import { blockContent } from './blockContent'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Reusable types (referenced by other schemas)
  blockContent,

  // Document types
  property,
  siteSettings,
  aboutPage,
  contactPage,
]
