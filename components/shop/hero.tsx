import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gray-900">
      <div className="absolute inset-0">
        <Image
          src="/maillots.jpg"
          alt="Shop Banner"
          layout="fill"
          objectFit="cover"
          priority
          className="opacity-50"
        />
      </div>
      <div className="relative z-10 h-full container mx-auto px-4 flex flex-col justify-center py-20">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 max-w-2xl">
          Découvrez notre collection exclusive LN FOOT
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-xl">
          Des équipements de qualité et des articles officiels pour tous les passionnés de football.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
            <Link href="#featured">
              Voir la Collection
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
            <Link href="#categories">
              Explorer les Catégories
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}