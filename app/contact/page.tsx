import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "Contact | The Agency 7",
  description: "Start a conversation about your UAE business or project opportunity.",
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <PageHero 
        title="Your UAE Opportunity Starts With a Conversation."
        subtitle="Contact Us"
      />
      <ContactForm />
      <Footer />
    </main>
  );
}
