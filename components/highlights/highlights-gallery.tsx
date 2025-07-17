'use client'

import { HighlightDto } from '@/app/api/generated'
import { HighlightCard } from './highlight-card'

interface HighlightsGalleryProps {
  highlights: HighlightDto[]
}

const HighlightsGallery = ({ highlights }: HighlightsGalleryProps) => {
  return (
    <section className='py-20 px-4 lg:px-24'>
      <div className=''>
        <div className='grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-3'>
          {highlights.map((highlight, index) => (
            <HighlightCard key={index} highlight={highlight} size='small' />
          ))}
        </div>
      </div>
    </section>
  )
}

export { HighlightsGallery }
