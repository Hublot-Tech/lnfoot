import { apiClient } from "@/app/api/api-client";
import HeroCarousel from "./HeroCarousel";

export default async function Hero() {
	const articles = await apiClient.newsArticles.findAll()
	const mainArticle = articles[0] ?? null;
	return (
		<div className="w-full h-screen">
			<HeroCarousel latestNews={mainArticle} />
		</div>
	);
}


