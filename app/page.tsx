import Ads from '@/components/home/ads'
import GetApp from '@/components/home/get-app'
import LatestNews from '@/components/home/latest-news'
import LiveScores from '@/components/home/live-scores'
import HighlightsSection from '@/components/highlights/highlights-section'
import ShopCarousel from '@/components/home/shop-carousel'
import Hero from '@/components/home/hero'

import { apiClient } from '@/app/api/api-client'

async function getHighlights() {
  const data = await apiClient.highlights.findAll()

  // Trier par date de publication décroissante et limiter à 9 vidéos
  const highlights = data
    .filter((highlight) => highlight.videoUrl) // Filtrer uniquement les highlights avec des vidéos
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0)
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0)
      return dateB.getTime() - dateA.getTime()
    })
    .slice(0, 9)

  return highlights
}

export default async function Home() {
  const highlights = await getHighlights()

  // Fetch the latest news article
  return (
    <main className='min-h-screen justify-between'>
      <Hero />
      <LatestNews />
      <LiveScores />
      <HighlightsSection highlights={highlights} />
      <ShopCarousel />
      <Ads />
      <GetApp />
    </main>
  )
}
