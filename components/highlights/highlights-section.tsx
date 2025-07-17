import type { HighlightDto } from '@/app/api/generated'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Link from 'next/link'
import { HighlightCard } from './highlight-card'

interface HighlightsSectionProps {
  highlights: HighlightDto[]
}

export default function HighlightsSection({
  highlights,
}: HighlightsSectionProps) {
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
          <Link href='/highlights' className='text-orange-500 hover:text-orange-600'>
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
                  {/* <HighlightCard highlight={video} size='small' /> */}
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
