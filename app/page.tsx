import HighlightsSection from '@/components/highlights/highlights-section'
import Ads from '@/components/home/ads'
import GetApp from '@/components/home/get-app'
import Hero from '@/components/home/hero'
import LatestNews from '@/components/home/latest-news'
import LiveScores from '@/components/home/live-scores'
import ShopCarousel from '@/components/home/shop-carousel'
import { apiClient } from './api/api-client'

export default async function Home() {
  const articles = await apiClient.newsArticles.findAll()
  const mainArticle =
    articles.find((a) => a.isMajorUpdate) ?? articles[0] ?? null

  return (
    <main className='min-h-screen justify-between'>
      <Hero mainArticle={mainArticle} />
      <LatestNews articles={articles} />
      <LiveScores />
      <HighlightsSection />
      <ShopCarousel />
      <Ads />
      <GetApp />
    </main>
  )
}
