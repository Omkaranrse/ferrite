export interface ServiceItem {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
  imageOnRight?: boolean;
}

export const SERVICES_PAGE_DATA: ServiceItem[] = [
  {
    id: "engineering-solutions",
    eyebrow: "ENGINEERING SOLUTIONS",
    title: "Engineering Solutions",
    description:
      "Comprehensive engineering support for fabrication projects, including design, detailing, and blueprint conversion to ensure accuracy, efficiency, and fast project turnaround.",
    bullets: [
      "Third-Party Inspection of Materials",
      "Cut-to-Size Materials",
      "Wide Range of Material Grades",
      "NABL Approved Lab Test Certificates",
      "Raw Material Inspection Reports",
    ],
    image: "/images/services/digital-engineering.jpg",
    imageOnRight: false,
  },
  {
    id: "welded-engineering-assemblies",
    eyebrow: "WELDED ENGINEERING ASSEMBLIES",
    title: "Welded Engineering Assemblies",
    description:
      "Custom and heavy steel fabrication using a wide range of materials. We deliver high-quality, pre-assembled and ready-to-install welded assemblies for large and complex projects.",
    bullets: [
      "Pressure Vessels",
      "Distillery Plants",
      "Storage Tanks",
      "Chemical Process Plants",
      "Basket Centrifuge",
      "Decanter Centrifuge",
    ],
    image: "/images/services/welded-assemblies.jpg",
    imageOnRight: true,
  },
  {
    id: "bridge-walkways-support-structures",
    eyebrow: "BRIDGE WALKWAYS & SUPPORT STRUCTURES",
    title: "Bridge Walkways & Support Structures",
    description:
      "End-to-end bridge fabrication services, from design to execution. We build durable, ISO-certified steel structures for diverse bridge applications.",
    bullets: [
      "Pedestrian Bridges",
      "Cantilever Bridges",
      "Ancillary Steelwork Associated with Bridges",
    ],
    image: "/images/services/bridge-walkways.jpg",
    imageOnRight: false,
  },
  {
    id: "primary-structural-steelwork",
    eyebrow: "PRIMARY STRUCTURAL STEELWORK",
    title: "Primary Structural Steelwork",
    description:
      "Full turnkey design, fabrication, and supply of primary structural steelwork for industrial, commercial, and infrastructure projects.",
    bullets: [
      "Structural Steel for Buildings",
      "Bridges and Artworks",
      "Small to Large-Scale Projects",
      "Integrated Design & Fabrication",
      "Multi-Sector Application (Industrial, Rail, Infrastructure)",
    ],
    image: "/images/services/structural-steelwork.jpg",
    imageOnRight: true,
  },
];

export const SERVICE_FEATURE_PILLS = [
  {
    iconName: "Settings",
    title: "Engineering & Design",
    subtitle: "From concept to fabrication",
  },
  {
    iconName: "Layers",
    title: "Custom Fabrication",
    subtitle: "Built to your specifications",
  },
  {
    iconName: "ShieldCheck",
    title: "Quality Assured",
    subtitle: "ISO certified processes",
  },
  {
    iconName: "Zap",
    title: "Timely Execution",
    subtitle: "On-time, every time",
  },
];
