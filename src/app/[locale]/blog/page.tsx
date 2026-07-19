'use client'

import { useTranslations } from 'next-intl'

export default function BlogPage() {
  const t = useTranslations('blog')

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
      <p className="text-lg text-zinc-400 mb-12">{t('description')}</p>

      <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-blue-800/40 rounded-xl bg-blue-900/10">
        <svg
          className="w-16 h-16 text-blue-700/50 mb-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <p className="text-zinc-500 text-lg">{t('noPosts')}</p>
      </div>
    </div>
  )
}
