'use client'

import type { HighlightDto } from '@/app/api/generated'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/motion-primitives/dialog'
import {
  getYouTubeEmbedUrl,
  getYouTubeThumbnailUrl,
  isYouTubeUrl,
} from '@/lib/utils'
import { Play } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface HighlightCardProps {
  highlight: HighlightDto
  size: 'small' | 'large'
}

export function HighlightCard({ highlight, size }: HighlightCardProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fonction pour ouvrir la modale avec la vidéo sélectionnée
  const openVideoModal = (videoUrl?: string) => {
    if (videoUrl && isYouTubeUrl(videoUrl)) {
      setSelectedVideo(getYouTubeEmbedUrl(videoUrl))
      setIsModalOpen(true)
    }
  }

  const imageSizeClass = size === 'small' ? 'h-6 w-6' : 'h-8 w-8'
  const titleSizeClass = size === 'small' ? 'text-sm' : 'text-lg'
  const descriptionSizeClass =
    size === 'small' ? 'text-xs line-clamp-1' : 'text-sm line-clamp-2'
  const paddingSize = size === 'small' ? 'p-3' : 'p-4'

  return (
    <>
      <div
        className='relative aspect-video rounded-lg overflow-hidden border cursor-pointer group'
        onClick={() => openVideoModal(highlight.videoUrl)}
      >
        <Image
          src={
            highlight.thumbnailUrl ??
            getYouTubeThumbnailUrl(highlight.videoUrl ?? '') ??
            '/placeholder.svg'
          }
          alt={highlight.title ?? ''}
          fill
          style={{ objectFit: 'cover' }}
          className='transition-transform group-hover:scale-105'
        />
        <div className='absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity'>
          <div className='bg-white/90 rounded-full p-3'>
            <Play className={`${imageSizeClass} text-red-600`} />
          </div>
        </div>
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent ${paddingSize}`}
        >
          <h3 className={`text-white ${titleSizeClass} font-medium`}>
            {highlight.title}
          </h3>
          <p className={`text-white/80 ${descriptionSizeClass}`}>
            {highlight.description}
          </p>
        </div>
      </div>

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
    </>
  )
}
