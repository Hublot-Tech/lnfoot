'use client'

import { useRef } from 'react'
import type { ProductDto } from '@/app/api/generated'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

export function CarouselWithAutoplay({ articles }: { articles: ProductDto[] }) {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  // Si aucun article, afficher un message
  if (!articles || articles.length === 0) {
    return (
      <p className='text-center text-gray-500'>
        Aucun article disponible pour le moment
      </p>
    )
  }

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[autoplayPlugin.current]}
      className='w-full'
    >
      <CarouselContent>
        {articles.map((article) => (
          <CarouselItem
            key={article.id}
            className='sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4 pl-4'
          >
            <Link href={`/shop/${article.id}`}>
              <Card className='overflow-hidden transition-all hover:shadow-lg'>
                <div className='relative h-52 w-full overflow-hidden'>
                  {article.imageUrl ? (
                    <Image
                      fill
                      src={article.imageUrl}
                      alt={article.name ?? ''}
                      className='h-full w-full object-cover transition-all hover:scale-105'
                    />
                  ) : (
                    <div className='h-full w-full bg-slate-200 flex items-center justify-center'>
                      <span className='text-slate-400'>Aucune image</span>
                    </div>
                  )}
                </div>
                <CardContent className='p-4'>
                  <h3 className='font-bold text-lg mb-2 line-clamp-1'>
                    {article.name}
                  </h3>
                  {article.description && (
                    <p className='text-sm text-gray-600 line-clamp-2'>
                      {article.description}
                    </p>
                  )}
                  <div className='mt-4 flex justify-between items-center'>
                    <span className='font-bold text-orange-500'>
                      {article.price || 'Prix non disponible'}
                    </span>
                    <span className='text-sm inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full'>
                      Acheter
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
