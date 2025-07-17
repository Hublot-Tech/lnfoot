export const dynamic = 'force-dynamic'

import React, { Suspense } from 'react'
import { apiClient } from '@/app/api/api-client'
import type { AdvertisementDto } from '@/app/api/generated'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { isYouTubeUrl, getYouTubeEmbedUrl } from '@/lib/utils'

async function Ads() {
  const advertisements = await apiClient.advertisements.findAll()

  if (!advertisements.length) {
    return null
  }

  return (
    <section className='w-full my-8 px-4 lg:px-24 max-w-full'>
      <Suspense
        fallback={
          <div className='h-48 md:h-64 w-full bg-gray-200 animate-pulse rounded-lg' />
        }
      >
        <div className='grid grid-cols-1 gap-8  w-full'>
          {advertisements.map((ad) => (
            <AdCard key={ad.id} advertisement={ad} />
          ))}
        </div>
      </Suspense>
    </section>
  )
}

// Extend AdvertisementDto to support videoUrl (temporary until backend update)
type AdvertisementDtoWithVideo = AdvertisementDto & { videoUrl?: string }

function AdCard({ advertisement }: { advertisement: AdvertisementDtoWithVideo }) {
  const isYouTube = isYouTubeUrl(advertisement.videoUrl)
  const isVideo =
    advertisement.videoUrl && advertisement.videoUrl.length > 0 && !isYouTube

  return (
    <Link href={advertisement.referenceUrl || '#'} className='w-full'>
      <span className='w-full flex self-center text-foreground italic text-xs text-shadow-accent'>
        Publicité Partenaire
      </span>
      <div
        className='relative h-48 md:h-64 w-full overflow-hidden rounded-lg transition-transform hover:scale-[1.02] group shadow-md'
        style={
          !isVideo && !isYouTube
            ? {
                backgroundImage: `url(${advertisement.imageUrl || '/placeholder.svg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      >
        {/* Overlay to improve text visibility */}
        <div className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all'></div>

        {/* Media Content */}
        {isYouTube ? (
          <iframe
            src={getYouTubeEmbedUrl(advertisement.videoUrl!)}
            className='absolute inset-0 w-full h-full object-cover'
            allow='autoplay; encrypted-media'
            allowFullScreen
            title={advertisement.title || 'Publicité vidéo'}
          />
        ) : isVideo ? (
          <video
            src={advertisement.videoUrl}
            className='absolute inset-0 w-full h-full object-cover'
            autoPlay
            loop
            muted
            playsInline
            poster={advertisement.imageUrl || '/placeholder.svg'}
          />
        ) : null}

        {/* Content */}
        <div className='absolute inset-0 flex flex-col justify-end p-6 text-white'>
          <h3 className='text-xl md:text-2xl font-bold mb-2'>
            {advertisement.title}
          </h3>
          {advertisement.content && (
            <p className='text-sm md:text-base mb-4 max-w-2xl line-clamp-2'>
              {advertisement.content}
            </p>
          )}
          <Button
            variant='outline'
            className='self-start bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-black transition-all'
          >
            En savoir plus
          </Button>
        </div>
      </div>
    </Link>
  )
}

export default Ads
