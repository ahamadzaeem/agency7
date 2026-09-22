import PageHero from "@/components/ui/PageHero";
import ServicesDetailed from "@/components/sections/ServicesDetailed";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "Services | The Agency 7",
  description: "Strategic consulting, project management, marketing, and commercial connections in the UAE.",
};

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <PageHero 
        title="One Partner. Multiple Perspectives."
        subtitle="Our Services"
      />
      <ServicesDetailed />
      <FinalCTA />
      <Footer />
    </main>
  );
}
