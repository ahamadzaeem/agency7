import PageHero from "@/components/ui/PageHero";
import WhyAgencySeven from "@/components/sections/WhyAgencySeven";
import Approach from "@/components/sections/Approach";
import ProfessionalNetwork from "@/components/sections/ProfessionalNetwork";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "About | The Agency 7",
  description: "Learn about the strategic approach and experience behind The Agency 7 Global Consultancy.",
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <PageHero 
        title="More Than Advice."
        subtitle="The Agency Seven Approach"
      />
      <Approach />
      <WhyAgencySeven />
      <ProfessionalNetwork />
      <FinalCTA />
      <Footer />
    </main>
  );
}
