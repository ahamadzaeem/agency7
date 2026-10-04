import PageHero from "@/components/ui/PageHero";
import WhyUAEDetailed from "@/components/sections/WhyUAEDetailed";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "Why the UAE | The Agency 7",
  description: "A global platform for business, investment and growth.",
};

export default function WhyUAEPage() {
  return (
    <main>
      <Navbar />
      <PageHero 
        title="Discover the Market Potential."
        subtitle="Why The UAE"
      />
      <WhyUAEDetailed />
      <FinalCTA />
      <Footer />
    </main>
  );
}
