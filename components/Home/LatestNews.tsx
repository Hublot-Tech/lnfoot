import {apiClient} from "@/app/api/api-client";
import ArticleCard from "@/components/News/ArticleCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default async function LatestNews() {
  const articles = await apiClient.newsArticles.findAll();

  const mainArticle = articles?.[0];
  const otherArticles = articles?.slice(1, 4);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 lg:px-24">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl text-orange-500 font-bold">Latest news</h2>
          <a href="/news" className="text-orange-500 hover:text-orange-600">
            See more &rarr;
          </a>
        </div>

        {/* Main Article */}
        {mainArticle && (
          <div className="mb-8">
            <ArticleCard article={mainArticle} isMain={true} />
          </div>
        )}
        
        {/* Carousel d'articles */}
        {otherArticles && otherArticles.length > 0 && (
          <div className="mt-8">
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {otherArticles.map((article) => (
                  <CarouselItem key={article.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <ArticleCard article={article} isMain={false} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-end gap-2 mt-4">
                <CarouselPrevious className="position-static" />
                <CarouselNext className="position-static" />
              </div>
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
}
