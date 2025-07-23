import React from 'react'
import { apiClient } from '@/app/api/api-client'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'
import { Download } from 'lucide-react'
import Image from 'next/image'

import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const article = await apiClient.products.findOne((await params).id)

  if (!article) {
    return {
      title: 'Article non trouvé',
    }
  }

  return {
    title: article.name,
    description: article.description,
    openGraph: {
      title: article.name,
      description: article.description ?? '',
      images: [
        {
          url: article.imageUrl || '/placeholder.svg',
          width: 1200,
          height: 630,
          alt: article.name ?? '',
        },
      ],
    },
  }
}

export default async function ShopItem({ params }: PageProps) {
  const article = await apiClient.products.findOne((await params).id)

  if (!article) {
    notFound()
  }

  return (
    <div className='container mx-auto py-8 px-4 md:px-8'>
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Image section */}
        <div className='w-full lg:w-1/2'>
          <div className='relative'>
            <div className='relative aspect-square w-full bg-gray-100 rounded-lg overflow-hidden'>
              <Image
                fill
                src={article.imageUrl || '/placeholder.svg'}
                alt={article.description ?? ''}
                className='object-cover'
              />
            </div>

            {/* Navigation arrows */}
            <div className='absolute inset-0 flex items-center justify-between pointer-events-none'>
              <button className='w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow pointer-events-auto'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 19.5 8.25 12l7.5-7.5'
                  />
                </svg>
              </button>
              <button className='w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow pointer-events-auto'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m8.25 4.5 7.5 7.5-7.5 7.5'
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          <div className='flex gap-2 mt-4'>
            <div className='border-2 border-blue-500 rounded-sm p-0.5'>
              <div className='w-16 h-16 relative bg-gray-100'>
                <Image
                  fill
                  src={article.imageUrl || '/placeholder.svg'}
                  alt={article.name ?? ''}
                  className='object-cover'
                />
              </div>
            </div>
            <div className='border border-gray-200 rounded-sm p-0.5'>
              <div className='w-16 h-16 relative bg-gray-100'>
                <Image
                  fill
                  src={'/placeholder.svg'}
                  alt='Thumbnail'
                  className='object-cover'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product info section */}
        <div className='w-full lg:w-1/2 flex flex-col justify-center '>
          <h1 className='text-3xl font-bold mb-2'>{article.name}</h1>
          <div className='mb-6'>
            <span className='bg-blue-600 text-white px-4 py-1.5 rounded-full font-medium'>
              {article.price ? `${article.price} XAF` : '...'}
            </span>
          </div>

          <div className='mb-6'></div>

          <div className='mb-8'>
            <p className='text-gray-700'>
              {article.description ||
                'Fabric blend of Supima Cotton and Micromodal.'}
            </p>
          </div>

          <Button className='w-full flex items-center justify-center gap-2 bg-blue-700 text-white py-6 rounded-lg'>
            <Download className='w-5 h-5' />
            <a
              href='https://s3.ln-foot.com/app-releases/app-release.apk'
              download
            >
              Acheter sur l&lsquo;application
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
