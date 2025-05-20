"use client";

import React from "react";
import {
	Carousel,
	CarouselContent,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { CarouselSport } from "./CarouselSlides/CarouselSport";
import { CarouselArticle } from "./CarouselSlides/CarouselArticle";
import { CarouselShop } from "./CarouselSlides/CarouselShop";

const CAROUSEL_SLIDES = [
	{ id: 'sport', Component: CarouselSport },
	{ id: 'article', Component: CarouselArticle },
	{ id: 'shop', Component: CarouselShop },
];

export default function Hero() {
	const plugin = React.useRef(
		Autoplay({
			delay: 5000,
			stopOnInteraction: false,
			stopOnMouseEnter: false,
		})
	);

	return (
		<main className="relative flex h-screen w-full items-center justify-center overflow-hidden">
			<Carousel
				className="w-full"
				opts={{
					loop: true,
					align: "start",
				}}
				plugins={[plugin.current]}
			>
				<CarouselContent>
					{CAROUSEL_SLIDES.map(({ id, Component }) => (
						<Component key={id} />
					))}
				</CarouselContent>
				<div className="absolute bottom-4 right-4 z-20 flex gap-2">
					<CarouselPrevious className="bg-white/20 text-white hover:bg-white/40" />
					<CarouselNext className="bg-white/20 text-white hover:bg-white/40" />
				</div>
			</Carousel>
		</main>
	);
}