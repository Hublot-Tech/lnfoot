import React, { Suspense } from "react";
import { NewsArticle } from "@/app/api/types";

type HeroSectionProps = {
	latestNews?: NewsArticle;
};

const HeroSection: React.FC<HeroSectionProps> = ({ latestNews }) => {
	const backgroundImage = latestNews?.imageUrl ?? "/hero-image.png";

	return (
		<Suspense fallback={<div className="h-screen w-full bg-orange-200 animate-pulse" />}>
			<section
				id="hero-section"
				className="relative h-screen w-full bg-cover bg-center text-white"
				style={{ backgroundImage: `url('${backgroundImage}')` }}
			>
				<div className="absolute inset-0 bg-black/30" />

				<div className="relative z-10 flex h-full w-full flex-col justify-between px-6 py-8 sm:px-12 md:px-20 lg:px-32">

					<div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
						<h2 className="text-3xl font-bold uppercase leading-tight sm:text-4xl md:text-5xl w-full max-w-3xl">
							{latestNews?.title}
						</h2>

						{latestNews && (
							<a
								href={`/news/${latestNews.id}`}
								className="mt-4 inline-block rounded-lg bg-[#F3653D] px-6 py-3 text-base font-semibold transition hover:bg-[#F3653D]/90"
							>
								En savoir plus
							</a>
						)}
					</div>
				</div>
			</section>
		</Suspense>
	);
};

export default HeroSection;
