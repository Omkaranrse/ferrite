export interface Capability {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  highlights: string[];
  specs: { label: string; value: string }[];
}

export const capabilitiesData: Capability[] = [
  {
    id: "stockholding",
    number: "01",
    title: "Steel Stockholding & Buffer Inventory",
    subtitle: "Strategic reserves for accelerated project timelines",
    description:
      "Our expansive stockholding yard at the Kalamboli Warehousing Complex maintains rolling stock of heavy structural beams, angles, channels, plates, and hollow sections. We act as a critical material cushion for infrastructure developers, shielding projects from mill lead times and volatile spot markets.",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1600&q=85",
    highlights: [
      "Buffer stock of standard and high-tensile structural grades",
      "Immediate dispatch readiness for time-critical erection schedules",
      "Overhead crane infrastructure for safe handling of heavy profiles up to 12m+",
      "100% Mill Test Certificate (MTC) traceability linked to heat numbers",
    ],
    specs: [
      { label: "Yard Capacity", value: "Multi-acre covered & open storage" },
      { label: "Stock Tonnage", value: "Ready inventory across 6 core categories" },
      { label: "Handling", value: "20-ton overhead gantry cranes & forklifts" },
      { label: "Certification", value: "Original primary mill test certificates" },
    ],
  },
  {
    id: "cutting",
    number: "02",
    title: "Precision Cutting & Miter Sawing",
    subtitle: "Millimeter-accuracy length sizing to eliminate site scrap",
    description:
      "Site cutting causes delays, sparks, and uncalibrated tolerances. Ferrite operates industrial semi-automatic bandsaws and cold circular sawing stations capable of high-precision straight and compound miter cutting, delivering structural components ready for immediate erection.",
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=85",
    highlights: [
      "Precision cut tolerance within ±1.0 mm for seamless modular assembly",
      "Compound miter cutting up to 60 degrees for trusses and node frames",
      "Burr-free, clean cold-cut faces that require no grinding before welding",
      "Batch length bundling per erection grid and drawing mark numbers",
    ],
    specs: [
      { label: "Bandsaw Capacity", value: "Profiles up to 800 mm depth" },
      { label: "Cut Tolerance", value: "±1.0 mm linear accuracy" },
      { label: "Miter Range", value: "90° to 30° compound angles" },
      { label: "Finishing", value: "De-burred, stamped mark IDs" },
    ],
  },
  {
    id: "shaping",
    number: "03",
    title: "Shaping, CNC Profiling & Beveling",
    subtitle: "Complex geometry cut from heavy plate and structural members",
    description:
      "Using computerized multi-torch CNC flame cutting and high-definition plasma profiling, we shape raw steel plates into precision column base plates, stiffeners, connection gussets, and intricate architectural nodes straight from your CAD or Tekla drawings.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85",
    highlights: [
      "Multi-torch CNC gas & plasma profiling from 5mm to 120mm plate thickness",
      "Pre-weld beveling (V, X, and K bevels) ready for complete joint penetration",
      "Precise bolt hole drill coordination and circular cutouts",
      "Nesting optimization software to minimize customer raw material costs",
    ],
    specs: [
      { label: "Plate Thickness", value: "Up to 120 mm heavy plate" },
      { label: "Bed Dimensions", value: "3,000 mm x 12,000 mm" },
      { label: "Bevel Types", value: "Standard V, X, K, and J preparation" },
      { label: "File Ingestion", value: "DXF, DWG, Tekla DSTV NC data" },
    ],
  },
  {
    id: "sizing",
    number: "04",
    title: "Sizing, Leveling & Custom Preparation",
    subtitle: "Custom dimensional calibration and surface preparation",
    description:
      "Beyond standard mill lengths, Ferrite prepares custom-sized steel packages. From plate shearing and roller leveling to eliminate residual mill waviness, to surface blast cleaning and primer coating, we ensure steel lands on your site pre-conditioned for fabrication.",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1600&q=85",
    highlights: [
      "Hydraulic roller leveling for ultra-flat floor plates and machine tables",
      "Automated wheelabrator shot blasting to Swedish standard SA 2.5",
      "Application of red oxide or zinc chromate protective shop primer",
      "Piece-by-piece dimensional verification against customer fabrication lists",
    ],
    specs: [
      { label: "Leveling", value: "Hydraulic plate flattening up to 25 mm" },
      { label: "Surface Prep", value: "Shot blasting SA 2.5 profile" },
      { label: "Coating", value: "35-50 micron DFT primer application" },
      { label: "Verification", value: "QA report stamped with each dispatch" },
    ],
  },
];

