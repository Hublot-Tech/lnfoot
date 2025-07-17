import type { HighlightDto } from "@/app/api/generated";

export const PAGE_SIZE = 9

export interface HighlightInitialPageData {
  highlights: HighlightDto[]
  totalPages: number
  totalElements: number
  error: string | null
}