'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { FaInstagram, FaYoutube } from 'react-icons/fa'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const slides = [
  '/IMG_3092.JPG',
  '/IMG_20250420_101511.JPEG',
  '/IMG_3084.jpg',
  '/IMG_3086.jpg',
]

export default function HomePage() {
  const t = useTranslations('home')
  const params = useParams()
  const locale = (params?.locale as string) || 'en'
  const [current, setCurrent] = useState(0)

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1))
  }, [])

  const next = useCallback(() => {
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1))
  }, [])

  useEffect(() => {
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [next])

  return (
    <div className="flex flex-col">
      {/* Hero Carousel */}
      <section className="relative h-screen w-full overflow-hidden">
        {slides.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <Image
              src={src}
              alt={`Slide ${i + 1}`}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur text-white hover:bg-white/20 transition-all"
          aria-label="Previous slide"
        >
          <HiChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur text-white hover:bg-white/20 transition-all"
          aria-label="Next slide"
        >
          <HiChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === current ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-white mb-4 tracking-tight">
            {t('heroTitle')}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-200/90 max-w-2xl leading-relaxed font-light">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Band Intro */}
      <section className="relative py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed mb-10">
            {t('bandIntro')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/shows`}
              className="inline-flex items-center gap-2 bg-secondary hover:bg-medium-blue text-white px-7 py-3 rounded-full font-medium transition-all shadow-lg shadow-blue-900/30 hover:shadow-blue-700/40 hover:scale-105"
            >
              {t('viewShows')}
            </Link>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/beforeandbeyondo/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 text-zinc-300 hover:bg-pink-600 hover:text-white transition-all"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@BeforeandBeyondoffical"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 text-zinc-300 hover:bg-red-600 hover:text-white transition-all"
                aria-label="YouTube"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Era Summary */}
      <section className="relative py-28 px-4 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <span className="block text-7xl sm:text-8xl md:text-9xl font-black text-blue-400/20 leading-none mb-6 select-none">
            340+
          </span>
          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-10">
            {t('eraSummary')}
          </p>
          <Link
            href={`/${locale}/shows`}
            className="inline-flex items-center gap-2 border border-blue-400/40 text-blue-300 hover:bg-blue-400/10 px-7 py-3 rounded-full font-medium transition-all"
          >
            {t('viewShows')}
          </Link>
        </div>
      </section>

      {/* Latest Blog */}
      <section className="relative py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
            {t('latestBlog')}
          </h2>
          <div className="bg-[#000060]/50 border border-blue-900/40 rounded-xl p-10 text-center">
            <p className="text-zinc-500 text-lg">Coming soon...</p>
          </div>
          <div className="mt-8 text-center">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              {t('viewAll')}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
