import { apiClient } from '@/app/api/api-client'
import { HighlightsGallery } from '@/components/highlights/highlights-gallery'
import { type Metadata } from 'next'

type HighlightsPageProps = {
  searchParams?: {
    q?: string
  }
}

export const metadata: Metadata = {
  title: 'Temp Forts',
}

export default async function HighlightsPage({ searchParams }: HighlightsPageProps) {
  const query = searchParams?.q?.toLowerCase() ?? ''

  // Fetch all highlights
  const allHighlights = await apiClient.highlights.findAll()

  // Filter by search query (basic text match)
  const filteredHighlights = query
    ? allHighlights.filter((highlight) =>
        highlight.title?.toLowerCase().includes(query) ||
        highlight.description?.toLowerCase().includes(query)
      )
    : allHighlights

  return (
    <>
      {/* Search form */}
      <form method='get' className='m-2 h-12 w-full'>
        <label className='input flex items-center gap-1 border-gray-300'>
          <svg
            className='h-[1em] opacity-50'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <g
              strokeLinejoin='round'
              strokeLinecap='round'
              strokeWidth='2.5'
              fill='none'
              stroke='currentColor'
            >
              <circle cx='11' cy='11' r='8' />
              <path d='m21 21-4.3-4.3' />
            </g>
          </svg>
          <input
            type='search'
            name='q'
            placeholder='Search'
            defaultValue={query}
            className='w-full'
          />
        </label>
      </form>

      {/* Filtered results */}
      <HighlightsGallery highlights={filteredHighlights} />
    </>
  )
}
