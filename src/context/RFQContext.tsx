"use client";

import React, { createContext, useContext, useState } from "react";
import { FERRITE_CONTACT } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

interface RFQContextType {
  openRFQ: (defaultProduct?: string) => void;
  closeRFQ: () => void;
  isOpen: boolean;
}

const RFQContext = createContext<RFQContextType | undefined>(undefined);

export function RFQProvider({ children }: { children: React.ReactNode }) {
  // Directly opens WhatsApp with the verified pre-filled enquiry message
  const openRFQ = (product?: string) => {
    trackEvent({
      name: "whatsapp_click",
      params: {
        location: "open_rfq_trigger",
        message_type: product ? "product_enquiry" : "quote_request",
        product: product || "general",
      },
    });

    const targetUrl = product
      ? FERRITE_CONTACT.getProductWhatsAppUrl(product)
      : FERRITE_CONTACT.getWhatsAppUrl();

    if (typeof window !== "undefined") {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }
  };

  const closeRFQ = () => {
    // No-op for direct communication flow
  };

  return (
    <RFQContext.Provider value={{ openRFQ, closeRFQ, isOpen: false }}>
      {children}
    </RFQContext.Provider>
  );
}

export function useRFQ() {
  const context = useContext(RFQContext);
  if (!context) {
    throw new Error("useRFQ must be used within an RFQProvider");
  }
  return context;
}
