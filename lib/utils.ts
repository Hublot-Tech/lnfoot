import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (
  date: Date | string | number | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  },
) => {
  if (!date) {
    return ''
  }

  let dateObject: Date

  if (date instanceof Date) {
    dateObject = date
  } else {
    dateObject = new Date(date)
  }

  if (isNaN(dateObject.getTime())) {
    return ''
  }

  return dateObject.toLocaleDateString('fr', options)
}

export const isYouTubeUrl = (url?: string | null) => {
  return !!url?.includes('youtube.com') || !!url?.includes('youtu.be')
}

export function getYouTubeEmbedUrl(url: string): string {
  try {
    const parsedUrl = new URL(url)
    if (parsedUrl.hostname.includes('youtu.be')) {
      return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`
    }
    const videoId = parsedUrl.searchParams.get('v')
    return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
  } catch {
    return ''
  }
}
