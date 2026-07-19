import { client } from './client'
import { createImageUrlBuilder } from '@sanity/image-url'

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export function localizedValue(obj: Record<string, string> | null | undefined, locale: string): string {
  if (!obj) return ''
  return obj[locale] || obj.en || ''
}

export async function sanityFetch<T>(query: string, params?: Record<string, string | number | boolean>): Promise<T> {
  return client.fetch<T>(query, params as any)
}
