import type { Metadata } from "next";
import ProductsCatalogClient from "@/components/products/ProductsCatalogClient";
import { BreadcrumbSchema } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Structural Steel Products & Specifications | Beams, Angles, Channels, Plates",
  description:
    "Explore Ferrite's structural steel products: MS I-Beams (ISMB), Universal Beams, Angles, Channels (ISMC), Plates, Hollow Sections, and TMT bars conforming to IS 2062, IS 808, and ASTM standards.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Structural Steel Products & Specifications | Ferrite",
    description:
      "Comprehensive structural steel inventory: ISMB beams, structural angles, channels, plates, pipes, and rebars with 100% Mill Test Certificate (MTC) traceability.",
    url: "https://ferrite.in/products",
  },
};

export default function ProductsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://ferrite.in" },
          { name: "Products", url: "https://ferrite.in/products" },
        ]}
      />
      <ProductsCatalogClient />
    </>
  );
}
