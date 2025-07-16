import Ads from "@/components/Home/ads";
import GetApp from "@/components/Home/get-app";
import LatestNews from "@/components/Home/latest-news";
import LiveScores from "@/components/Home/live-scores";
import PointsForts from "@/components/Home/points-forts";
import ShopCarousel from "@/components/Home/shop-carousel";
import Hero from "@/components/Home/hero";

export default async function Home() {
  // Fetch the latest news article
  return (
    <main className="min-h-screen justify-between">
      <Hero />
      <LatestNews /> 
      <LiveScores />
      <PointsForts />
      <ShopCarousel />
      <Ads />
      {/* <Gallery /> */}
      <GetApp />
    </main>
  );
}
