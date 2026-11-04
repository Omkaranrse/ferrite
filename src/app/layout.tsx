import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { RFQProvider } from "@/context/RFQContext";
import { OrganizationSchema, LocalBusinessSchema, WebSiteSchema } from "@/components/shared/JsonLd";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ferrite.in";
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const viewport: Viewport = {
  themeColor: "#17191B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Ferrite Structural Steels | Structural Steel Supplier & Stockist India",
    template: "%s | Ferrite Structural Steels Pvt. Ltd.",
  },
  description:
    "Ferrite Structural Steels Pvt. Ltd. (Est. 1965) is a premier structural steel supplier, stockist, and material processing partner in India. Stockholding in Kalamboli, Commercial HQ in Ghatkopar, Mumbai.",
  keywords: [
    "structural steel supplier",
    "structural steel stockist",
    "steel cutting services",
    "steel processing services",
    "structural steel products",
    "industrial steel supplier",
    "steel material preparation",
    "custom steel sizing",
    "structural steel supply India",
    "MS beams ISMB",
    "steel angles IS 2062",
    "steel channels ISMC",
    "hot rolled plates",
    "chequered plates",
    "hollow sections SHS RHS",
    "Kalamboli steel market",
    "Ghatkopar steel supplier",
  ],
  authors: [{ name: "Ferrite Structural Steels Pvt. Ltd." }],
  creator: "Ferrite Structural Steels Pvt. Ltd.",
  publisher: "Ferrite Structural Steels Pvt. Ltd.",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: baseUrl,
    siteName: "Ferrite Structural Steels Pvt. Ltd.",
    title: "Ferrite Structural Steels | Structural Steel. Prepared for Purpose.",
    description:
      "Structural steel supply, buffer stockholding, bandsaw cutting, and CNC plate profiling for infrastructure, PEB fabrication, and construction across India.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ferrite Structural Steels — Structural Steel Prepared for Purpose",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ferrite Structural Steels | Structural Steel Supplier & Stockist",
    description:
      "Steel, prepared for what you build. Lineage dating back to 1965. Stockholding in Kalamboli, Commercial HQ in Ghatkopar, Mumbai.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: googleVerification
    ? {
        google: googleVerification,
      }
    : undefined,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />

        {/* Global JSON-LD Structured Data */}
        <OrganizationSchema />
        <LocalBusinessSchema />
        <WebSiteSchema />

        {/* Google Analytics 4 Script (Conditional on Measurement ID) */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="bg-graphite text-offwhite min-h-screen flex flex-col antialiased selection:bg-copper selection:text-white">
        <SmoothScroll>
          <RFQProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingWhatsApp />
          </RFQProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
