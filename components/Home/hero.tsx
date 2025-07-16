import { apiClient } from "@/app/api/api-client";
import HeroCarousel from "./hero-carousel";

export default async function Hero() {
	const articles = await apiClient.newsArticles.findAll()
	const mainArticle = articles[0] ?? null;
	return (
		<div className="w-full h-screen">
			<HeroCarousel latestNews={mainArticle} />
		</div>
	);
}


