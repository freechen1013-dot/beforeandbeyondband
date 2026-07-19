'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { sanityFetch, urlFor, localizedValue } from '@/sanity/fetch'
import Image from 'next/image'

type Member = {
  _id: string
  name: string
  bio: Record<string, string>
  instrument: Record<string, string>
  photo: any
}

export default function AboutPage() {
  const t = useTranslations('about')
  const params = useParams()
  const locale = (params?.locale as string) || 'en'
  const [members, setMembers] = useState<Member[]>([])

  useEffect(() => {
    sanityFetch<Member[]>(`*[_type == "member"]{_id, name, bio, instrument, photo}`)
      .then(setMembers)
      .catch(() => {})
  }, [])

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
        <h2 className="text-2xl font-semibold mb-6 text-blue-300">
          {t('members')}
        </h2>
        {members.length === 0 ? (
          <p className="text-zinc-500 italic">{t('memberPlaceholder')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {members.map((m) => (
              <div key={m._id} className="flex gap-4 bg-[#000060] rounded-lg p-4 border border-blue-900/40">
                {m.photo && (
                  <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 bg-[#000080]">
                    <Image
                      src={urlFor(m.photo).width(80).height(80).url()}
                      alt={m.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold">{m.name}</h3>
                  <p className="text-sm text-blue-300">{localizedValue(m.instrument, locale)}</p>
                  <p className="text-sm text-zinc-400 mt-1">{localizedValue(m.bio, locale)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
