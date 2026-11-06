"use client";

import React, { useEffect, useState } from "react";
import { TableOfContentsItem } from "@/types/blog";
import { useTheme } from "@/context/ThemeContext";
import { ListFilter, ChevronDown } from "lucide-react";

interface ArticleTableOfContentsProps {
  headings: TableOfContentsItem[];
}

export default function ArticleTableOfContents({
  headings,
}: ArticleTableOfContentsProps) {
  const { theme, isMounted } = useTheme();
  const isLight = isMounted && theme === "light";
  const [activeId, setActiveId] = useState<string>("");
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -65% 0%",
        threshold: 0.1,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const offset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
      setIsOpenMobile(false);
    }
  };

  const navContent = (
    <ul className="space-y-2 text-xs">
      {headings.map((heading) => {
        const isActive = activeId === heading.id;
        return (
          <li
            key={heading.id}
            style={{ paddingLeft: heading.level === 3 ? "1rem" : "0" }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleLinkClick(e, heading.id)}
              className={`block py-1 transition-all duration-200 line-clamp-2 ${
                isActive
                  ? "text-[#FF7A1A] font-bold translate-x-1"
                  : isLight
                    ? "text-slate-600 hover:text-slate-950"
                    : "text-steel hover:text-white"
              }`}
            >
              {heading.text}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Mobile Collapsible TOC */}
      <div className="lg:hidden mb-8">
        <button
          type="button"
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className={`w-full flex items-center justify-between p-4 rounded-xl border text-xs font-heading font-bold uppercase tracking-wider transition-colors ${
            isLight
              ? "bg-slate-50 border-slate-200 text-slate-800"
              : "bg-[#10151A] border-white/10 text-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <ListFilter className="w-4 h-4 text-[#FF7A1A]" />
            <span>Table of Contents ({headings.length} sections)</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpenMobile ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpenMobile && (
          <div
            className={`mt-2 p-4 rounded-xl border max-h-80 overflow-y-auto ${
              isLight
                ? "bg-white border-slate-200 shadow-lg"
                : "bg-[#10151A] border-white/10 shadow-xl"
            }`}
          >
            {navContent}
          </div>
        )}
      </div>

      {/* Desktop Sticky Sidebar TOC */}
      <nav
        aria-label="Table of contents"
        className={`hidden lg:block sticky top-28 rounded-2xl p-6 border transition-colors ${
          isLight
            ? "bg-slate-50/70 border-slate-200"
            : "bg-[#10151A]/80 border-white/10 backdrop-blur-md"
        }`}
      >
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-200 dark:border-white/10">
          <ListFilter className="w-4 h-4 text-[#FF7A1A]" />
          <span
            className={`font-heading text-xs font-bold uppercase tracking-wider ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            Table of Contents
          </span>
        </div>

        <div className="max-h-[calc(100vh-220px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-copper/30">
          {navContent}
        </div>
      </nav>
    </>
  );
}

