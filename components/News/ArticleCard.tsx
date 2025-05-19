import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge'; // Assuming you have a Badge component
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Assuming you have an Avatar component
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { calculateReadingTime, formatReadingTime } from '@/lib/readingTime';

// Define a type for the article object based on the image and typical article structures
// You might need to adjust this based on the actual structure of `apiClient.ecommerceArticles.findAll()`
type Article = {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  apiSource: string | null;
  title: string;
  category?: string; // e.g., "NBA Global Games"
  publishedAt: Date | null;
  content: string | null;
  summary: string | null;
  imageUrl: string | null;
  sourceUrl: string | null;
  apiArticleId: string | null;
  authorName?: string; // e.g., "John Doe"
  authorImageUrl?: string; // e.g., "https://example.com/author.jpg"
  source?: string; // e.g., "NBA Global Games"
};

interface ArticleCardProps {
  article: Article;
  isMain: boolean;
}

export default function ArticleCard({ article, isMain }: ArticleCardProps) {
  const formatRelativeDate = (date: Date | null) => {
    if (!date) return '';
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: fr
    });
  };

  if (isMain) {
    return (
      <Link href={`/news/${article.id}`} className="block group">
        <div className="relative aspect-video mb-4">
          {article.imageUrl && (
            <Image
              src={article.imageUrl}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          )}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          {article.apiSource && (
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={article.authorImageUrl} alt={article.authorName || 'Author'} />
              <AvatarFallback>{article.authorName?.substring(0, 1) || 'A'}</AvatarFallback>
            </Avatar>
          )}
          <span>LN FOOT</span>
          {article.publishedAt && <span className="mx-1">&bull;</span>}
          <span>{formatRelativeDate(article.publishedAt || article.createdAt)}</span>
        </div>
        <h3 className="text-2xl font-semibold mb-2 text-primary group-hover:text-orange-500 transition-colors">
          {article.title}
        </h3>
        {article.summary && (
          <p className="text-gray-600 mb-3 text-sm">
            {article.summary}
          </p>
        )}

        <div className="text-xs text-gray-500">
          <span>{article.source}</span>
          {article && <span className="mx-1">&bull;</span>}
          <span>{formatReadingTime(calculateReadingTime(article.content))}</span>
        </div>
      </Link>
    );
  }

  // Smaller card variant
  return (
    <Link href={`/news/${article.id}`} className="block group">
      <div className="flex gap-4">
        {article.imageUrl && (
          <div className="w-1/3 relative aspect-square">
            <Image
              src={article.imageUrl}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        )}
        <div className="w-2/3">
          {article.summary && (
            <div className="flex items-center text-xs text-gray-500 mb-1">
              <span className="font-semibold mr-1">{article.category}</span>
              {article.publishedAt && <span className="mx-1">&bull;</span>}
              <span>{formatRelativeDate(article.publishedAt || article.createdAt)}</span>
            </div>
          )}
          <h4 className="font-semibold group-hover:text-orange-500 transition-colors">
            {article.title}
          </h4>
          <p>
            {article.summary?.slice(0, 100)}{article.summary && article.summary.length > 100 ? '...' : ''}
          </p>
          <div className="text-xs text-gray-500 mt-1">
            <span>{article.source}</span>
            {article &&
              <>
                <span className="mx-1">&bull;</span>
                <span>{formatReadingTime(calculateReadingTime(article.content))}</span>
              </>}
          </div>
        </div>
      </div>
    </Link>
  );
}
