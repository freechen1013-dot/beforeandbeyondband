'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { sanityFetch, localizedValue } from '@/sanity/fetch'
import Link from 'next/link'

type Post = {
  _id: string
  title: Record<string, string>
  slug: { current: string }
  excerpt: Record<string, string>
  publishedAt: string
}

export default function BlogPage() {
  const t = useTranslations('blog')
  const params = useParams()
  const locale = (params?.locale as string) || 'en'
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    sanityFetch<Post[]>(
      `*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc){_id, title, slug, excerpt, publishedAt}`
    ).then(setPosts).catch(() => {})
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
      <p className="text-lg text-zinc-400 mb-12">{t('description')}</p>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-blue-800/40 rounded-xl bg-blue-900/10">
          <svg className="w-16 h-16 text-blue-700/50 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <p className="text-zinc-500 text-lg">{t('noPosts')}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/${locale}/blog/${post.slug.current}`}
              className="block border border-blue-900/40 rounded-lg p-6 bg-[#000060] hover:border-blue-500/50 transition-colors"
            >
              <h2 className="text-xl font-semibold mb-2">
                {localizedValue(post.title, locale)}
              </h2>
              {post.excerpt && (
                <p className="text-zinc-400 text-sm mb-2">
                  {localizedValue(post.excerpt, locale)}
                </p>
              )}
              {post.publishedAt && (
                <p className="text-xs text-zinc-500">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
