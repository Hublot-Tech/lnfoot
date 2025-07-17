import HighlightsSection from '@/components/highlights/highlights-section'
import Ads from '@/components/home/ads'
import GetApp from '@/components/home/get-app'
import Hero from '@/components/home/hero'
import LatestNews from '@/components/home/latest-news'
import LiveScores from '@/components/home/live-scores'
import ShopCarousel from '@/components/home/shop-carousel'


export default async function Home() {
  return (
    <main className='min-h-screen justify-between'>
      <Hero />
      <LatestNews />
      <LiveScores />
      <HighlightsSection />
      <ShopCarousel />
      <Ads />
      <GetApp />
    </main>
  )
}
