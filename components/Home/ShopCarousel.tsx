
import { apiClient } from "@/app/api/api-client";
import Link from "next/link";
import { CarouselWithAutoplay } from "./ShopCarouselClient";
import { Suspense } from "react";
import { ShopGridSkeleton } from "@/components/ui/skeletons";

export default function ShopCarousel() {
  return (
    <section className="py-12 bg-slate-50">
      <div className="mx-auto px-4 lg:px-24">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl uppercase text-orange-500 font-bold">Nos Meilleurs Articles</h2>
          <Link href="/shop" className="text-orange-500 hover:text-orange-600">
            Voir plus &rarr;
          </Link>
        </div>
        
        <Suspense fallback={<ShopGridSkeleton count={6} />}>
          <ShopCarouselContent />
        </Suspense>
      </div>
    </section>
  );
}

async function ShopCarouselContent() {
  // Récupérer tous les articles et limiter à 6
  const articles = await apiClient.ecommerceArticles.findAll();
  const featuredArticles = articles?.slice(0, 6) || [];

  return <CarouselWithAutoplay articles={featuredArticles} />;
}
