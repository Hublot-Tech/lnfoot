"use client";

import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";

export default function Hero() {
    const plugin = React.useRef(
        Autoplay({
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
        })
    );

    return (
        <main className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#273D31] to-[#1A2B1E]">
            <Carousel
                className="w-full"
                opts={{
                    loop: true,
                    align: "start",
                }}
                plugins={[plugin.current]}
            >
                <CarouselContent>
                    {/* Slide 1: Tennis Hub - Inspiré de la première capture */}
                    <CarouselItem className="relative w-full">
                        <div className="relative h-[600px] w-full overflow-hidden bg-[#273D31]">
                            <div className="absolute inset-0 z-10 flex flex-col justify-center p-10 md:p-16 lg:ml-16 lg:w-2/3 xl:w-1/2">
                                <h1 className="mb-6 text-5xl font-bold leading-tight text-white">
                                    Discover your<br />local tennis hub
                                </h1>
                                <p className="mb-8 text-lg text-white">
                                    Gain exclusive access to your local tennis community with RallyPoint.
                                    You can play matches, find partners, and explore local courts.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Button asChild className="bg-[#c2d82e] hover:bg-[#a8bc29] text-black font-medium px-8 py-6">
                                        <Link href="#">Join for Free</Link>
                                    </Button>
                                    <Button variant="outline" asChild className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6">
                                        <Link href="#">Explore the Hub</Link>
                                    </Button>
                                </div>
                                <div className="mt-12 flex items-center gap-4">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-gray-300" />
                                        ))}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">30k+</p>
                                        <p className="text-sm text-white/70">tennis players</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>

                    {/* Slide 2: Basketball News - Inspiré de la deuxième capture */}
                    <CarouselItem className="w-full">
                        <div className="relative flex flex-col items-center bg-white pb-10 pt-8">
                            <div className="container px-4">
                                <h2 className="mb-4 text-center text-4xl font-bold sm:text-5xl">
                                    Team USA Narrowly Beat France To Take Historic Women's Basketball Gold
                                </h2>
                                <p className="mx-auto mb-4 max-w-3xl text-center text-gray-700">
                                    In a thrilling and closely contested match, Team USA narrowly edges out a determined France to secure a historic women's basketball gold medal victory
                                </p>
                                <div className="mb-8 flex justify-center gap-4">
                                    <span className="text-[#FF4B11]">Olympics</span>
                                    <span className="text-gray-400">3 minute read</span>
                                </div>
                                <div className="relative mx-auto h-[400px] w-full max-w-5xl overflow-hidden rounded-xl">
                                    <div className="h-full w-full bg-gray-300"></div>
                                </div>
                                <div className="mt-8 flex justify-center">
                                    <Button asChild className="bg-black hover:bg-gray-800">
                                        <Link href="/news">Read More News</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>

                    {/* Slide 3: Shop Section */}
                    <CarouselItem className="w-full">
                        <div className="relative h-[600px] w-full overflow-hidden bg-black">
                            <div className="absolute inset-0 z-10 flex flex-col justify-center p-10 md:p-16 lg:ml-16 lg:w-2/3 xl:w-1/2">
                                <h1 className="mb-6 text-5xl font-bold leading-tight text-white">
                                    Discover our<br />exclusive LNSHOP collection
                                </h1>
                                <p className="mb-8 text-lg text-white">
                                    From official team jerseys to premium sportswear, find everything you need to support your favorite teams and athletes with style.
                                </p>
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="rounded-lg bg-gray-800 p-4">
                                        <h3 className="text-xl font-bold text-white">New Arrivals</h3>
                                        <p className="text-sm text-gray-300">Latest collections</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-800 p-4">
                                        <h3 className="text-xl font-bold text-white">Limited Edition</h3>
                                        <p className="text-sm text-gray-300">Exclusive items</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-800 p-4">
                                        <h3 className="text-xl font-bold text-white">Equipment</h3>
                                        <p className="text-sm text-gray-300">Professional gear</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-800 p-4">
                                        <h3 className="text-xl font-bold text-white">Team Apparel</h3>
                                        <p className="text-sm text-gray-300">Support your team</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <Button asChild className="bg-[#FF4B11] hover:bg-[#E0400F] text-white font-medium px-8 py-6">
                                        <Link href="/shop">Visit Shop</Link>
                                    </Button>
                                    <Button variant="outline" asChild className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6">
                                        <Link href="/shop/featured">Featured Items</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                    <CarouselPrevious className="bg-white/20 text-white hover:bg-white/40" />
                    <CarouselNext className="bg-white/20 text-white hover:bg-white/40" />
                </div>
            </Carousel>
        </main>
    );
}