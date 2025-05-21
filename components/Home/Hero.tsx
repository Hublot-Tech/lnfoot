import { NewsArticle } from "@/app/api/types";
import HeroCarousel from "./HeroCarousel";
import { apiClient } from "@/app/api/api-client";

export default async function Hero() {
	const articles: NewsArticle[] = await apiClient.newsArticles.findAll()
	const mainArticle: NewsArticle = articles[0] || null; // Get the first article or null if none exist
	return (
		<div className="w-full h-screen">
			<HeroCarousel latestNews={mainArticle} />
		</div>
	);
}


