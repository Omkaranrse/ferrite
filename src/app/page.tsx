import Hero from "@/components/home/Hero";
import CompanyIntro from "@/components/home/CompanyIntro";
import ProductGrid from "@/components/home/ProductGrid";
import Capabilities from "@/components/home/Capabilities";
import ApproachTimeline from "@/components/home/ApproachTimeline";
import IndustriesGrid from "@/components/home/IndustriesGrid";
import Facilities from "@/components/home/Facilities";
import ContactCTA from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      {/* Section 2: Cinematic Hero */}
      <Hero />

      {/* Section 3: Company Introduction (Off-white) */}
      <CompanyIntro />

      {/* Section 4: Products Grid (Deep charcoal) */}
      <ProductGrid />

      {/* Section 5: Processing & Capabilities (Off-white) */}
      <Capabilities />

      {/* Section 6: Our Approach Timeline (Graphite) */}
      <ApproachTimeline />

      {/* Section 7: Industries Served (Dark) */}
      <IndustriesGrid />

      {/* Section 8: Facilities & Locations (Light) */}
      <Facilities />

      {/* Section 9: Contact CTA & Form (Dark) */}
      <ContactCTA />
    </>
  );
}

