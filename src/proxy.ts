import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'zh-TW', 'zh-CN', 'ja', 'ko', 'fr', 'de']
const defaultLocale = 'en'

function getLocale(request: NextRequest): string {
  const acceptLang = request.headers.get('accept-language')
  if (!acceptLang) return defaultLocale

  for (const locale of locales) {
    if (acceptLang.startsWith(locale)) return locale
  }
  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!_next|studio|api|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|mp4|webm|ogg)).*)'],
}
