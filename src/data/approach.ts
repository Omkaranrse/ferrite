export interface ApproachStep {
  step: string;
  title: string;
  summary: string;
  description: string;
  deliverables: string[];
  timing: string;
}

export const approachSteps: ApproachStep[] = [
  {
    step: "01",
    title: "Understand the Application",
    summary: "Identify intended structural use and project environmental conditions.",
    description:
      "We begin by understanding where and how the steel will function — whether for high-seismic towers, heavy-vibration plant floors, or coastal infrastructure. This ensures the baseline metallurgical chemistry and mechanical properties match structural reality.",
    deliverables: [
      "Load & environmental exposure review",
      "Structural profile suitability assessment",
      "Preliminary material schedule alignment",
    ],
    timing: "Day 01",
  },
  {
    step: "02",
    title: "Review Specifications",
    summary: "Evaluate structural drawings, standard grades, and tolerance limits.",
    description:
      "Our technical team inspects structural drawings, Tekla models, and Bill of Quantities (BOQ). We confirm BIS/ASTM codes (IS 2062, ASTM A36, IS 1852), yield requirements (E250/E350), Charpy impact values, and non-destructive testing requirements.",
    deliverables: [
      "Grade verification and mill compatibility check",
      "Section sizing and length schedule breakdown",
      "Ultrasonic & dimensional inspection criteria",
    ],
    timing: "Days 01 – 02",
  },
  {
    step: "03",
    title: "Define Processing",
    summary: "Establish precision cutting, shaping, and custom sizing requirements.",
    description:
      "We map out value-added processing at our Kalamboli yard. We plan bandsaw cut lengths to eliminate site scrap, program CNC flame/plasma plate profiling for base plates and gussets, configure bevel weld preps, and plan surface primer coating.",
    deliverables: [
      "Cut-to-length and miter cutting nesting sheets",
      "CNC plate profiling CAD/CAM nesting optimization",
      "Staging tags per erection mark number",
    ],
    timing: "Days 02 – 04",
  },
  {
    step: "04",
    title: "Coordinate Supply",
    summary: "Align material handling, staged dispatch, and site delivery scope.",
    description:
      "Steel is prepared, weighed on calibrated electronic scales, bundled with durable weather-resistant identification tags, and accompanied by original Mill Test Certificates (MTC). Dispatches are staged in sync with your site erection schedule.",
    deliverables: [
      "Bundled, color-coded & marked structural packages",
      "Original Mill Test Certificates (MTC) linked to heat numbers",
      "Real-time GPS transit tracking from Kalamboli yard to site",
    ],
    timing: "On-schedule JIT delivery",
  },
];

