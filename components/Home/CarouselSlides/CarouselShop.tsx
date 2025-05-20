import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";

export function CarouselShop() {
    return (
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
    );
}
