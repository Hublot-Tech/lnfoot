import Image from "next/legacy/image"
import { Dialog, DialogContent } from "@/components/motion-primitives/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Play } from "lucide-react"
import { apiClient } from "@/app/api/api-client"
import type { Highlight } from "@/app/api/types"
import { HighlightsClient } from "./PointsFortsClient"

export default async function PointsForts() {
  const data = await apiClient.highlights.findAll()
  
  // Trier par date de publication décroissante et limiter à 9 vidéos
  const highlights = data
    .filter(highlight => highlight.videoUrl) // Filtrer uniquement les highlights avec des vidéos
    .sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt) : new Date(0)
      const dateB = b.publishedAt ? new Date(b.publishedAt) : new Date(0)
      return dateB.getTime() - dateA.getTime()
    })
    .slice(0, 9)

  if (highlights.length === 0) {
    return null
  }

  return <HighlightsClient highlights={highlights} />
}
