import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { RFQProvider } from "@/context/RFQContext";

export const metadata: Metadata = {
  title: "Ferrite Structural Steels Pvt. Ltd. | Structural Steel. Prepared for Purpose.",
  description:
    "Structural steel supply and material processing for construction, fabrication, infrastructure and industry. Business lineage dating back to 1965. Stockholding in Kalamboli, Commercial HQ in Ghatkopar, Mumbai.",
  keywords: [
    "structural steel",
    "MS beams ISMB",
    "steel angles",
    "steel channels ISMC",
    "hot rolled plates",
    "hollow sections SHS RHS",
    "steel cutting and processing",
    "Ferrite Structural Steels",
    "Kalamboli steel market",
    "Ghatkopar Mumbai steel supplier",
  ],
  authors: [{ name: "Ferrite Structural Steels Pvt. Ltd." }],
  creator: "Ferrite Structural Steels Pvt. Ltd.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ferrite.in",
    siteName: "Ferrite Structural Steels Pvt. Ltd.",
    title: "Ferrite Structural Steels | Structural Steel. Prepared for Purpose.",
    description:
      "Steel, prepared for what you build. Structural steel stockholding, bandsaw cutting, CNC profiling and pan-India project supply.",
  },
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
      </head>
      <body className="bg-graphite text-offwhite min-h-screen flex flex-col antialiased selection:bg-copper selection:text-white">
        <SmoothScroll>
          <RFQProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </RFQProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
