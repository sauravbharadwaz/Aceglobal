import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import BentoGrid from "@/components/BentoGrid";
import Timeline from "@/components/Timeline";
import Services from "@/components/Services";
import TestimonialCards from "@/components/TestimonialCards";
import ReviewsWall from "@/components/ReviewsWall";
import DifferenceSection from "@/components/DifferenceSection";
import StatsBento from "@/components/StatsBento";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <BentoGrid />
        <Timeline />
        <Services />
        <TestimonialCards />
        <ReviewsWall />
        <DifferenceSection />
        <StatsBento />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
