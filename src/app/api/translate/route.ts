import { NextResponse } from 'next/server'

const DEEPL_API = 'https://api-free.deepl.com/v2/translate'

const localeToDeepL: Record<string, string> = {
  en: 'EN',
  'zh-TW': 'ZH',
  'zh-CN': 'ZH',
  ja: 'JA',
  ko: 'KO',
  fr: 'FR',
  de: 'DE',
}

export async function POST(request: Request) {
  const { text, sourceLocale, targetLocales } = await request.json()
  const apiKey = process.env.DEEPL_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'DEEPL_API_KEY not set' }, { status: 500 })
  }

  const source = localeToDeepL[sourceLocale] || 'EN'
  const results: Record<string, string> = {}

  for (const locale of targetLocales) {
    const target = localeToDeepL[locale]
    if (!target || locale === sourceLocale) {
      results[locale] = text
      continue
    }

    const res = await fetch(DEEPL_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        auth_key: apiKey,
        text,
        source_lang: source,
        target_lang: target,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      return NextResponse.json({ error: `DeepL error: ${err}` }, { status: 500 })
    }

    const data = await res.json()
    results[locale] = data.translations[0].text
  }

  return NextResponse.json(results)
}
