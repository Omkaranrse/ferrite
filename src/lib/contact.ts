/**
 * Verified Contact & Communication Channels for Ferrite Structural Steels Pvt. Ltd.
 * Informational corporate website configuration with zero backend/database dependency.
 */

export const FERRITE_CONTACT = {
  companyName: "Ferrite Structural Steels Pvt. Ltd.",
  lineageYear: 1965,
  cin: "U27100MH2014PTC254823",

  // Verified Official Contact Details
  phone: "+91 88283 35168",
  phoneRaw: "+918828335168",
  phoneDisplay: "+91 88283 35168",

  phoneSecondary: "+91 99207 77336",
  phoneSecondaryRaw: "+919920777336",
  phoneSecondaryDisplay: "+91 99207 77336",

  whatsappNumber: "918828335168",
  whatsappDisplay: "+91 88283 35168",

  email: "contact@ferrite.in",

  // Verified Social Media
  linkedin: "https://www.linkedin.com/company/ferrite-structural-steels",

  // Verified Operational Facilities
  ghatkopar: {
    name: "Ghatkopar (Head Office & Commercial Desk)",
    address: "Excel Plaza, 803/B wing, 90 Feet Rd, Pant Nagar, Ghatkopar East, Mumbai, Maharashtra 400075",
    pinCode: "400075",
    phone: "+91 88283 35168",
    phoneRaw: "+918828335168",
    email: "contact@ferrite.in",
    hours: "Monday – Saturday: 09:30 AM – 06:30 PM",
  },
  kalamboli: {
    name: "Kalamboli (Processing Complex & Steel Stockyard)",
    address: "Plot 18, Bina Complex, KWC (Kalamboli Warehousing Complex), Opp. Gurukripa Hotel, Kalamboli, Navi Mumbai, Dist. Raigad, Maharashtra 410218",
    pinCode: "410218",
    phone: "+91 99207 77336",
    phoneRaw: "+919920777336",
    email: "contact@ferrite.in",
    hours: "Monday – Saturday: 08:30 AM – 07:30 PM (Dispatches 24/7 as required)",
  },

  // Helper generators
  defaultWhatsAppMessage:
    "Hello Ferrite Team, I would like to enquire about your structural steel products and services.",

  getWhatsAppUrl(customMessage?: string): string {
    const msg = customMessage || this.defaultWhatsAppMessage;
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  },

  getProductWhatsAppUrl(productName: string): string {
    const msg = `Hello Ferrite Team, I would like to enquire about ${productName} (specifications, stock availability, and quotation).`;
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  },

  getTelUrl(phoneNumber?: string): string {
    return `tel:${phoneNumber || this.phoneRaw}`;
  },

  getEmailUrl(subject?: string, body?: string): string {
    const sub = subject || "Quotation Request & Technical Specifications — Ferrite Structural Steels";
    const bod =
      body ||
      "Hello Ferrite Team,\n\nPlease find our material requirement details below:\n\nCompany Name:\nContact Person & Phone:\nProject Location / Delivery Site:\nMaterial Required (Sections / Plates / Beams):\nEstimated Tonnage (MT):\nProcessing Needed (Cutting / Profiling / None):\n\n(We have attached our drawings / BOQ for estimation).\n\nThank you.";
    return `mailto:${this.email}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(bod)}`;
  },
};

