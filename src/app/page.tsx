import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import ProductGrid from "@/components/home/ProductGrid";
import Capabilities from "@/components/home/Capabilities";
import IndustriesGrid from "@/components/home/IndustriesGrid";
import CompanyIntro from "@/components/home/CompanyIntro";
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
      {/* 1. Cinematic Hero with Industrial Workshop Visual & Trust Indicators */}
      <Hero />

      {/* 2. Steel Products Section (4-column architectural product grid) */}
      <ProductGrid />

      {/* 3. Capabilities Section (Cutting, Shaping, Sizing, Stockholding) */}
      <Capabilities />

      {/* 4. Industries Section (Contrasting warm sand banner breaking up dark visual flow) */}
      <IndustriesGrid />

      {/* 5. About Ferrite Section & Verified Statistics */}
      <CompanyIntro />

      {/* 6. Quotation CTA Section Banner */}
      <ContactCTA />
    </>
  );
}
