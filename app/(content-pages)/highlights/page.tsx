import { apiClient } from '@/app/api/api-client'
import { HighlightsGallery } from '@/components/highlights/highlights-gallery'

export const metadata = {
  title: 'Temps forts',
}

export default async function HighlightsPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>
}) {
  const q = (await searchParams)?.q?.toLowerCase() ?? ''
  const highlights = await apiClient.highlights.findAll()

  const filtered = highlights.filter((highlight) =>
    q
      ? highlight.title?.toLowerCase().includes(q) ||
        highlight.description?.toLowerCase().includes(q)
      : true
  )

  return <HighlightsGallery highlights={filtered} />
}
