import { Metadata } from "next";
import AllArticlesClient from "@/components/blog/AllArticlesClient";
import { getAllPosts } from "@/data/blogData";

export const metadata: Metadata = {
  title: "All Articles & Technical Guides | Ferrite Structural Steels",
  description:
    "Browse the complete directory of 60 technical articles on structural steel, IS/ASTM standards, beams, angles, channels, and material selection from Ferrite Structural Steels Pvt Ltd.",
  alternates: {
    canonical: "https://ferrite.in/blog/all",
  },
  openGraph: {
    title: "All Articles & Technical Guides | Ferrite Structural Steels",
    description:
      "Browse the complete directory of 60 technical articles on structural steel, IS/ASTM standards, beams, angles, channels, and material selection.",
    url: "https://ferrite.in/blog/all",
    siteName: "Ferrite Structural Steels Pvt. Ltd.",
    type: "website",
  },
};

export default function AllArticlesPage() {
  const allPosts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Ferrite Structural Steels - All Articles",
    description:
      "Complete directory of 60 technical articles on structural steel, material selection, and engineering applications.",
    url: "https://ferrite.in/blog/all",
    publisher: {
      "@type": "Organization",
      name: "Ferrite Structural Steels Pvt. Ltd.",
      url: "https://ferrite.in",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AllArticlesClient initialPosts={allPosts} />
    </>
  );
}

