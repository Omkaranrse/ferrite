export interface LocationHub {
  id: string;
  name: string;
  type: string;
  headline: string;
  address: string[];
  city: string;
  pinCode: string;
  phone: string[];
  email: string;
  hours: string;
  coordinates: { lat: number; lng: number; label: string };
  scope: string[];
  features: string[];
}

export const locationsData: LocationHub[] = [
  {
    id: "ghatkopar",
    name: "Ghatkopar",
    type: "Commercial Headquarters & Sales Office",
    headline: "Centralized commercial coordination, estimations, and project consulting.",
    address: [
      "8th Floor, 803/B Wing, Excel Plaza",
      "90 Feet Road, Pant Nagar, Ghatkopar East",
      "Mumbai, Maharashtra 400075",
    ],
    city: "Mumbai",
    pinCode: "400075",
    phone: ["+91 88283 35168", "+91 99207 77336"],
    email: "contact@ferrite.in",
    hours: "Monday – Saturday: 09:30 AM – 06:30 PM",
    coordinates: {
      lat: 19.0838,
      lng: 72.9095,
      label: "19.0838° N, 72.9095° E",
    },
    scope: [
      "Project material estimations and Bill of Quantities (BOQ) review",
      "Commercial contract structuring and mill pricing tie-ups",
      "Dedicated account managers for infrastructure and industrial clients",
      "Quality documentation, Mill Test Certificate (MTC) dispatch, and compliance",
    ],
    features: [
      "Executive conference rooms for drawing review meetings",
      "Direct digital link to Kalamboli inventory management systems",
      "Finance, billing, and credit facility administration",
    ],
  },
  {
    id: "kalamboli",
    name: "Kalamboli",
    type: "Warehousing, Processing & Logistics Facility",
    headline: "Heavy structural yard equipped with overhead cranes and precision cutting.",
    address: [
      "Plot No. 18 (Bina Complex), KWC",
      "(Kalamboli Warehousing Complex), Opp. Gurukripa Hotel",
      "Kalamboli, Navi Mumbai, Dist. Raigad 410218",
    ],
    city: "Navi Mumbai",
    pinCode: "410218",
    phone: ["+91 88283 35168", "+91 99207 77336"],
    email: "contact@ferrite.in",
    hours: "Monday – Saturday: 08:30 AM – 07:30 PM (Staged dispatches 24/7 as required)",
    coordinates: {
      lat: 19.0345,
      lng: 73.0991,
      label: "19.0345° N, 73.0991° E",
    },
    scope: [
      "Heavy stockholding of beams, angles, channels, plates, and hollow sections",
      "Semi-automatic bandsaw precision cutting and miter sawing",
      "CNC flame profiling, plate shearing, beveling, and leveling",
      "24/7 highway-connected logistics dispatch across Maharashtra and Pan-India",
    ],
    features: [
      "20-ton overhead gantry cranes for damage-free handling",
      "Electronic weighbridge with calibrated accuracy",
      "Direct access to Mumbai-Pune Expressway & JNPT Port corridor",
    ],
  },
];

