import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { History, Award, CheckCircle, ShieldCheck, Target, Users, MapPin } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import StatCounter from "@/components/ui/StatCounter";
import { BreadcrumbSchema } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "About Us | Lineage Dating Back to 1965 | Ferrite Structural Steels",
  description:
    "Discover the history of Ferrite Structural Steels Pvt. Ltd. From Payal Enterprises in 1965 to an integrated structural steel supplier and material processing partner across India.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Five Decades of Structural Steel Excellence | Ferrite",
    description:
      "Business lineage dating back to 1965. Stockholding at Kalamboli Warehousing Complex, commercial coordination at Ghatkopar, Mumbai.",
    url: "https://ferrite.in/about",
  },
};

const timelineMilestones = [
  {
    year: "1965",
    title: "Foundation of Lineage",
    subtitle: "Trading begins in Mumbai's historic iron & steel hubs",
    description:
      "Our business roots began over 59 years ago under Payal Enterprises. The firm established an enduring reputation for integrity, timely delivery, and dependable sourcing of primary iron and steel products.",
  },
  {
    year: "1988",
    title: "Expansion into Heavy Structural Sections",
    subtitle: "Strategic focus on construction & industrial steel",
    description:
      "As India entered modern infrastructural development, we expanded inventory from basic merchant bars to heavy Indian Standard Medium Beams (ISMB), structural angles, and channels.",
  },
  {
    year: "2004",
    title: "Establishment of Kalamboli Facility",
    subtitle: "Consolidating operations in Navi Mumbai's premier steel hub",
    description:
      "To meet rapid urbanization and large-span factory demands, we established our warehousing base in the Kalamboli Warehousing Complex (KWC), outfitting it with overhead gantry cranes.",
  },
  {
    year: "2014",
    title: "Rebranding to Ferrite Structural Steels Pvt. Ltd.",
    subtitle: "Transition to integrated stockholding & value-added processing",
    description:
      "The corporate identity was officially restructured to Ferrite Structural Steels Pvt. Ltd., reflecting our expanded engineering scope: combining stockholding with precision cutting, shaping, and sizing.",
  },
  {
    year: "Present",
    title: "Pan-India Project Partner",
    subtitle: "Advanced CNC profiling, bandsaws & multi-sector supply",
    description:
      "Today, Ferrite supplies steel for high-rise buildings, highway bridges, metro transit viaducts, and pre-engineered buildings nationwide, backed by 100% Mill Test Certificate traceability.",
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://ferrite.in" },
          { name: "About Us", url: "https://ferrite.in/about" },
        ]}
      />

      <PageHeader
        eyebrow="OUR HERITAGE & VISION"
        title="Five decades of structural steel"
        highlightedTitle="excellence."
        subtitle="With a business lineage dating back to 1965, Ferrite Structural Steels Pvt. Ltd. combines extensive stockholding with precision cutting, shaping, and sizing for builders across India."
        breadcrumb="About Us"
      />

      {/* Section 1: Detailed Heritage Narrative (Off-white) */}
      <section className="bg-offwhite text-graphite py-20 sm:py-28 relative bg-grid-pattern-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="light" className="text-graphite font-bold">
                THE FERRITE LEGACY
              </Badge>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-graphite">
                From Payal Enterprises to an integrated industrial partner.
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-steel-dark leading-relaxed font-body">
                <p>
                  Ferrite Structural Steels Pvt. Ltd. traces its lineage back to 1965 when operations
                  first commenced as <strong>Payal Enterprises Pvt. Ltd.</strong> Founded on principles of
                  transparency, quality, and commercial clarity, our firm evolved alongside India&apos;s
                  post-independence industrial boom.
                </p>
                <p>
                  In 2014, the company was officially rechristened as <strong>Ferrite Structural Steels Pvt. Ltd.</strong>
                  This rebranding was not merely cosmetic; it signified our strategic evolution from
                  a traditional steel trader into an integrated structural steel supplier and
                  material-processing partner.
                </p>
                <p>
                  Today, we bridge the gap between primary steel mills and modern construction sites.
                  Operating out of our commercial headquarters in Ghatkopar, Mumbai, and our heavy
                  material handling facility at the Kalamboli Warehousing Complex in Navi Mumbai, we
                  serve contractors, engineers, and fabricators across India.
                </p>
              </div>

              {/* Core Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-offwhite-border">
                <div className="p-4 bg-white border border-offwhite-border">
                  <div className="font-heading text-3xl font-bold text-copper">
                    <StatCounter value={1965} />
                  </div>
                  <span className="text-xs font-heading text-graphite font-semibold mt-1 block">
                    Foundational Lineage
                  </span>
                  <span className="text-[11px] text-steel-dark">Payal Enterprises era</span>
                </div>
                <div className="p-4 bg-white border border-offwhite-border">
                  <div className="font-heading text-3xl font-bold text-copper">
                    <StatCounter value={2014} />
                  </div>
                  <span className="text-xs font-heading text-graphite font-semibold mt-1 block">
                    Restructured Identity
                  </span>
                  <span className="text-[11px] text-steel-dark">Ferrite Structural Steels</span>
                </div>
                <div className="p-4 bg-white border border-offwhite-border col-span-2 sm:col-span-1">
                  <div className="font-heading text-3xl font-bold text-copper">
                    100%
                  </div>
                  <span className="text-xs font-heading text-graphite font-semibold mt-1 block">
                    Certified Material
                  </span>
                  <span className="text-[11px] text-steel-dark">Mill Test Certificates (MTC)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden shadow-2xl bg-charcoal border border-offwhite-border">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85"
                  alt="Ferrite Structural Steels industrial processing yard in Kalamboli"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white p-4 bg-graphite/90 backdrop-blur-md border border-charcoal-border">
                  <span className="text-xs font-mono text-copper block uppercase">
                    BRAND POSITIONING
                  </span>
                  <p className="font-heading font-bold text-lg text-white mt-1">
                    &ldquo;Structural Steel. Prepared for Purpose.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Interactive Milestone Timeline (Graphite) */}
      <section className="bg-graphite py-24 sm:py-32 text-offwhite border-t border-charcoal-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3 mb-16">
            <Badge variant="copper">OUR EVOLUTION</Badge>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Key Milestones Along Our Journey
            </h2>
            <p className="text-steel text-sm sm:text-base">
              A historical overview of how customer trust and continuous engineering investments
              shaped Ferrite.
            </p>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-charcoal-border">
            {timelineMilestones.map((m, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={m.year}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Central Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-none bg-charcoal border-2 border-copper flex items-center justify-center text-copper z-10">
                    <span className="w-2 h-2 bg-copper" />
                  </div>

                  {/* Content Card */}
                  <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-10">
                    <div className="bg-charcoal border border-charcoal-border p-6 sm:p-8 hover:border-copper transition-colors">
                      <span className="font-mono text-2xl font-bold text-copper block mb-1">
                        {m.year}
                      </span>
                      <h3 className="font-heading text-xl font-bold text-white">
                        {m.title}
                      </h3>
                      <p className="text-xs text-copper font-medium mt-1">
                        {m.subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-steel mt-3 leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Values & Quality Affirmation (Off-white) */}
      <section className="bg-offwhite text-graphite py-20 sm:py-28 border-t border-offwhite-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3 mb-16">
            <Badge variant="light" className="text-graphite font-bold">
              GUIDING PRINCIPLES
            </Badge>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-graphite">
              Built on values that endure.
            </h2>
            <p className="text-steel-dark text-sm sm:text-base">
              The ethical and engineering standards that guide every material cut, quotation, and
              dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-offwhite-border shadow-md space-y-4">
              <div className="w-12 h-12 bg-offwhite border border-offwhite-border flex items-center justify-center text-copper">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-graphite">
                Complete Traceability
              </h3>
              <p className="text-xs sm:text-sm text-steel-dark leading-relaxed">
                We provide genuine Mill Test Certificates (MTC) linked to primary manufacturer heat
                numbers for 100% of material dispatched. No uncertified or non-standard substitutes.
              </p>
            </div>

            <div className="bg-white p-8 border border-offwhite-border shadow-md space-y-4">
              <div className="w-12 h-12 bg-offwhite border border-offwhite-border flex items-center justify-center text-copper">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-graphite">
                Dimensional Precision
              </h3>
              <p className="text-xs sm:text-sm text-steel-dark leading-relaxed">
                By investing in industrial bandsaws and CNC plate profiling machinery, we deliver
                materials within millimeter tolerances, saving clients costly on-site modifications.
              </p>
            </div>

            <div className="bg-white p-8 border border-offwhite-border shadow-md space-y-4">
              <div className="w-12 h-12 bg-offwhite border border-offwhite-border flex items-center justify-center text-copper">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-graphite">
                Commercial Transparency
              </h3>
              <p className="text-xs sm:text-sm text-steel-dark leading-relaxed">
                Clear weight tickets from calibrated electronic weighbridges, structured billing, and
                open communication regarding mill delivery timelines and stock availability.
              </p>
            </div>
          </div>

          <div className="mt-16 p-8 bg-graphite text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-charcoal-border">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-copper block font-semibold">
                PARTNER WITH FERRITE
              </span>
              <h4 className="font-heading text-xl sm:text-2xl font-bold mt-1">
                Ready to review project specifications?
              </h4>
            </div>
            <div className="flex gap-4">
              <Button href="/products" variant="outline" withArrow>
                Explore Products
              </Button>
              <Button href="/contact" variant="primary">
                Discuss Your Requirements
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
