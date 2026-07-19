import { client } from './client'
import { createImageUrlBuilder } from '@sanity/image-url'

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

const localeMap: Record<string, string> = {
  'zh-TW': 'zhTW', 'zhTW': 'zhTW',
  'zh-CN': 'zhCN', 'zhCN': 'zhCN',
  'en': 'en', 'ja': 'ja', 'ko': 'ko', 'fr': 'fr', 'de': 'de',
}

export function localizedValue(obj: Record<string, string> | null | undefined, locale: string): string {
  if (!obj) return ''
  const key = localeMap[locale] || locale
  return obj[key] || obj.en || ''
}

export async function sanityFetch<T>(query: string, params?: Record<string, string | number | boolean>): Promise<T> {
  return client.fetch<T>(query, params as any)
}
