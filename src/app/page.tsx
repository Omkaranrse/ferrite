import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import CompanyIntro from "@/components/home/CompanyIntro";
import ProductGrid from "@/components/home/ProductGrid";
import Capabilities from "@/components/home/Capabilities";
import ApproachTimeline from "@/components/home/ApproachTimeline";
import IndustriesGrid from "@/components/home/IndustriesGrid";
import Facilities from "@/components/home/Facilities";
import ContactCTA from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  title: "Structural Steel Supplier & Stockist India | Ferrite Structural Steels",
  description:
    "Ferrite Structural Steels Pvt. Ltd. (Est. 1965) supplies structural steel beams, angles, channels, plates, pipes, and rebars with precision bandsaw cutting and CNC profiling. Stockyard in Kalamboli, Commercial HQ in Ghatkopar, Mumbai.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Structural Steel Supplier & Material Processing | Ferrite Structural Steels",
    description:
      "Steel, prepared for what you build. Lineage dating back to 1965. Stockholding in Kalamboli, commercial coordination in Ghatkopar, Mumbai.",
    url: "https://ferrite.in",
  },
};

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
