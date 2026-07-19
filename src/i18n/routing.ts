import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'zh-TW', 'zh-CN', 'ja', 'ko', 'fr', 'de'],
  defaultLocale: 'en',
})
