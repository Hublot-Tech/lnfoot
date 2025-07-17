import { apiClient } from '@/app/api/api-client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Link from 'next/link'
import { HighlightCard } from './highlight-card'


export default async function HighlightsSection() {
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

  if (!highlights || highlights.length === 0) {
    return null
  }

  // Vidéo principale (la plus récente)
  const featuredVideo = highlights[0]
  // Reste des vidéos pour le carousel
  const carouselVideos = highlights.slice(1)

  return (
    <div className='mx-auto py-20 px-4 lg:px-24'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-3xl uppercase text-orange-500 font-bold'>
          POINTS FORTS
        </h2>
        <Link
          href='/highlights'
          className='text-orange-500 hover:text-orange-600'
        >
          voir plus &rarr;
        </Link>
      </div>
      {/* Vidéo principale */}
      {featuredVideo && (
        <div className='mb-8'>
          <HighlightCard highlight={featuredVideo} size='large' />
        </div>
      )}

      {/* Carousel de vidéos */}
      {carouselVideos.length > 0 && (
        <Carousel className='w-full'>
          <CarouselContent>
            {carouselVideos.map((video) => (
              <CarouselItem
                key={video.id}
                className='sm:basis-1/2 md:basis-1/3 lg:basis-1/4'
              >
                <HighlightCard highlight={video} size='small' />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='left-0' />
          <CarouselNext className='right-0' />
        </Carousel>
      )}
    </div>
  )
}
