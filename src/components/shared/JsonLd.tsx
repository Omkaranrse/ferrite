import React from "react";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://ferrite.in/#organization",
    name: "Ferrite Structural Steels Pvt. Ltd.",
    legalName: "Ferrite Structural Steels Private Limited",
    alternateName: ["Ferrite Structural Steels", "Payal Enterprises Pvt. Ltd."],
    url: "https://ferrite.in",
    logo: "https://ferrite.in/logo.png",
    foundingDate: "1965",
    description:
      "Structural steel supplier and material processing partner based in Mumbai, India. Stockholding combined with precision cutting, shaping, and sizing for infrastructure, construction, and fabrication.",
    slogan: "Structural Steel. Prepared for Purpose.",
    email: "contact@ferrite.in",
    telephone: "+91-8828335168",
    address: {
      "@type": "PostalAddress",
      streetAddress: "8th Floor, 803/B Wing, Excel Plaza, 90 Feet Road, Pant Nagar, Ghatkopar East",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400075",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.linkedin.com/company/ferrite-structural-steels",
      "https://ferrite.in",
    ],
    knowsAbout: [
      "Structural Steel Beams (ISMB, Universal Beams)",
      "Steel Angles (Equal and Unequal Angles)",
      "Steel Channels (ISMC)",
      "Hot Rolled and Chequered Steel Plates",
      "Hollow Sections (SHS, RHS, CHS)",
      "TMT Reinforcement Bars (Fe 500D)",
      "Precision Bandsaw Cutting Services",
      "CNC Flame and Plasma Plate Profiling",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://ferrite.in/#ghatkopar-office",
        name: "Ferrite Structural Steels Pvt. Ltd. — Commercial Headquarters",
        description:
          "Central commercial office handling estimations, contracting, Bill of Quantities review, and client coordination across India.",
        url: "https://ferrite.in/contact",
        telephone: "+91-8828335168",
        email: "contact@ferrite.in",
        priceRange: "₹₹₹₹",
        address: {
          "@type": "PostalAddress",
          streetAddress: "8th Floor, 803/B Wing, Excel Plaza, 90 Feet Road, Pant Nagar, Ghatkopar East",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          postalCode: "400075",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 19.0838,
          longitude: 72.9095,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:30",
            closes: "18:30",
          },
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://ferrite.in/#kalamboli-facility",
        name: "Ferrite Structural Steels Pvt. Ltd. — Warehousing & Processing Complex",
        description:
          "Heavy structural stockyard with 20-ton overhead cranes, semi-automatic bandsaws, CNC flame profiling, and Pan-India dispatch logistics.",
        url: "https://ferrite.in/contact",
        telephone: "+91-9920777336",
        email: "contact@ferrite.in",
        priceRange: "₹₹₹₹",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Plot No. 18 (Bina Complex), KWC (Kalamboli Warehousing Complex), Opp. Gurukripa Hotel",
          addressLocality: "Kalamboli, Navi Mumbai",
          addressRegion: "Maharashtra",
          postalCode: "410218",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 19.0345,
          longitude: 73.0991,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "08:30",
            closes: "19:30",
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://ferrite.in/#website",
    url: "https://ferrite.in",
    name: "Ferrite Structural Steels",
    description: "Structural Steel Supplier & Material Processing Partner in India",
    publisher: {
      "@id": "https://ferrite.in/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://ferrite.in/products?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
