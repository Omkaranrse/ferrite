export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  image: string;
  profiles: string[];
  standards: string[];
  sizeRange: string;
  keyFeatures: string[];
  applications: string[];
  finishOptions: string[];
}

export const productsData: Product[] = [
  {
    id: "steel-angles",
    name: "Steel Angles",
    tagline: "Distinctive 'L' shape structural profiles for rigid framework",
    category: "Structural Profiles",
    description:
      "Steel angles, known for their distinctive 'L' shape, are fundamental components in modern construction and engineering.",
    image: "/images/products/angles-flats.png",
    profiles: [
      "Equal Angles (ISA 20x20 to 200x200)",
      "Unequal Angles (e.g. 100x65, 125x75)",
      "T-Sections & Cut Angles",
      "Heavy Duty Web Bracing Profiles",
    ],
    standards: ["IS 2062:2011 Grade A/B", "IS 808", "ASTM A36"],
    sizeRange: "20 x 20 x 3 mm up to 200 x 200 x 24 mm",
    keyFeatures: [
      "Exact 90-degree root fillet accuracy",
      "Excellent weldability and ductile behavior",
      "Uniform thickness across web and flange",
      "Bundled, tagged, and staged for site erection",
    ],
    applications: [
      "High-voltage electrical transmission towers",
      "Telecom masts and microwave antenna towers",
      "Roof trusses and space frame purlin struts",
      "Heavy industrial storage racking systems",
    ],
    finishOptions: ["Mill Finish", "Pre-punched Hole Prep", "Hot-Dip Galvanized (IS 4759)", "Primer Coated"],
  },
  {
    id: "steel-beams",
    name: "Steel Beams",
    tagline: "High load-bearing primary members for heavy structural frameworks",
    category: "Primary Structural",
    description:
      "Steel beams are structural supports commonly used in construction and engineering, made from steel.",
    image: "/images/products/structural-sections.png",
    profiles: [
      "MS I-Beams (ISMB 100 – 600)",
      "Universal Beams (UB) & Columns (UC)",
      "Parallel Flange Beams (NPB / WPB)",
      "H-Beams (Heavy Column Sections)",
      "JSPL Certified Mill Sections",
    ],
    standards: ["IS 2062:2011 (E250 / E350)", "IS 808:1989", "ASTM A36 / A992", "EN 10025-2 S355"],
    sizeRange: "75 x 40 mm to 600 x 200 mm (Custom heavy profiles up to 900mm upon order)",
    keyFeatures: [
      "High section modulus & flexural strength",
      "Supplied with manufacturer Mill Test Certificate (MTC)",
      "Precision cut-to-length service at Kalamboli yard",
      "Clean flanges ready for bolt connection or welding",
    ],
    applications: [
      "Pre-Engineered Buildings (PEB) & Industrial Warehouses",
      "High-rise commercial towers and transfer girders",
      "Railway and highway flyover superstructures",
      "Heavy industrial crane gantries & machinery bases",
    ],
    finishOptions: ["Mill Finish (Self Color)", "Shot Blasted SA 2.5", "Primer Coated", "Hot-Dip Galvanized"],
  },
  {
    id: "steel-channels",
    name: "Steel Channels",
    tagline: "High-rigidity C-profiles for purlins, girts, and structural framing",
    category: "Structural Profiles",
    description:
      "Steel channels are foundational components used extensively in the construction and manufacturing industries.",
    image: "/images/products/steel-channels.png",
    profiles: [
      "ISMC 75 x 40 mm to ISMC 400 x 100 mm",
      "Parallel Flange Channels (PFC)",
      "Gate Channels & Light Taper Sections",
      "Custom Slit Channels",
    ],
    standards: ["IS 2062:2011", "IS 1852 (Dimensional Tolerances)", "ASTM A36"],
    sizeRange: "Web height 75 mm to 400 mm; Flange width 40 mm to 100 mm",
    keyFeatures: [
      "High torsional and lateral deflection resistance",
      "Accurate web flatness conforming to IS 1852",
      "Custom lengths minimizing site wastage and splices",
      "Compatible with standard fastening clips and cleat angles",
    ],
    applications: [
      "PEB roof purlins and wall perimeter girts",
      "Commercial staircase stringers & landing supports",
      "Commercial transport and heavy vehicle trailer chassis",
      "Industrial machinery skid bases and platforms",
    ],
    finishOptions: ["Mill Finish", "Cut to Length", "Miter Cut for Frames", "Red Oxide Primed"],
  },
  {
    id: "steel-bars",
    name: "Steel Bars",
    tagline: "High-ductility reinforcing rebars and solid engineering bar stock",
    category: "Reinforcing & Merchant",
    description:
      "Steel bars, commonly referred to as reinforcement bars or rebars, are robust rods used extensively in the construction.",
    image: "/images/products/tmt-bars.png",
    profiles: [
      "Fe 500D & Fe 550D High Ductility Rebars",
      "Bright & Black Round Bars (MS & EN series)",
      "Square Solid Bars (10x10 to 80x80 mm)",
      "MS Flat Bars (Width 20 mm – 150 mm)",
    ],
    standards: ["IS 1786:2008 (Fe 500D / 550D)", "IS 2062:2011", "ASTM A615 Gr 60"],
    sizeRange: "TMT Rebars: 8 mm to 40 mm dia; Solid Rounds: 10 mm to 120 mm dia; Flats: 20x3 to 150x25 mm",
    keyFeatures: [
      "High ductility (>16% elongation) for high-seismic zones",
      "Superior bond strength with concrete matrix",
      "Corrosion-resistant variants (CRS) available",
      "Exact cut and bend bundles staged per bar bending schedule (BBS)",
    ],
    applications: [
      "High-rise RCC column and raft foundation reinforcement",
      "Bridge pier caps, abutments, and tunnel lining",
      "Machinery anchor bolts, tie rods, and threaded studs",
      "Architectural grilles, window guards, and industrial gates",
    ],
    finishOptions: ["Mill Finish (Ribbed)", "Cut & Bent to BBS", "Hot-Dip Galvanized", "Black Merchant Stock"],
  },
  {
    id: "steel-pipes",
    name: "Steel Pipes",
    tagline: "Torsion-resistant tubular sections for modern architectural forms",
    category: "Tubular Steel",
    description:
      "Steel pipes are a fundamental component widely utilized across various industries due to their durability, versatility, and high tensile strength.",
    image: "/images/products/pipes-tubes.png",
    profiles: [
      "Square Hollow Sections (SHS: 20x20 to 300x300)",
      "Rectangular Hollow Sections (RHS: 40x20 to 400x200)",
      "Circular Hollow Sections (CHS / Round Tubes)",
      "MS ERW & Seamless Heavy-Wall Pipes",
    ],
    standards: ["IS 4923 (YSt 210 / 310 / 355)", "IS 1161", "IS 1239 (Part 1 & 2)", "ASTM A500 Gr B"],
    sizeRange: "SHS/RHS: 20x20 mm up to 300x300 mm (Wall: 1.6 mm – 16 mm); CHS: 1/2\" to 24\" NB",
    keyFeatures: [
      "Superior strength-to-weight ratio against multi-directional loads",
      "Seamless and clean corner radiuses for architectural facades",
      "High torsional resistance ideal for space structures",
      "Pressure tested with hydro-test certificates available",
    ],
    applications: [
      "Airport concourses, sports stadiums & canopy roofs",
      "Architectural facade curtain-wall mullions",
      "Industrial piping networks, HVAC, and cooling conduits",
      "Material handling conveyors and automated crane booms",
    ],
    finishOptions: ["Black Plain End (PE)", "Beveled End (BE)", "Galvanized (GI)", "Epoxy Coated"],
  },
  {
    id: "steel-sheets",
    name: "Steel Sheets",
    tagline: "Thin and medium flat-rolled steel for manufacturing and fabrication",
    category: "Flat Rolled",
    description:
      "Steel sheets are a fundamental component in a variety of industries, prized for their versatility, durability, and strength.",
    image: "/images/products/steel-sheets.webp",
    profiles: [
      "Hot Rolled (HR) Steel Sheets",
      "Cold Rolled (CR) Steel Sheets",
      "Galvanized Plain (GP) Sheets",
      "Chequered Floor Sheets (Tear Drop)",
      "Custom Precision Sheared Blanks",
    ],
    standards: ["IS 2062:2011", "IS 1079 (HR)", "IS 513 (CR)", "ASTM A1011"],
    sizeRange: "Thickness: 0.5 mm to 4.5 mm | Width: 900 mm to 2000 mm | Cut to custom lengths",
    keyFeatures: [
      "Uniform sheet gauge thickness & low crown",
      "Smooth pickled & oiled (HRPO) surface available",
      "High formability and deep drawing capability",
      "Clean square sheared edges ready for stamping or folding",
    ],
    applications: [
      "Automotive components, bus bodies & chassis panels",
      "Industrial enclosures, electrical panels & cabinets",
      "HVAC ductwork, roofing panels & cladding",
      "Domestic appliance housings and metal furniture",
    ],
    finishOptions: ["Mill Finish", "Pickled & Oiled (HRPO)", "Galvanized (GI)", "Cold Rolled Bright"],
  },
  {
    id: "steel-plates",
    name: "Steel Plates",
    tagline: "Structural and high-tensile plates with custom CNC profiling",
    category: "Flat Rolled",
    description:
      "Steel plates are a fundamental component in a variety of industries, prized for their load-bearing capacity, versatility, durability, and strength.",
    image: "/images/products/plates-sheets.png",
    profiles: [
      "Hot Rolled (HR) Structural Plates",
      "Tear-drop Chequered Floor Plates",
      "Boiler Quality (BQ) & Pressure Vessel Plates",
      "High Tensile Plates (SAILMA / Hardox equivalents)",
      "Custom CNC Profiled Gussets & Base Plates",
    ],
    standards: ["IS 2062 E250 / E350 BR/BO", "ASTM A516 Gr 70", "SAILMA 350 / 410 HI", "IS 3502 (Chequered)"],
    sizeRange: "Thickness: 5 mm to 120 mm | Width: up to 2500 mm | Length: up to 12,500 mm",
    keyFeatures: [
      "Strict ultrasonic flaw testing (UT) availability",
      "High surface finish with low residual rolling stress",
      "Beveled edge preparation for multi-pass welds",
      "Complete heat number traceability stamped on each piece",
    ],
    applications: [
      "Structural column base plates and stiffener gussets",
      "Bridge pier bearings and girder diaphragm plates",
      "Heavy industrial machinery frames and press tables",
      "Slip-resistant walkways, trenches, and factory mezzanines",
    ],
    finishOptions: ["Mill Finish", "CNC Gas / Plasma Cut", "Edge Beveled", "Shot Blasted"],
  },
];
