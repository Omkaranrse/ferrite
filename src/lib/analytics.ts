// Google Analytics 4 & B2B Conversion Event Tracking Utilities

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "set" | "js",
      targetIdOrEventName: string | Date,
      eventParams?: Record<string, unknown>
    ) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type ConversionEvent =
  | { name: "quote_cta_click"; params: { location: string; product?: string } }
  | { name: "discuss_requirements_click"; params: { location: string; section?: string } }
  | { name: "product_enquiry_click"; params: { product_name: string; category: string } }
  | { name: "contact_form_submit"; params: { form_id: string; product_category: string; tonnage?: string } }
  | { name: "phone_click"; params: { phone_number: string; hub: "ghatkopar" | "kalamboli" | "general" } }
  | { name: "email_click"; params: { email_address: string; hub: "ghatkopar" | "kalamboli" | "general" } }
  | { name: "specification_download"; params: { document_name: string } }
  | { name: "drawing_upload"; params: { file_name: string; file_size_kb: number } };

/**
 * Dispatches a B2B conversion event to Google Analytics 4 (if configured)
 */
export function trackEvent({ name, params }: ConversionEvent) {
  if (typeof window !== "undefined" && typeof window.gtag === "function" && GA_MEASUREMENT_ID) {
    window.gtag("event", name, {
      ...params,
      send_to: GA_MEASUREMENT_ID,
    });
  } else if (process.env.NODE_ENV === "development") {
    console.debug(`[Analytics Event: ${name}]`, params);
  }
}
