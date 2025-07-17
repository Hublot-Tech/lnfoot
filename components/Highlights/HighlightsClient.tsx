'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { apiClient } from '@/app/api/api-client'
import { HighlightsSkeleton } from '@/components/ui/skeletons'
import { HighlightsGrid } from '@/components/Highlights/HighlightsGrid'
import type { HighlightDto, PageHighlightDto } from "@/app/api/generated"
import type { HighlightInitialPageData } from "@/app/highlights/types"



interface Props {
  initialData: HighlightInitialPageData
  initialPage: number
  pageSize: number
}

function filterAndSortHighlights(content: HighlightDto[] = []): HighlightDto[] {
  return content
    .filter(highlight => highlight.videoUrl)
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0)
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0)
      return dateB.getTime() - dateA.getTime()
    })
}

function ErrorDisplay({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="text-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        <h3 className="text-red-800 font-semibold mb-2">Erreur</h3>
        <p className="text-red-600">{error}</p>
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Aucun point fort disponible
        </h3>
        <p className="text-gray-600">
          Il ny a actuellement aucun point fort avec des vidéos à afficher.
        </p>
      </div>
    </div>
  )
}

function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  if (totalPages <= 1) return null

  return (
    <div className="mt-12 flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          currentPage === 0
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
        }`}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Précédent
      </button>
      
      <div className="flex items-center space-x-1">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              i === currentPage
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          currentPage === totalPages - 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
        }`}
      >
        Suivant
        <ChevronRight className="h-4 w-4 ml-1" />
      </button>
    </div>
  )
}

export function HighlightsClient({ initialData, initialPage, pageSize }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [loading, setLoading] = useState(false)
  const [highlights, setHighlights] = useState(initialData.highlights)
  const [totalPages, setTotalPages] = useState(initialData.totalPages)
  const [totalElements, setTotalElements] = useState(initialData.totalElements)
  const [error, setError] = useState(initialData.error)

  const updateURL = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page > 0) {
      params.set('page', page.toString())
    } else {
      params.delete('page')
    }
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const fetchHighlights = async (page: number) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiClient.highlights.findAll({
        page,
        size: pageSize
      })
      const data = response as PageHighlightDto

      setHighlights(filterAndSortHighlights(data?.content))
      setTotalPages(data?.totalPages || 0)
      setTotalElements(data?.totalElements || 0)
    } catch (err) {
      setError('Une erreur est survenue lors du chargement des points forts.')
      console.error('Error fetching highlights:', err)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages && newPage !== currentPage) {
      setCurrentPage(newPage)
      updateURL(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      fetchHighlights(newPage)
    }
  }

  if (error && !loading) {
    return <ErrorDisplay error={error} onRetry={() => fetchHighlights(currentPage)} />
  }

  if (loading) {
    return <HighlightsSkeleton />
  }

  if (highlights.length === 0) {
    return <EmptyState />
  }

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Points forts</h1>
        <p className="text-gray-600">
          {totalElements} {totalElements === 1 ? 'point fort' : 'points forts'} 
          {totalElements > 0 && ` • Page ${currentPage + 1} sur ${totalPages}`}
        </p>
      </div>
      
      <HighlightsGrid highlights={highlights} />
      
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}