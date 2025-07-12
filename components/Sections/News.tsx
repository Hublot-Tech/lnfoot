// NewsList.tsx
import { apiClient } from "@/app/api/api-client";
import { NewsArticleDto } from "@/app/api/generated";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { SectionTitle } from "../common/SectionTitle";
import Image from "next/image";

export const NewsCard: React.FC<{ news: NewsArticleDto }> = ({ news }) => (
  <Link
    href={`/news/${news.id}`}
    className="group flex flex-col overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer"
  >
    <div className="relative h-40 w-full sm:h-48">
      <Image
        fill
        src={news?.imageUrl ?? "/ln-icon.svg"}
        alt="Football News"
        className="object-cover object-center"
      />
    </div>
    <div className="flex flex-col gap-2 bg-white p-4">
      <p className="text-sm text-gray-500">
        {formatDate(news.publishedAt ?? new Date())}
      </p>
      <h3 className="text-lg font-semibold leading-tight group-hover:underline">
        {news.title}
      </h3>
      <p className="text-sm text-gray-700 line-clamp-2">{news.summary}</p>
    </div>
  </Link>
);

export default async function NewsList() {
  const [latestNews, ...news] = await apiClient.newsArticles.findAll();

  return (
    <section className="section bg-[#F1F0F0] p-6">
      <SectionTitle title="Actualités sportives" pageRef="/news" />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Main latest news */}
        <div className="lg:col-span-1">
          <div className="overflow-hidden rounded-lg bg-white shadow-lg">
            <Image
              fill
              src={latestNews?.imageUrl ?? "/ln-icon.svg"}
              alt="Latest News"
              className="h-60 w-full object-cover"
            />
            <div className="flex flex-col gap-2 p-5">
              <p className="text-sm text-gray-500">
                {formatDate(latestNews?.publishedAt ?? new Date())}
              </p>
              <h2 className="text-xl font-bold text-gray-800 hover:underline">
                <Link href={`/news/${latestNews?.id}`}>
                  {latestNews?.title}
                </Link>
              </h2>
              <p className="text-sm text-gray-700">{latestNews?.summary}</p>
            </div>
          </div>
        </div>

        {/* Secondary news */}
        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
          {news.slice(0, 4).map((article, i) => (
            <NewsCard key={i} news={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
