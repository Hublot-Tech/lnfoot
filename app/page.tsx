import Ads from "@/components/Home/Ads";
import {Gallery} from "@/components/Home/Gallery";
import Hero from "@/components/Home/Hero";
import LatestNews from "@/components/Home/LatestNews"; // Import the new component
import PointsForts from "@/components/Home/PointsForts";

export default function Home() {
  return (
    <main className="min-h-screen  justify-between">
      <Hero />
      <LatestNews /> 
      <Gallery />
      <PointsForts />
      <Ads />
    </main>
  );
}
