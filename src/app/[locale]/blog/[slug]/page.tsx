import { sanityFetch, localizedValue, urlFor } from '@/sanity/fetch'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'

type Post = {
  title: Record<string, string>
  content: any[]
  excerpt: Record<string, string>
  publishedAt: string
  author: string
  coverImage: any
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params
  const t = useTranslations('blog')

  const post = await sanityFetch<Post | null>(
    `*[_type == "blogPost" && slug.current == $slug][0]{title, content, excerpt, publishedAt, author, coverImage}`,
    { slug }
  )

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-zinc-400">{t('description')}</p>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">
        {localizedValue(post.title, locale)}
      </h1>
      <div className="flex items-center gap-4 text-sm text-zinc-500 mb-8">
        {post.author && <span>{post.author}</span>}
        {post.publishedAt && (
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
        )}
      </div>
      {post.coverImage && (
        <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden">
          <Image
            src={urlFor(post.coverImage).width(1200).url()}
            alt={localizedValue(post.title, locale)}
            fill
            className="object-cover"
          />
        </div>
      )}
      {post.content ? (
        <div className="prose prose-invert max-w-none">
          <PortableText value={post.content} />
        </div>
      ) : (
        <p className="text-zinc-500">{localizedValue(post.excerpt, locale)}</p>
      )}
    </article>
  )
}
