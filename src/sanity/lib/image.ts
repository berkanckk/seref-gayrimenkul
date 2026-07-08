// ─────────────────────────────────────────────────────────────────────────────
// Şeref Gayrimenkul — Sanity Image URL Helpers
// ─────────────────────────────────────────────────────────────────────────────

import createImageUrlBuilder from '@sanity/image-url'
import { env } from '../env'
import type { SanityImage } from '@/types'

// ── Builder Instance ──────────────────────────────────────────────────────────

const builder = createImageUrlBuilder({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || '',
})

// Use a broad source type that the builder accepts — the asset object must
// have either _ref or url, which our SanityImage always provides.
type ImageSource = Parameters<typeof builder.image>[0]

/**
 * Returns an @sanity/image-url builder for the given source.
 * Chain additional transformations (.width(), .height(), .fit(), etc.) on the result.
 *
 * @example urlFor(property.coverImage).width(800).url()
 */
export function urlFor(source: ImageSource) {
  return builder.image(source)
}

// ── Convenience Helpers ───────────────────────────────────────────────────────

/**
 * Returns an optimised CDN URL string for a SanityImage.
 * Gracefully returns a placeholder URL when the image is null/undefined/invalid.
 *
 * @param image   — The SanityImage object from GROQ projection.
 * @param width   — Target display width in pixels (default: 800).
 * @param height  — Optional target height. Omit to preserve aspect ratio.
 * @param quality — JPEG quality 1-100 (default: 80).
 */
export function getImageUrl(
  image: SanityImage | null | undefined,
  width = 800,
  height?: number,
  quality = 80
): string {
  const fallbackH = height ?? Math.round(width * 0.667)
  if (!image?.asset) {
    return `https://placehold.co/${width}x${fallbackH}/F5F5F0/9CA3AF?text=Şeref+Gayrimenkul`
  }

  try {
    let b = urlFor(image as ImageSource)
      .width(width)
      .quality(quality)
      .auto('format')

    if (height) b = b.height(height)
    if (image.hotspot) b = b.fit('crop')

    return b.url()
  } catch {
    return `https://placehold.co/${width}x${fallbackH}/F5F5F0/9CA3AF?text=Görsel+Yok`
  }
}

// ── Dimension Helper ──────────────────────────────────────────────────────────

export interface ImageDimensions {
  readonly width: number
  readonly height: number
  readonly aspectRatio: number
}

/**
 * Extracts image dimensions from the Sanity asset metadata.
 * Returns 16:9 defaults when dimensions are unavailable.
 *
 * @param image — The SanityImage object containing asset.metadata.
 */
export function getImageDimensions(
  image: SanityImage | null | undefined
): ImageDimensions {
  const dims = image?.asset?.metadata?.dimensions
  if (dims?.width && dims?.height) {
    return {
      width: dims.width,
      height: dims.height,
      aspectRatio: dims.aspectRatio ?? dims.width / dims.height,
    }
  }
  // Default to 16:9
  return { width: 1200, height: 675, aspectRatio: 16 / 9 }
}

// ── Blur Placeholder ──────────────────────────────────────────────────────────

/**
 * Returns a tiny (20px wide) URL for use as next/image placeholder="blur".
 * Falls back to undefined when the image has no asset.
 *
 * @param image — The SanityImage object.
 */
export function getBlurDataUrl(
  image: SanityImage | null | undefined
): string | undefined {
  if (!image?.asset) return undefined
  try {
    return urlFor(image as ImageSource).width(20).quality(30).blur(10).url()
  } catch {
    return undefined
  }
}
