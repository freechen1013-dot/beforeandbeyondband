import { useCallback, useState } from 'react'
import { useClient } from 'sanity'

const localeNames: Record<string, string> = {
  en: 'English', zhTW: '繁体中文', zhCN: '简体中文',
  ja: '日本語', ko: '한국어', fr: 'Français', de: 'Deutsch',
}

function findSourceValue(obj: Record<string, string>): { locale: string; value: string } | null {
  for (const locale of ['en', 'zhTW', 'zhCN', 'ja', 'ko', 'fr', 'de']) {
    if (obj[locale]?.trim()) return { locale, value: obj[locale] }
  }
  return null
}

export function TranslateAction(props: any) {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [loading, setLoading] = useState(false)

  const onHandle = useCallback(async () => {
    setLoading(true)
    try {
      const doc = props.draft || props.published
      if (!doc) return

      const patches: Record<string, any> = {}

      for (const key of Object.keys(doc)) {
        const val = doc[key]
        if (!val || typeof val !== 'object') continue
        if (!('en' in val) && !('zhTW' in val)) continue

        const source = findSourceValue(val)
        if (!source) continue
        const { locale: sourceLocale, value: text } = source

        const targets = Object.keys(val).filter(
          (l) => l !== sourceLocale && !val[l]?.trim()
        )
        if (targets.length === 0) continue

        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text,
            sourceLocale,
            targetLocales: targets,
          }),
        })
        const data = await res.json()
        if (data.error) throw new Error(data.error)

        const fieldPatch: Record<string, string> = {}
        for (const t of targets) {
          if (data[t]) fieldPatch[t] = data[t]
        }
        patches[`${key}`] = { ...val, ...fieldPatch }
      }

      if (Object.keys(patches).length > 0) {
        const tx = client.transaction()
        for (const [key, value] of Object.entries(patches)) {
          tx.patch(doc._id, (p: any) => p.set({ [key]: value }))
        }
        await tx.commit()
      }
    } catch (err: any) {
      console.error('Translation failed:', err)
    } finally {
      setLoading(false)
      props.onComplete()
    }
  }, [props.draft, props.published, client, props.onComplete])

  return {
    label: loading ? 'Translating…' : '🌐 Auto-Translate',
    onHandle,
    disabled: loading,
  }
}
