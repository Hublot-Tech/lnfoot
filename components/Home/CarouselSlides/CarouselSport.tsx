import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";

export function CarouselSport() {
    return (
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
    );
}
