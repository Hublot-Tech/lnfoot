import type { NewsArticleDto } from '@/app/api/generated'
import HeroCarousel from './hero-carousel'

export default async function Hero({
  mainArticle,
}: {
  mainArticle: NewsArticleDto
}) {
  return (
    <div className='w-full h-screen'>
      <HeroCarousel latestNews={mainArticle} />
    </div>
  )
}
