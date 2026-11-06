"use client";

import React, { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setCompletion(
          Number((currentProgress / scrollHeight).toFixed(3)) * 100
        );
      }
    };

    window.addEventListener("scroll", updateScrollCompletion, { passive: true });
    updateScrollCompletion();

    return () => {
      window.removeEventListener("scroll", updateScrollCompletion);
    };
  }, []);

  return (
    <div
      className="fixed top-0 inset-x-0 z-[60] h-[3px] bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-[#FF7A1A] via-[#FF882E] to-[#FFB070] transition-all duration-150 ease-out shadow-[0_0_12px_#FF7A1A]"
        style={{ width: `${Math.min(100, Math.max(0, completion))}%` }}
      />
    </div>
  );
}

