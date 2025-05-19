import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge'; // Assuming you have a Badge component
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Assuming you have an Avatar component

// Define a type for the article object based on the image and typical article structures
// You might need to adjust this based on the actual structure of `apiClient.ecommerceArticles.findAll()`
type Article = {
  id: string | number;
  title: string;
  imageUrl?: string;
  category?: string; // e.g., "FIBA News", "CNN News"
  authorName?: string;
  authorImageUrl?: string;
  publishedAt?: string; // e.g., "8 minutes ago"
  readTime?: string; // e.g., "15 min read"
  description?: string;
  source?: string; // e.g., "NBA Global Games"
};

interface ArticleCardProps {
  article: Article;
  isMain: boolean;
}

export default function ArticleCard({ article, isMain }: ArticleCardProps) {
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
        <div className="flex items-center text-sm text-gray-500 mb-2">
          {article.authorImageUrl && (
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={article.authorImageUrl} alt={article.authorName || 'Author'} />
              <AvatarFallback>{article.authorName?.substring(0, 1) || 'A'}</AvatarFallback>
            </Avatar>
          )}
          <span>{article.authorName}</span>
          {article.publishedAt && <span className="mx-1">&bull;</span>}
          <span>{article.publishedAt}</span>
        </div>
        <h3 className="text-2xl font-semibold mb-2 group-hover:text-orange-500 transition-colors">
          {article.title}
        </h3>
        {article.description && (
          <p className="text-gray-600 mb-3 text-sm">
            {article.description}
          </p>
        )}
        <div className="text-xs text-gray-500">
          <span>{article.source}</span>
          {article.readTime && <span className="mx-1">&bull;</span>}
          <span>{article.readTime}</span>
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
          {article.category && (
            <div className="flex items-center text-xs text-gray-500 mb-1">
                {/* You might want to add a small icon for the category source like in the image */}
                {/* For now, just displaying the category text */}
                <span className="font-semibold mr-1">{article.category}</span>
                {article.publishedAt && <span className="mx-1">&bull;</span>}
                <span>{article.publishedAt}</span>
            </div>
          )}
          <h4 className="font-semibold group-hover:text-orange-500 transition-colors">
            {article.title}
          </h4>
          <div className="text-xs text-gray-500 mt-1">
            <span>{article.source}</span>
            {article.readTime && <span className="mx-1">&bull;</span>}
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
