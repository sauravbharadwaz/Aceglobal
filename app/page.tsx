import type { Metadata } from "next";

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
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site-env";

// Title and description come from the root layout; the home page only needs
// to declare that "/" is its canonical form.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Organization + WebSite entities. This is how search engines and AI
 * assistants identify who runs the site, and the @id lets blog posts'
 * publisher reference resolve to the same entity.
 *
 * sameAs (social profiles) is intentionally absent: the footer's social cards
 * are placeholders with no URLs yet. Add the real profile links here once
 * they exist.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
      },
      description:
        "Ace Global is the all-in-one accounting platform that combines expert CPAs with powerful software to handle bookkeeping, corporate taxes, payroll and compliance for small businesses.",
      foundingDate: "2021",
      knowsAbout: [
        "Bookkeeping",
        "Corporate tax",
        "Payroll",
        "Business compliance",
        "Company formation",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
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
