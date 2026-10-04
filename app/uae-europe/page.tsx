import PageHero from "@/components/ui/PageHero";
import UAEEuropeDetailed from "@/components/sections/UAEEuropeDetailed";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "UAE ↔ Europe | The Agency 7",
  description: "Connecting Markets. Creating Opportunities.",
};

export default function UAEEuropePage() {
  return (
    <main>
      <Navbar />
      <PageHero 
        title="The Bridge Between Markets."
        subtitle="UAE ↔ Europe"
      />
      <UAEEuropeDetailed />
      <FinalCTA />
      <Footer />
    </main>
  );
}
