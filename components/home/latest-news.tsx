import { NewsArticleDto } from '@/app/api/generated'
import ArticleCard from '@/components/news/article-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ArticleSkeleton } from '@/components/ui/skeletons'
import Link from 'next/link'
import { Suspense } from 'react'

export default function LatestNews({
  articles,
}: {
  articles: NewsArticleDto[]
}) {
  return (
    <section className='py-8'>
      <div className='mx-auto px-4 lg:px-24'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-3xl uppercase text-orange-500 font-bold'>
            Actualités
          </h2>
          <Link href='/news' className='text-orange-500 hover:text-orange-600'>
            Voir plus &rarr;
          </Link>
        </div>

        <Suspense fallback={<ArticleSkeleton isLarge={true} />}>
          <LatestNewsContent articles={articles} />
        </Suspense>
      </div>
    </section>
  )
}

async function LatestNewsContent({ articles }: { articles: NewsArticleDto[] }) {
  const mainArticle = articles?.[0]
  const otherArticles = articles?.slice(1, 4)
  return (
    <>
      {/* Main Article */}
      {mainArticle && (
        <div className='mb-8'>
          <ArticleCard article={mainArticle} isMain={true} />
        </div>
      )}

      {/* Carousel d'articles */}
      {!!otherArticles?.length && (
        <div className='mt-8'>
          <Carousel className='w-full'>
            <CarouselContent className='-ml-2 md:-ml-4'>
              {otherArticles.map((article) => (
                <CarouselItem
                  key={article.id}
                  className='pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3'
                >
                  <ArticleCard article={article} isMain={false} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className='flex justify-end gap-2 mt-4'>
              <CarouselPrevious className='position-static' />
              <CarouselNext className='position-static' />
            </div>
          </Carousel>
        </div>
      )}
    </>
  )
}
