import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import WhyUAE from "@/components/sections/WhyUAE";
import Services from "@/components/sections/Services";
import Approach from "@/components/sections/Approach";
import UAEEurope from "@/components/sections/UAEEurope";
import Founder from "@/components/sections/Founder";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhyUAE />
      <Services />
      <Approach />
      <UAEEurope />
      <Founder />
      <FinalCTA />
      <Footer />
    </main>
  );
}
