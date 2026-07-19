'use client'

import { useTranslations } from 'next-intl'

export default function AboutPage() {
  const t = useTranslations('about')

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-20">
      <h1 className="text-4xl md:text-5xl font-bold text-center">
        {t('title')}
      </h1>

      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">
          {t('mission')}
        </h2>
        <p className="text-zinc-300 text-lg leading-relaxed">
          {t('missionText')}
        </p>
      </section>

      <hr className="border-blue-900/50" />

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">
          {t('history')}
        </h2>
        <p className="text-zinc-300 text-lg leading-relaxed">
          {t('historyText')}
        </p>
      </section>

      <hr className="border-blue-900/50" />

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-blue-300">
          Performances
        </h2>
        <div className="space-y-4">
          <div className="border border-blue-900/40 rounded-lg p-5 bg-blue-950/20">
            <p className="text-zinc-500 text-sm mb-1">2025</p>
            <p className="text-white font-medium">TBD</p>
          </div>
          <div className="border border-blue-900/40 rounded-lg p-5 bg-blue-950/20">
            <p className="text-zinc-500 text-sm mb-1">2025</p>
            <p className="text-white font-medium">
              新北市耕莘醫院安康院區
            </p>
          </div>
        </div>
      </section>

      <hr className="border-blue-900/50" />

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">
          {t('members')}
        </h2>
        <p className="text-zinc-500 italic">{t('memberPlaceholder')}</p>
      </section>
    </div>
  )
}
