import PageHero from "@/components/ui/PageHero";
import Founder from "@/components/sections/Founder";
import Approach from "@/components/sections/Approach";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "About | The Agency 7",
  description: "Learn about the founder, experience, and strategic approach behind The Agency 7 Global Consultancy.",
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <PageHero 
        title="Experience Matters."
        subtitle="About The Agency 7"
      />
      <Founder />
      <Approach />
      <FinalCTA />
      <Footer />
    </main>
  );
}
