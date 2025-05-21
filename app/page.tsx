import Ads from "@/components/Home/Ads";
import GetApp from "@/components/Home/GetApp";
import LatestNews from "@/components/Home/LatestNews";
import LiveScores from "@/components/Home/live-scores";
import PointsForts from "@/components/Home/PointsForts";
import ShopCarousel from "@/components/Home/ShopCarousel";
import Hero from "@/components/Home/Hero";

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
