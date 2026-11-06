import { Metadata } from "next";
import BlogListingClient from "@/components/blog/BlogListingClient";
import { getAllPosts } from "@/data/blogData";

export const metadata: Metadata = {
  title: "Insights & Perspectives | Ferrite Structural Steels Blog",
  description:
    "Explore authoritative insights on structural steel, material selection, engineering applications and industrial developments from Ferrite Structural Steels Pvt Ltd, Mumbai.",
  keywords: [
    "structural steel blog",
    "steel engineering articles",
    "stainless steel channels",
    "steel beams mumbai",
    "IS 2062 steel specifications",
    "tmt bars construction",
    "ferrite steel insights",
  ],
  alternates: {
    canonical: "https://ferrite.in/blog",
  },
  openGraph: {
    title: "Insights & Perspectives | Ferrite Structural Steels Blog",
    description:
      "Explore authoritative insights on structural steel, material selection, engineering applications and industrial developments.",
    url: "https://ferrite.in/blog",
    siteName: "Ferrite Structural Steels Pvt. Ltd.",
    type: "website",
    images: [
      {
        url: "https://ferrite.in/wp-content/uploads/2026/07/stainless-steel-channels-marine-chemical-industries.jpg",
        width: 1200,
        height: 630,
        alt: "Ferrite Structural Steels Insights & Perspectives",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights & Perspectives | Ferrite Structural Steels Blog",
    description:
      "Explore authoritative insights on structural steel, material selection, engineering applications and industrial developments.",
    images: [
      "https://ferrite.in/wp-content/uploads/2026/07/stainless-steel-channels-marine-chemical-industries.jpg",
    ],
  },
};

export default function BlogPage() {
  const allPosts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Ferrite Insights & Perspectives",
    description:
      "Authoritative insights on structural steel, material selection, engineering applications and industrial developments.",
    url: "https://ferrite.in/blog",
    publisher: {
      "@type": "Organization",
      name: "Ferrite Structural Steels Pvt. Ltd.",
      url: "https://ferrite.in",
      logo: {
        "@type": "ImageObject",
        url: "https://ferrite.in/ferrite-icon.svg",
      },
    },
    blogPost: allPosts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://ferrite.in/blog/${post.slug}`,
      datePublished: post.publishedDate,
      image: post.featuredImage,
      description: post.excerpt,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogListingClient initialPosts={allPosts} />
    </>
  );
}

