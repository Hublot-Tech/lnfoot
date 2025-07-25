export const dynamic = 'force-dynamic'

import { apiClient } from '@/app/api/api-client'
import { calculateReadingTime, formatReadingTime } from '@/lib/reading-time'
import { formatDate } from '@/lib/utils'
import DOMPurify from 'isomorphic-dompurify'
import { Clock } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface NewsPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { id } = await params
  const article = await apiClient.newsArticles.findOne(id)

  if (!article) {
    return {
      title: 'Article non trouvé',
      description: "L'article que vous cherchez n'existe pas ou a été déplacé.",
    }
  }

  const metadata: Metadata = {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary ?? '',
      type: 'article',
      publishedTime: article.publishedAt
        ? new Date(article.publishedAt).toISOString()
        : undefined,
      url: `/news/${article.id}`,
      images: [
        {
          url: article.imageUrl ?? '/default-image.jpg',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  }

  return metadata
}

export default async function NewsPage({ params }: NewsPageProps) {
  const latestNews = await apiClient.newsArticles.findOne((await params).id)
  if (!latestNews) {
    notFound()
  }
  // Récupérer les articles récents pour le sidebar et la section "Plus d'articles"
  const allNews = await apiClient.newsArticles.findAll()

  // Exclure l'article courant des articles récents
  const recentArticles = allNews
    .filter((article) => article.id !== (latestNews?.id || ''))
    .slice(0, 4)

  // Articles supplémentaires pour la section du bas
  const moreArticles = allNews
    .filter(
      (article) =>
        article.id !== (latestNews?.id || '') &&
        !recentArticles.map((a) => a.id).includes(article.id)
    )
    .slice(0, 4)

  // Calculer le temps de lecture
  const readingTime = calculateReadingTime(latestNews.content)
  const formattedReadingTime = formatReadingTime(readingTime)

  return (
    <>
      {/* Main content with sidebar layout */}
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        {/* Main article content */}
        <div className='lg:col-span-2'>
          <div className='rounded-lg bg-white p-6 shadow-md'>
            <h1 className='mb-4 text-2xl text-primary font-bold uppercase leading-tight md:text-3xl'>
              {latestNews?.title}
            </h1>

            <div className='mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-600'>
              <span>{formatDate(latestNews.createdAt ?? new Date())}</span>
              <span className='flex items-center'>
                <Clock className='mr-1 h-4 w-4' />
                {formattedReadingTime}
              </span>
            </div>

            <Image
              height={0}
              width={350}
              className='h-auto w-full rounded-lg object-cover'
              src={latestNews?.imageUrl ?? '/ln-icon.svg'}
              alt='Football News'
            />

            {latestNews.summary && (
              <div className='mb-6'>
                <p className='text-lg font-medium text-gray-800'>
                  {latestNews.summary}
                </p>
              </div>
            )}
            <div className='prose max-w-none'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(latestNews.content ?? ''),
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Sidebar with recent articles */}
        <div className='lg:col-span-1'>
          <div className='rounded-lg bg-white p-6 shadow-md'>
            <h2 className='mb-6 border-b border-gray-200 pb-2 text-xl text-secondary font-bold'>
              Articles Récents
            </h2>
            <div className='space-y-6'>
              {recentArticles.map((article, index) => (
                <div
                  key={article.id}
                  className={`flex gap-4 ${index < recentArticles.length - 1 ? 'border-b border-gray-100 pb-4' : ''}`}
                >
                  <Image
                    width={96}
                    height={80}
                    src={article.imageUrl ?? '/ln-icon.svg'}
                    alt={article.title ?? ''}
                    className='rounded object-cover'
                  />
                  <div>
                    <h3 className='font-medium line-clamp-2'>
                      <Link
                        href={`/news/${article.id}`}
                        className='hover:text-blue-600'
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <p className='mt-1 text-sm text-gray-500'>
                      {formatDate(article.createdAt ?? new Date())}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* More articles section */}
      <div className='mt-12'>
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>Plus d&lsquo;articles</h2>
          <Link href='/news' className='text-blue-600 hover:underline'>
            Voir tout →
          </Link>
        </div>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {moreArticles.map((article) => (
            <div
              key={article.id}
              className='overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg'
            >
              <Link href={`/news/${article.id}`} className='block'>
                <div className='relative h-48 w-full'>
                  <Image
                    fill
                    src={article.imageUrl ?? '/ln-icon.svg'}
                    alt={article.title ?? ''}
                    className='object-cover'
                  />
                </div>
                <div className='p-4'>
                  <p className='mb-1 text-sm text-gray-500'>
                    {formatDate(article.publishedAt ?? new Date())}
                  </p>
                  <h3 className='mb-2 font-semibold line-clamp-2'>
                    {article.title}
                  </h3>
                  {article.summary && (
                    <p className='text-sm text-gray-600 line-clamp-2'>
                      {article.summary}
                    </p>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
