'use client'

import { useState } from 'react'
import Image from 'next/legacy/image'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/motion-primitives/dialog'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Play } from 'lucide-react'
import type { HighlightDto } from '@/app/api/generated'
import { getYouTubeEmbedUrl, isYouTubeUrl } from '@/lib/utils'
import Link from 'next/link'

interface HighlightsClientProps {
  highlights: HighlightDto[]
}

export function HighlightsClient({ highlights }: HighlightsClientProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Fonction pour ouvrir la modale avec la vidéo sélectionnée
  const openVideoModal = (videoUrl: string | null | undefined) => {
    if (videoUrl && isYouTubeUrl(videoUrl)) {
      setSelectedVideo(getYouTubeEmbedUrl(videoUrl))
      setIsModalOpen(true)
    }
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
        <Link href='/gallery' className='text-orange-500 hover:text-orange-600'>
          voir plus &rarr;
        </Link>
      </div>
      {/* Vidéo principale */}
      {featuredVideo && (
        <div className='mb-8'>
          <div
            className='relative aspect-video rounded-lg overflow-hidden border cursor-pointer group'
            onClick={() => openVideoModal(featuredVideo.videoUrl)}
          >
            <Image
              src={featuredVideo.thumbnailUrl ?? '/placeholder.svg'}
              alt={featuredVideo.title ?? ''}
              layout='fill'
              objectFit='cover'
              className='transition-transform group-hover:scale-105'
            />
            <div className='absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity'>
              <div className='bg-white/90 rounded-full p-4'>
                <Play className='h-8 w-8 text-red-600' />
              </div>
            </div>
            <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4'>
              <h3 className='text-white text-lg font-medium'>
                {featuredVideo.title}
              </h3>
              <p className='text-white/80 text-sm line-clamp-2'>
                {featuredVideo.description}
              </p>
            </div>
          </div>
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
                <div
                  className='relative aspect-video rounded-lg overflow-hidden border cursor-pointer group'
                  onClick={() => openVideoModal(video.videoUrl)}
                >
                  <Image
                    src={video.thumbnailUrl || '/placeholder.svg'}
                    alt={video.title || ''}
                    layout='fill'
                    objectFit='cover'
                    className='transition-transform group-hover:scale-105'
                  />
                  <div className='absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <div className='bg-white/90 rounded-full p-3'>
                      <Play className='h-6 w-6 text-red-600' />
                    </div>
                  </div>
                  <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3'>
                    <h3 className='text-white text-sm font-medium'>
                      {video.title}
                    </h3>
                    <p className='text-white/80 text-xs line-clamp-1'>
                      {video.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='left-0' />
          <CarouselNext className='right-0' />
        </Carousel>
      )}

      {/* Modal pour la lecture de vidéo */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='sm:max-w-[800px] p-0 bg-black'>
          <DialogTitle className='sr-only'>Lecteur Vidéo</DialogTitle>
          {selectedVideo && (
            <div className='aspect-video w-full'>
              <iframe
                src={`${selectedVideo}?autoplay=1`}
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                className='w-full h-full'
              ></iframe>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
