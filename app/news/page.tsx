export const dynamic = "force-dynamic";

import { apiClient } from "@/app/api/api-client";
import { formatDate } from "@/lib/utilities";
import Link from "next/link";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { NewsCard } from "@/components/Sections/news";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Removed unused useState import

// Nombre d'articles par page
const ITEMS_PER_PAGE = 6;

export default async function NewsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const newsData = await apiClient.newsArticles.findAll();
  const currentPage = Number(searchParams.page) || 1;

  if (!newsData.length) {
    return notFound();
  }

  const [latestNews, ...news] = newsData;
  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNews = news.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ul className="flex items-center space-x-1">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                Home
              </Link>
            </li>
            <li><ChevronRight className="h-4"/></li>
            <li className="text-gray-600">News</li>
          </ul>
        </nav>

        {/* Latest News */}
        <article className="mb-12 rounded-lg bg-white p-6 shadow-npnd">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">
            {latestNews?.title}
          </h2>
          <div className="aspect-video relative mb-6 overflow-hidden rounded-lg">
            <img
              className="h-full w-full object-cover"
              src={latestNews?.imageUrl ?? "/ln-icon.svg"}
              alt={latestNews?.title || "Football News"} // Use article title for alt text
            />
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              {latestNews && formatDate(latestNews.publishedAt ?? new Date())}
            </p>
            {latestNews?.summary && ( // Add a check for summary
              <p className="text-lg text-gray-700">{latestNews.summary}</p>
            )}
          </div>
        </article>

        {/* News Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginatedNews.map((newsItem, i) => (
            <NewsCard key={i} news={newsItem} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`/news?page=${page}`}
                className={`px-4 py-2 rounded ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
