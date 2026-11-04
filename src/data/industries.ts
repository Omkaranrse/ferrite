export interface Industry {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  challengesSolved: string[];
  materialsSupplied: string[];
  keyApplications: string[];
}

export const industriesData: Industry[] = [
  {
    id: "construction",
    name: "Commercial & High-Rise Construction",
    tagline: "Core structural integrity for iconic urban skylines",
    description:
      "Modern high-rise towers, airport terminal concourses, and commercial developments demand certified structural steel capable of withstanding extreme lateral loads and seismic stresses. Ferrite supplies mill-certified columns, transfer beams, and shear-wall connectors with complete heat traceability.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    challengesSolved: [
      "Congested urban site delivery with staged, timed night dispatches",
      "Strict compliance with BIS seismic ductility standards (IS 13920)",
      "Millimeter tolerance on bolt-hole base plates and column splices",
    ],
    materialsSupplied: [
      "Heavy Universal Beams & Columns",
      "High-tensile Grade E350 Plates",
      "Fe 500D Seismic Rebars",
      "Square & Rectangular Hollow Sections",
    ],
    keyApplications: [
      "Composite steel-concrete high-rise columns",
      "Long-span roof trusses and atrium skylights",
      "Basement raft and foundation reinforcement",
      "Architectural perimeter curtain wall frameworks",
    ],
  },
  {
    id: "infrastructure",
    name: "Civil Infrastructure & Bridges",
    tagline: "Heavy-duty steel for national transportation arteries",
    description:
      "From highway flyovers and rail over-bridges (ROB) to metro transit viaducts, Ferrite supplies heavy structural plates and beams with ultrasonic testing compliance and protective coating systems built to withstand decades of harsh environmental exposure.",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=85",
    challengesSolved: [
      "Strict non-destructive testing (NDT/UT) and Charpy V-notch impact validation",
      "Large-scale bulk material staging for fast-tracked public works",
      "Coordination with government independent inspection engineers (RITES, EIL)",
    ],
    materialsSupplied: [
      "IS 2062 E350 C/D High Tensile Plates",
      "Parallel Flange Beams & Heavy ISMB Girders",
      "Heavy Angle Bracings & Web Stiffeners",
      "Chequered Bridge Footpath Deck Plates",
    ],
    keyApplications: [
      "Composite steel girder bridges and road over-bridges",
      "Metro station elevated steel structural portals",
      "High-mast utility poles and gantry signs",
      "Seismic shear keys and expansion joint plates",
    ],
  },
  {
    id: "fabrication",
    name: "Industrial Fabrication & PEB",
    tagline: "Tailored component supply for steel structure builders",
    description:
      "Pre-Engineered Building (PEB) fabricators and heavy structural workshops require materials delivered exactly to cut sizes to prevent shop bottlenecking. Ferrite combines raw steel stockholding with bandsaw cutting, plate profiling, and pre-drilled base plates.",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1600&q=85",
    challengesSolved: [
      "Minimizing workshop cutting scrap and material scrap rates",
      "Just-In-Time supply matching the fabricator's shop erection sequence",
      "Custom plate nesting that lowers total project tonnage expenditure",
    ],
    materialsSupplied: [
      "HR Coils & High-Tensile Structural Plates",
      "ISMC Channels for Purlins and Eaves",
      "Cold-Cut Equal Angles for Sag Rods and Ties",
      "CNC Profiled Connection Gussets & Base Plates",
    ],
    keyApplications: [
      "Logistics distribution centers and multi-bay warehouses",
      "Manufacturing plant factories and overhead crane bays",
      "Agricultural storage silos and processing plants",
      "Modular industrial mezzanines and catwalks",
    ],
  },
  {
    id: "industrial-manufacturing",
    name: "Industrial Manufacturing & Heavy Plant",
    tagline: "Robust steel foundations for process equipment and machinery",
    description:
      "Steel mills, cement factories, chemical plants, and heavy machinery makers rely on heavy structural sections and thick plate profiles capable of supporting intense dynamic vibrating loads, thermal cycles, and corrosive atmospheres.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85",
    challengesSolved: [
      "Heavy plate leveling to guarantee zero planar distortion for machine beds",
      "Specialized grade sourcing (Boiler Quality ASTM A516, Hardox/wear resistant)",
      "Protective priming and shot blast SA 2.5 against corrosive chemical vapours",
    ],
    materialsSupplied: [
      "Heavy Gauge Plates up to 120mm Thickness",
      "Boiler Quality & Pressure Vessel Plates",
      "Heavy Duty ISMB Beams & Welded Box Sections",
      "Seamless and Heavy-Wall ERW Piping",
    ],
    keyApplications: [
      "Heavy machinery base frames and vibration-isolated foundations",
      "Rotary kiln supports, blast furnace framework, and ducting",
      "Industrial boiler frameworks and heat exchanger skirts",
      "Overhead material handling conveyor trestles",
    ],
  },
];

