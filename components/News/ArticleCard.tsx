import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar' // Assuming you have an Avatar component
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { calculateReadingTime, formatReadingTime } from '@/lib/readingTime'
import { NewsArticleDto } from '@/app/api/generated'
import Image from 'next/image'

interface ArticleCardProps {
  article: NewsArticleDto
  isMain: boolean
}

export default function ArticleCard({ article, isMain }: ArticleCardProps) {
  const formatRelativeDate = (date: Date | null) => {
    if (!date) return ''
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: fr,
    })
  }

  if (isMain) {
    return (
      <Link href={`/news/${article.id}`} className='block group'>
        <div className='relative h-98 mb-4'>
          {article.imageUrl && (
            <Image
              src={article.imageUrl}
              alt={article.title ?? ''}
              layout='fill'
              objectFit='cover'
              className='rounded-lg'
            />
          )}
        </div>
        <div className='flex items-center justify-between text-sm text-gray-500 mb-2'>
          {article.sourceUrl && (
            <Avatar className='h-6 w-6 mr-2'>
              <AvatarImage
                src={article.sourceUrl}
                alt={article.authorName || 'Author'}
              />
              <AvatarFallback>
                {article.authorName?.substring(0, 1) || 'A'}
              </AvatarFallback>
            </Avatar>
          )}

          {article.publishedAt && <span className='mx-1'>&bull;</span>}
          <span className='self-end'>
            {formatRelativeDate(
              new Date(article.publishedAt ?? article.createdAt ?? Date.now())
            )}
          </span>
        </div>
        <h3 className='text-2xl max-w-xl font-semibold mb-2 text-primary group-hover:text-orange-500 transition-colors'>
          {article.title}
        </h3>
        {article.summary && (
          <p className='text-gray-600 mb-3 text-sm'>{article.summary}</p>
        )}

        <div className='text-xs text-gray-500'>
          <span>{article.authorName}</span>
          <span>LN FOOT</span>
          {article && <span className='mx-1'>&bull;</span>}
          <span>
            {formatReadingTime(calculateReadingTime(article.content))}
          </span>
        </div>
      </Link>
    )
  }

  // Smaller card variant
  return (
    <Link
      href={`/news/${article.id}`}
      className='block group border-b border-gray shadow bg-accent p-3'
    >
      <div className='flex items-center gap-4 p-2 hover:bg-gray-50'>
        {article.imageUrl && (
          <div className='relative w-24 h-24 flex-shrink-0'>
            <Image
              fill
              src={article.imageUrl}
              alt={article.title ?? ''}
              className='rounded-md object-cover w-full h-full'
            />
          </div>
        )}
        <div className='flex-grow min-w-0'>
          <h4 className='font-medium text-orange-500 mb-1 truncate'>
            {article.title}
          </h4>
          {article.summary && (
            <p className='text-sm text-gray-600 mb-2 line-clamp-2'>
              {article.summary}
            </p>
          )}
          <div className='flex items-baseline-last text-xs text-gray-500 gap-2'>
            {article.tags?.map((tag, i) => (
              <span key={i} className='font-medium'>
                {tag}
              </span>
            ))}
            <div className='flex flex-col items-center gap-1'>
              <span>
                {formatRelativeDate(
                  new Date(
                    article.publishedAt ?? article.createdAt ?? Date.now()
                  )
                )}
              </span>
            </div>
            {article.content && (
              <>
                <span>&bull;</span>
                <span>
                  {formatReadingTime(calculateReadingTime(article.content))}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
