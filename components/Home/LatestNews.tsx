import {apiClient} from "@/app/api/api-client";
import ArticleCard from "@/components/News/ArticleCard"; // Assuming ArticleCard will be in components/News

export default async function LatestNews() {
  const articles = await apiClient.ecommerceArticles.findAll();

  // Assuming the API returns an array of articles.
  // We'll take the main article and three smaller ones as in the image.
  const mainArticle = articles?.[0];
  const otherArticles = articles?.slice(1, 4);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Latest news</h2>
          <a href="/news" className="text-orange-500 hover:text-orange-600">
            See more &rarr;
          </a>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {mainArticle && (
            <div className="lg:col-span-1">
              <ArticleCard article={mainArticle} isMain={true} />
            </div>
          )}
          {otherArticles && otherArticles.length > 0 && (
            <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {otherArticles.map((article) => (
                <ArticleCard key={article.id} article={article} isMain={false} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
