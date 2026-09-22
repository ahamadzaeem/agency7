import PageHero from "@/components/ui/PageHero";
import WhyUAE from "@/components/sections/WhyUAE";
import WhyAgencySeven from "@/components/sections/WhyAgencySeven";
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
        title="A global platform for business, investment and growth."
        subtitle="Why The UAE?"
      />
      <WhyUAE />
      <WhyAgencySeven />
      <FinalCTA />
      <Footer />
    </main>
  );
}
