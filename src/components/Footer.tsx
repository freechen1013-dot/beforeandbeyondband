'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { FaInstagram, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  const t = useTranslations('nav')
  const f = useTranslations('footer')
  const params = useParams()
  const l = (params?.locale as string) || 'en'

  return (
    <footer className="bg-[#000030] border-t border-blue-900/50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <nav className="flex flex-wrap items-center gap-6">
            <Link href={`/${l}`} className="text-sm text-zinc-400 hover:text-white transition-colors">{t('home')}</Link>
            <Link href={`/${l}/about`} className="text-sm text-zinc-400 hover:text-white transition-colors">{t('about')}</Link>
            <Link href={`/${l}/shows`} className="text-sm text-zinc-400 hover:text-white transition-colors">{t('shows')}</Link>
            <Link href={`/${l}/blog`} className="text-sm text-zinc-400 hover:text-white transition-colors">{t('blog')}</Link>
            <Link href={`/${l}/contact`} className="text-sm text-zinc-400 hover:text-white transition-colors">{t('contact')}</Link>
          </nav>

          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/beforeandbeyondo/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-pink-400 transition-colors">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@BeforeandBeyondoffical" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-red-400 transition-colors">
              <FaYoutube className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-blue-900/30 text-center text-sm text-zinc-500 leading-relaxed">
          <p>Website design, construction & management: 瑞Rui</p>
          <p className="mt-1">This website was built with assistance from OpenCode AI agent powered by DeepSeek V4 Flash Free for coding and partial content writing.</p>
          <p className="mt-1">If you find any errors, please notify us!</p>
          <p className="mt-4">&copy; {new Date().getFullYear()} {f('credit')}. {f('copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
