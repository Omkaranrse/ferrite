import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/data/blogData";
import ReadingProgress from "@/components/blog/ReadingProgress";
import ArticleHeader from "@/components/blog/ArticleHeader";
import ArticleTableOfContents from "@/components/blog/ArticleTableOfContents";
import ArticleContent from "@/components/blog/ArticleContent";
import BlogContactCTA from "@/components/blog/BlogContactCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Article Not Found | Ferrite Structural Steels",
    };
  }

  const url = `https://ferrite.in/blog/${post.slug}`;

  return {
    title: `${post.title} | Ferrite Structural Steels`,
    description: post.excerpt,
    keywords: [
      post.category,
      "structural steel",
      "ferrite steels mumbai",
      "steel specifications",
      post.title,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.publishedDate,
      authors: ["Ferrite Structural Steels Pvt. Ltd."],
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.featuredImageAlt || post.title,
        },
      ],
      siteName: "Ferrite Structural Steels Pvt. Ltd.",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, 3);

  // Article JSON-LD Structured Data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.excerpt,
    image: [post.featuredImage],
    datePublished: post.publishedDate,
    dateModified: post.publishedDate,
    author: {
      "@type": "Organization",
      name: "Ferrite Structural Steels Pvt. Ltd.",
      url: "https://ferrite.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Ferrite Structural Steels Pvt. Ltd.",
      url: "https://ferrite.in",
      logo: {
        "@type": "ImageObject",
        url: "https://ferrite.in/ferrite-icon.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ferrite.in/blog/${post.slug}`,
    },
  };

  // BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ferrite.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://ferrite.in/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.category,
        item: `https://ferrite.in/blog?category=${encodeURIComponent(post.category)}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.title,
        item: `https://ferrite.in/blog/${post.slug}`,
      },
    ],
  };

  // FAQPage JSON-LD (if FAQs present)
  const faqSchema =
    post.faqs && post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Reading Progress Indicator */}
      <ReadingProgress />

      <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#070A0D] transition-colors duration-300">
        {/* Article Header & Hero Visual */}
        <ArticleHeader article={post} />

        {/* Article Content & Table of Contents Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Main Editorial Reading Body (8 cols) */}
            <div className="lg:col-span-8 max-w-3xl">
              <ArticleContent content={post.content} faqs={post.faqs} />

              {/* Minimal Contact CTA at article bottom */}
              <BlogContactCTA articleTitle={post.title} />
            </div>

            {/* Sticky Table of Contents Sidebar (4 cols) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28">
              <ArticleTableOfContents headings={post.headings} />
            </aside>
          </div>

          {/* Related Articles Grid */}
          <RelatedArticles articles={relatedPosts} />
        </div>
      </main>
    </>
  );
}

