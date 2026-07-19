'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { HiGlobeAlt } from 'react-icons/hi'

const locales = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'zh-TW', label: '繁中', flag: '🇹🇼' },
  { code: 'zh-CN', label: '简中', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
]

export default function Header() {
  const t = useTranslations('nav')
  const params = useParams()
  const locale = (params?.locale as string) || 'en'
  const [langOpen, setLangOpen] = useState(false)

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/shows', label: t('shows') },
    { href: '/blog', label: t('blog') },
    { href: '/contact', label: t('contact') },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#000040]/90 backdrop-blur border-b border-blue-900/50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <Image src="/logo-horizontal.png" alt="Before and Beyond" width={160} height={40} className="h-8 w-auto" priority />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors p-2"
          >
            <HiGlobeAlt className="w-5 h-5" />
          </button>

          {langOpen && (
            <div className="absolute right-0 top-full mt-1 bg-[#000060] border border-blue-800 rounded-lg shadow-xl py-1 min-w-[120px]">
              {locales.map((l) => (
                <Link
                  key={l.code}
                  href={`/${l.code}`}
                  className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-blue-900/50 transition-colors ${
                    locale === l.code ? 'text-blue-300' : 'text-zinc-300'
                  }`}
                  onClick={() => setLangOpen(false)}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
