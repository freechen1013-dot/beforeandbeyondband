import { defineField } from 'sanity'

export const locales = [
  { code: 'en', title: 'English' },
  { code: 'zhTW', title: '繁体中文' },
  { code: 'zhCN', title: '简体中文' },
  { code: 'ja', title: '日本語' },
  { code: 'ko', title: '한국어' },
  { code: 'fr', title: 'Français' },
  { code: 'de', title: 'Deutsch' },
] as const

export type LocaleCode = (typeof locales)[number]['code']

export function localizedString(name: string, title: string) {
  return defineField({
    name,
    title,
    type: 'object',
    fields: locales.map((l) =>
      defineField({
        name: l.code,
        title: l.title,
        type: 'string',
      })
    ),
    options: { collapsed: false },
  })
}

export function localizedText(name: string, title: string) {
  return defineField({
    name,
    title,
    type: 'object',
    fields: locales.map((l) =>
      defineField({
        name: l.code,
        title: l.title,
        type: 'text',
        rows: 3,
      })
    ),
    options: { collapsed: false },
  })
}
