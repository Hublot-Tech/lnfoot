import Ads from "@/components/Home/Ads";
import {Gallery} from "@/components/Home/Gallery";
import GetApp from "@/components/Home/GetApp";
import Hero from "@/components/Home/Hero";
import LatestNews from "@/components/Home/LatestNews"; // Import the new component
import PointsForts from "@/components/Home/PointsForts";

export default function Home() {
  return (
    <main className="min-h-screen  justify-between">
      <Hero />
      <LatestNews /> 
      <Ads />
      <PointsForts />
      {/* <Gallery /> */}
      <GetApp />
    </main>
  );
}
