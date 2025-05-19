import Ads from "@/components/Home/Ads";
import {Gallery} from "@/components/Home/Gallery";
import Hero from "@/components/Home/Hero";
import LatestNews from "@/components/Home/LatestNews"; // Import the new component

export default function Home() {
  return (
    <main className="min-h-screen flex-col items-center justify-between">
      <Hero />
      <LatestNews /> 
      <Gallery />
      <Ads />
    </main>
  );
}
