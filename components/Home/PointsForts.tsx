"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/motion-primitives/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Play } from "lucide-react"
import { apiClient } from "@/app/api/api-client"
import type { Highlight } from "@/app/api/types"

export default function PointsForts() {
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchHighlights = async () => {
      const data = await apiClient.highlights.findAll()
      // Trier par date de publication décroissante et limiter à 9 vidéos
      const sortedHighlights = data
        .sort((a, b) => {
          const dateA = a.publishedAt ? new Date(a.publishedAt) : new Date(0)
          const dateB = b.publishedAt ? new Date(b.publishedAt) : new Date(0)
          return dateB.getTime() - dateA.getTime()
        })
        .slice(0, 9)
      setHighlights(sortedHighlights)
    }

    fetchHighlights()
  }, [])

  // Fonction pour ouvrir la modale avec la vidéo sélectionnée
  const openVideoModal = (videoUrl: string | null) => {
    if (videoUrl) {
      // Extraire l'ID de la vidéo YouTube de l'URL
      const videoId = videoUrl.split("v=")[1]
      setSelectedVideo(videoId)
      setIsModalOpen(true)
    }
  }

  // Vidéo principale (la plus récente)
  const featuredVideo = highlights[0]
  // Reste des vidéos pour le carousel
  const carouselVideos = highlights.slice(1)

  if (highlights.length === 0) {
    return null // ou un composant de chargement
  }

  return (
    <div className="mx-auto py-8 px-4">
      {/* Vidéo principale */}
      {featuredVideo && (
        <div className="mb-8">
          <div
            className="relative aspect-video rounded-lg overflow-hidden border cursor-pointer group"
            onClick={() => openVideoModal(featuredVideo.videoUrl)}
          >
            <Image
              src={featuredVideo.thumbnailUrl || "/placeholder.svg"}
              alt={featuredVideo.title || ""}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white/90 rounded-full p-4">
                <Play className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-white text-lg font-medium">{featuredVideo.title}</h3>
              <p className="text-white/80 text-sm line-clamp-2">{featuredVideo.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Carousel de vidéos */}
      {carouselVideos.length > 0 && (
        <Carousel className="w-full">
          <CarouselContent>
            {carouselVideos.map((video) => (
              <CarouselItem key={video.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div
                  className="relative aspect-video rounded-lg overflow-hidden border cursor-pointer group"
                  onClick={() => openVideoModal(video.videoUrl)}
                >
                  <Image
                    src={video.thumbnailUrl || "/placeholder.svg"}
                    alt={video.title || ""}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 rounded-full p-3">
                      <Play className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <h3 className="text-white text-sm font-medium">{video.title}</h3>
                    <p className="text-white/80 text-xs line-clamp-1">{video.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      )}

      {/* Modal pour la lecture de vidéo */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[800px] p-0 bg-black">
          {selectedVideo && (
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
