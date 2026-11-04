# Ferrite Structural Steels Pvt. Ltd. — Corporate Website

> **"Structural Steel. Prepared for Purpose."**  
> Business lineage dating back to 1965.

A modern, high-performance industrial corporate website and B2B lead-generation platform for **Ferrite Structural Steels Pvt. Ltd.** built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, GSAP ScrollTrigger, and Lenis smooth scrolling.

---

## 🏗️ Company Overview

Ferrite Structural Steels Pvt. Ltd. (formerly Payal Enterprises Pvt. Ltd.) is a structural steel supplier and material-processing partner based in Mumbai, India. The company combines primary steel stockholding with precision cutting, shaping, and custom sizing.

### Operational Hubs
* **Commercial Headquarters (Ghatkopar, Mumbai)**: 8th Floor, 803/B Wing, Excel Plaza, 90 Feet Road, Pant Nagar, Ghatkopar East, Mumbai 400075. Enquiries, commercial contracting, estimations, and order coordination.
* **Warehousing & Processing Facility (Kalamboli, Navi Mumbai)**: Plot No. 18 (Bina Complex), KWC, Kalamboli, Navi Mumbai 410218. Heavy stockholding, 20-ton overhead crane handling, semi-automatic bandsaw cutting, CNC flame profiling, and Pan-India staged dispatch.
* **Direct Contacts**: `+91 88283 35168` / `+91 99207 77336` • `contact@ferrite.in`

---

## 🎨 Design System: "Industrial Luxury + Minimal Editorial"

* **Graphite** (`#17191B`): Primary dark canvas.
* **Deep Charcoal** (`#202326`): Secondary dark surface for spec cards.
* **Steel Grey** (`#858B90`): Technical metadata and dividers.
* **Off White** (`#F4F3EF`): Light architectural contrast sections.
* **Industrial Copper** (`#C47A48`): Focused interactive accent.
* **Typography**: Space Grotesk (Headings), Inter (Body & Specifications), DM Sans (Editorial).

---

## 🚀 Pages & Structure

1. **Home (`/`)**: 10 bespoke sections (Sticky dynamic nav, Cinematic Hero, Company Intro with 1965/2014 counters, Product Grid, Capabilities, Horizontal/Vertical Approach Timeline, Industries, Dual Hub Facilities, Contact CTA with RFQ, Architectural Footer).
2. **About Us (`/about`)**: Company history, Payal Enterprises lineage, quality testing, and milestone timeline.
3. **Products (`/products`)**: Filterable material catalog with live search, technical grade specifications, dimension ranges, and instant quotation actions.
4. **Processing & Capabilities (`/capabilities`)**: Deep dive into stockholding, cutting, shaping, and custom sizing.
5. **Industries (`/industries`)**: Construction, infrastructure, PEB fabrication, and manufacturing applications.
6. **Contact Us (`/contact`)**: Interactive facility tabs, direct coordinates, and a complete Request-For-Quote form with real-time feedback.
7. **Global Slide-Over RFQ Drawer**: Accessible from any CTA or button across the entire site.

---

## 🔍 SEO & Structured Data (Phase 3)

* **Unique Metadata**: Distinct titles, meta descriptions, canonical URLs, and OpenGraph images across all routes.
* **Semantic Hierarchy**: Exactly one H1 per page, structured H2/H3 tags, and descriptive image alt tags.
* **XML Sitemap & Robots**: Dynamically generated at `/sitemap.xml` and `/robots.txt`.
* **JSON-LD Schemas**:
  * `Organization`: Full company entity metadata, founding year (1965), legal name, and contacts.
  * `LocalBusiness`: Dual location schemas for Ghatkopar Commercial Office and Kalamboli Processing Yard.
  * `WebSite`: Publisher linkage and search action schema.
  * `BreadcrumbList`: Structured breadcrumbs on subpages.

---

## 💼 Direct Communication Channels (Phase 3)

The website is an informational corporate platform with zero backend/database dependencies, directing buyers directly to verified channels:

* **WhatsApp Integration (`wa.me`)**:
  * Verified WhatsApp Number: `+91 88283 35168`
  * Floating WhatsApp button with instant chat tooltip across desktop & mobile.
  * Pre-filled message prompts for general quotes, custom sizing, and individual product specifications.
* **Direct Email (`mailto:`)**:
  * Verified Official Email: `contact@ferrite.in`
  * Pre-filled technical transmittal subjects for CAD drawings (.dwg, .dxf) and Bill of Quantities (BOQ).
* **Click-to-Call Phone (`tel:`)**:
  * Commercial Desk (Ghatkopar HQ): `+91 88283 35168`
  * Material Yard & Logistics (Kalamboli): `+91 99207 77336`
* **Verified Social Media**:
  * Official LinkedIn corporate profile.
* **B2B Event Tracking (GA4)**:
  * Dispatches custom events: `whatsapp_click`, `quote_cta_click`, `product_enquiry_click`, `phone_click`, `email_click`, `social_click`.

---

## 🛠️ Environment Configuration

Copy `.env.example` to `.env.local` to configure optional integrations:

```bash
# Canonical Site URL
NEXT_PUBLIC_SITE_URL=https://ferrite.in

# Google Analytics 4 Measurement ID (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Search Console Verification (Optional)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

---

## 💻 Getting Started

### Installation
```bash
# Clone the repository
git clone https://github.com/Omkaranrse/ferrite.git
cd ferrite

# Install dependencies
npm install

# Run development server
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

---

## 📜 Compliance & Verification

© 2026 Ferrite Structural Steels Pvt. Ltd. (Formerly Payal Enterprises Pvt. Ltd. — Lineage Est. 1965). All rights reserved.  
All materials conform to Bureau of Indian Standards (IS 2062, IS 808, IS 1852, IS 4923, IS 1786) and ASTM standards with 100% Mill Test Certificates (MTC).
