import PageHero from "@/components/ui/PageHero";
import UAEEurope from "@/components/sections/UAEEurope";
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
        title="Connecting Markets. Creating Opportunities."
        subtitle="UAE ↔ Europe"
      />
      <UAEEurope />
      <FinalCTA />
      <Footer />
    </main>
  );
}
