import {useCallback, useState} from 'react'
import {useClient} from 'sanity'
import {useDocumentOperation} from 'sanity'

const localeKeys = ['en', 'zhTW', 'zhCN', 'ja', 'ko', 'fr', 'de']

function findSource(obj: Record<string, string>): string | null {
  for (const k of localeKeys) {
    if (obj[k]?.trim()) return k
  }
  return null
}

export function TranslateAction(props: any) {
  const client = useClient({apiVersion: '2024-01-01'})
  const [loading, setLoading] = useState(false)

  const onHandle = useCallback(async () => {
    setLoading(true)
    try {
      const doc = props.draft || props.published
      if (!doc || !doc._id) return

      const patches: Record<string, any> = {}

      for (const key of Object.keys(doc)) {
        const val = doc[key]
        if (!val || typeof val !== 'object') continue
        if (!localeKeys.some((l) => l in val)) continue

        const src = findSource(val)
        if (!src) continue
        const text = val[src]
        const targets = localeKeys.filter((l) => l !== src && !val[l]?.trim())
        if (targets.length === 0) continue

        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({text, sourceLocale: src, targetLocales: targets}),
        })
        const data = await res.json()
        if (data.error) throw new Error(data.error)

        for (const t of targets) {
          if (data[t]) val[t] = data[t]
        }
        patches[key] = val
      }

      if (Object.keys(patches).length > 0) {
        const tx = client.transaction()
        for (const [key, value] of Object.entries(patches)) {
          tx.patch(doc._id, (p: any) => p.set({[key]: value}))
        }
        await tx.commit()
      }
    } catch (err: any) {
      console.error('Translate error:', err)
    } finally {
      setLoading(false)
      props.onComplete()
    }
  }, [props.draft, props.published, props.onComplete, client])

  return {
    label: loading ? 'Translating…' : '🌐 Auto-Translate',
    onHandle,
    disabled: loading,
  }
}
