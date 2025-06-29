'use client'

import Link from 'next/link'
import Image from 'next/legacy/image'
import { Button } from '@/components/ui/button'
import { CarouselItem } from '@/components/ui/carousel'
import { apiClient } from '@/app/api/api-client'
import { useEffect, useState } from 'react'
import type { NewsArticleDto } from '@/app/api/generated'

export function CarouselArticle() {
  const [article, setArticle] = useState<NewsArticleDto | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articles = await apiClient.newsArticles.findAll('PUBLISHED')
        if (articles && articles.length > 0) {
          setArticle(articles[0])
        }
      } catch (error) {
        console.error('Error fetching article:', error)
      }
    }

    fetchData()
  }, [])

  if (!article) {
    return (
      <CarouselItem className='w-full'>
        <div className='relative flex flex-col items-center bg-white pb-10 pt-8'>
          <div className='container px-4'>
            <div className='h-[400px] w-full flex items-center justify-center'>
              <div className='animate-pulse bg-gray-200 h-full w-full rounded-xl' />
            </div>
          </div>
        </div>
      </CarouselItem>
    )
  }

  return (
    <CarouselItem className='w-full'>
      <div className='relative flex flex-col items-center bg-white pb-10 pt-8'>
        <div className='container px-4'>
          <h2 className='mb-4 text-center text-4xl font-bold sm:text-5xl'>
            {article.title}
          </h2>
          <p className='mx-auto mb-4 max-w-3xl text-center text-gray-700'>
            {article.summary || article.content?.slice(0, 200)}
          </p>
          <div className='mb-8 flex justify-center gap-4'>
            <span className='text-[#FF4B11]'>News</span>
            <span className='text-gray-400'>
              {new Date(
                article.publishedAt || article.createdAt!
              ).toLocaleDateString()}
            </span>
          </div>
          <div className='relative mx-auto h-[400px] w-full max-w-5xl overflow-hidden rounded-xl'>
            {article.imageUrl ? (
              <Image
                src={article.imageUrl}
                alt={article.title || ''}
                layout='fill'
                objectFit='cover'
                className='rounded-xl'
              />
            ) : (
              <div className='h-full w-full bg-gray-300' />
            )}
          </div>
          <div className='mt-8 flex justify-center'>
            <Button asChild className='bg-black hover:bg-gray-800'>
              <Link href={`/news/${article.id}`}>Read More</Link>
            </Button>
          </div>
        </div>
      </div>
    </CarouselItem>
  )
}
