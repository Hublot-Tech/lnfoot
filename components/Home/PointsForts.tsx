import { apiClient } from "@/app/api/api-client"
import { HighlightsClient } from "./PointsFortsClient"
import { Suspense } from "react"
import { HighlightsSkeleton } from "@/components/ui/skeletons"

export default function PointsForts() {
  return (
    <Suspense fallback={<HighlightsSkeleton />}>
      <PointsFortsContent />
    </Suspense>
  )
}

async function PointsFortsContent() {
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
