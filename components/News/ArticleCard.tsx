import Image from "next/legacy/image";
import Link from 'next/link';
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
        <div className="relative h-98 mb-4">
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

          {article.publishedAt && <span className="mx-1">&bull;</span>}
          <span className="self-end">{formatRelativeDate(article.publishedAt || article.createdAt)}</span>
        </div>
        <h3 className="text-2xl max-w-xl font-semibold mb-2 text-primary group-hover:text-orange-500 transition-colors">
          {article.title}
        </h3>
        {article.summary && (
          <p className="text-gray-600 mb-3 text-sm">
            {article.summary}
          </p>
        )}

        <div className="text-xs text-gray-500">
          <span>{article.source}</span>
          <span>LN FOOT</span>
          {article && <span className="mx-1">&bull;</span>}
          <span>{formatReadingTime(calculateReadingTime(article.content))}</span>
        </div>
      </Link>
    );
  }

  // Smaller card variant
  return (
    <Link href={`/news/${article.id}`} className="block group border-b border-gray shadow bg-accent p-3">
      <div className="flex items-center gap-4 p-2 hover:bg-gray-50">
        {article.imageUrl && (
          <div className="relative w-24 h-24 flex-shrink-0">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="rounded-md object-cover w-full h-full"
            />
          </div>
        )}
        <div className="flex-grow min-w-0">
          <h4 className="font-medium text-orange-500 mb-1 truncate">
            {article.title}
          </h4>
          {article.summary && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {article.summary}
            </p>
          )}
          <div className="flex items-baseline-last text-xs text-gray-500 gap-2">
            {article.category && <span className="font-medium">{article.category}</span>}
            <div className="flex flex-col items-center gap-1">
              <span>{formatRelativeDate(article.publishedAt || article.createdAt)}</span>
            </div>
            {article.content && (
              <>
                <span>&bull;</span>
                <span>{formatReadingTime(calculateReadingTime(article.content))}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
