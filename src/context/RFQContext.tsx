"use client";

import React, { createContext, useContext, useState } from "react";
import RFQModal from "@/components/ui/RFQModal";

interface RFQContextType {
  openRFQ: (defaultProduct?: string) => void;
  closeRFQ: () => void;
  isOpen: boolean;
}

const RFQContext = createContext<RFQContextType | undefined>(undefined);

export function RFQProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultProduct, setDefaultProduct] = useState<string | undefined>(undefined);

  const openRFQ = (product?: string) => {
    setDefaultProduct(product);
    setIsOpen(true);
  };

  const closeRFQ = () => {
    setIsOpen(false);
    setDefaultProduct(undefined);
  };

  return (
    <RFQContext.Provider value={{ openRFQ, closeRFQ, isOpen }}>
      {children}
      <RFQModal isOpen={isOpen} onClose={closeRFQ} defaultProduct={defaultProduct} />
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

