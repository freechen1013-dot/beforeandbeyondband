import { useTranslations } from 'next-intl'

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug } = await params
  const t = useTranslations('blog')

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">{slug}</h1>
      <p className="text-zinc-400">{t('description')}</p>
    </div>
  )
}
