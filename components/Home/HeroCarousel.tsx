'use client';
import HeroSection from "./CarouselSlides/HeroSection";
import { NewsArticle } from "@/app/api/types";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"; // Import CarouselContent and CarouselItem
import { HeroOne } from "./CarouselSlides/HeroOne";
import Hero from "../Shop/Hero";


type HeroCarouselProps = {
	latestNews?: NewsArticle;
};

// Carousel component with autoplay functionality
const autoplayPlugin = Autoplay({ delay: 5000, stopOnInteraction: true }); // Renamed to avoid conflict if Autoplay is also a component


const HeroCarousel: React.FC<HeroCarouselProps> = ({ latestNews }) => {
	return (
		<Carousel
			className="w-full h-screen overflow-hidden"
			plugins={[autoplayPlugin]}
			opts={{
				loop: true, // Optional: add loop for continuous scrolling
			}}
		>
			<CarouselContent className="h-full">
				<CarouselItem className="min-h-screen w-full">
					{<HeroOne />}
				</CarouselItem>
				<CarouselItem className="h-full">
					<HeroSection latestNews={latestNews} />
				</CarouselItem>
                <CarouselItem className="h-full">
                    <Hero />
                </CarouselItem>

			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
			
		</Carousel>
	);
};

export default HeroCarousel;