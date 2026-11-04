import type { Metadata } from "next";
import ContactPageClient from "@/components/contact/ContactPageClient";
import { BreadcrumbSchema } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Contact Commercial Office & Kalamboli Facility | Ferrite Structural Steels",
  description:
    "Contact Ferrite Structural Steels Pvt. Ltd. Commercial Headquarters at Ghatkopar East, Mumbai for quotations and contracting. Warehousing and material processing facility at Kalamboli, Navi Mumbai.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Ferrite Structural Steels | Mumbai & Kalamboli Hubs",
    description:
      "Direct telephone, email, and tender estimation submissions for structural steel projects. Commercial desk: +91 88283 35168.",
    url: "https://ferrite.in/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://ferrite.in" },
          { name: "Contact Us", url: "https://ferrite.in/contact" },
        ]}
      />
      <ContactPageClient />
    </>
  );
}
