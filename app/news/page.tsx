export const dynamic = 'force-dynamic'

import { apiClient } from '@/app/api/api-client'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NewsCard } from '@/components/Sections/News'
import { ChevronRight } from 'lucide-react'
import { Suspense } from 'react'
import { ArticleGridSkeleton, ArticleSkeleton } from '@/components/ui/skeletons'
import Image from 'next/image'

// Nombre d'articles par page
const ITEMS_PER_PAGE = 6

export default async function NewsPage(props: {
  searchParams: Promise<{ page?: string }>
}) {
  const searchParams = await props.searchParams
  const currentPage = Number(searchParams.page) || 1

  return (
    <section className='min-h-screen bg-gray-50'>
      <div className='mx-auto max-w-7xl px-4 py-8'>
        {/* Breadcrumb */}
        <nav className='mb-6 text-sm'>
          <ul className='flex items-center space-x-1'>
            <li>
              <Link href='/' className='text-blue-600 hover:text-blue-800'>
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className='h-4' />
            </li>
            <li className='text-gray-600'>News</li>
          </ul>
        </nav>

        {/* Latest News */}
        <Suspense fallback={<ArticleSkeleton isLarge={true} />}>
          <LatestNewsArticle />
        </Suspense>

        {/* News Grid */}
        <Suspense fallback={<ArticleGridSkeleton count={6} />}>
          <NewsGrid currentPage={currentPage} />
        </Suspense>
      </div>
    </section>
  )
}

async function LatestNewsArticle() {
  const newsData = await apiClient.newsArticles.findAll()

  if (!newsData.length) {
    return notFound()
  }

  const latestNews = newsData[0]

  return (
    <article className='mb-12 rounded-lg bg-white p-6 shadow-npnd'>
      <h2 className='mb-6 text-3xl font-bold uppercase text-orange-400'>
        {latestNews?.title}
      </h2>
      <div className='aspect-video relative mb-6 overflow-hidden rounded-lg'>
        <Image
          width={0}
          height={0}
          className='h-full w-full object-cover'
          src={latestNews?.imageUrl ?? '/ln-icon.svg'}
          alt={latestNews?.title || 'Football News'} // Use article title for alt text
        />
      </div>
      <div className='space-y-4'>
        <p className='text-sm text-gray-500'>
          {formatDate(latestNews.publishedAt ?? new Date())}
        </p>
        {latestNews?.summary && (
          <p className='text-lg text-gray-700'>{latestNews.summary}</p>
        )}
      </div>
    </article>
  )
}

async function NewsGrid({ currentPage }: { currentPage: number }) {
  const newsData = await apiClient.newsArticles.findAll()

  if (!newsData.length) {
    return notFound()
  }

  const [, ...news] = newsData
  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedNews = news.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {paginatedNews.map((newsItem, i) => (
          <NewsCard key={i} news={newsItem} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='mt-8 flex justify-center space-x-2'>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={`/news?page=${page}`}
              className={`px-4 py-2 rounded ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
