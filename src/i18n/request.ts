import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !['en', 'zh-TW', 'zh-CN', 'ja', 'ko', 'fr', 'de'].includes(locale)) {
    locale = 'en'
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
