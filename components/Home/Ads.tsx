import React, { Suspense } from 'react'
import { apiClient } from '@/app/api/api-client'
import { Advertisement } from '@/app/api/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

async function Ads() {
  const advertisements = await apiClient.advertisements.findAll()

  if (!advertisements.length) {
    return null
  }
  return (
    <section className="w-full my-8 px-4 lg:px-24 max-w-full">
      <Suspense fallback={<div className="h-48 md:h-64 w-full bg-gray-200 animate-pulse rounded-lg" />}>
        <div className="grid grid-cols-1 gap-8  w-full">
          {advertisements.map((ad) => (
            <AdCard key={ad.id} advertisement={ad} />
          ))}
        </div>
      </Suspense>
    </section>
  )
}

function AdCard({ advertisement }: { advertisement: Advertisement }) {
  return (
    <Link href={advertisement.referenceUrl || '#'} className="w-full">
      <span className='w-full flex self-center text-foreground italic text-xs text-shadow-accent'>Publicité Partenaire</span>
      <div
        className="relative h-48 md:h-64 w-full overflow-hidden rounded-lg transition-transform hover:scale-[1.02] group shadow-md"
        style={{
          backgroundImage: `url(${advertisement.imageUrl || '/placeholder.svg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay to improve text visibility */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <h3 className="text-xl md:text-2xl font-bold mb-2">{advertisement.title}</h3>
          {advertisement.description && (
            <p className="text-sm md:text-base mb-4 max-w-2xl line-clamp-2">{advertisement.description}</p>
          )}
          <Button
            variant="outline"
            className="self-start bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-black transition-all"
          >
            En savoir plus
          </Button>
        </div>
      </div>
    </Link>
  )
}

export default Ads
