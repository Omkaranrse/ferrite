"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaqItem } from "@/types/blog";
import { HelpCircle } from "lucide-react";

interface ArticleContentProps {
  content: string;
  faqs?: FaqItem[];
}

export default function ArticleContent({ content, faqs }: ArticleContentProps) {
  const { theme, isMounted } = useTheme();
  const isLight = isMounted && theme === "light";
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Enhance tables: wrap each table in a responsive horizontal scroll container
    // and apply styling classes dynamically if needed
    if (!contentRef.current) return;
    const tables = contentRef.current.querySelectorAll("table");
    tables.forEach((table) => {
      if (table.parentElement && !table.parentElement.classList.contains("table-scroll-wrapper")) {
        const wrapper = document.createElement("div");
        wrapper.className = "table-scroll-wrapper my-8 overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10 shadow-sm";
        table.parentNode?.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      }
    });
  }, [content]);

  return (
    <div className="space-y-8">
      {/* Main Formatted HTML Body */}
      <div
        ref={contentRef}
        className={`editorial-article-content text-base sm:text-[17px] leading-[1.8] font-body transition-colors duration-300 ${
          isLight ? "text-slate-700" : "text-[#D1D5DB]"
        }`}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Structured FAQs Section (if structured faqs provided) */}
      {faqs && faqs.length > 0 && (
        <section className="pt-8 mt-12 border-t border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#FF7A1A]/10 border border-[#FF7A1A]/20 flex items-center justify-center text-[#FF7A1A]">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h3
              className={`font-heading text-xl sm:text-2xl font-bold tracking-tight ${
                isLight ? "text-slate-900" : "text-white"
              }`}
            >
              Frequently Asked Questions (Quick Reference)
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`p-5 sm:p-6 rounded-2xl border transition-colors ${
                  isLight
                    ? "bg-slate-50/80 border-slate-200"
                    : "bg-[#10151A] border-white/10"
                }`}
              >
                <h4
                  className={`font-heading text-sm sm:text-base font-bold mb-2.5 flex items-start gap-2 ${
                    isLight ? "text-slate-900" : "text-white"
                  }`}
                >
                  <span className="text-[#FF7A1A] font-mono">Q{idx + 1}.</span>
                  <span>{faq.question}</span>
                </h4>
                <p
                  className={`text-xs sm:text-sm leading-relaxed pl-6 font-normal ${
                    isLight ? "text-slate-600" : "text-[#9CA3AF]"
                  }`}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Scoped CSS for Article Content typography & Tables */}
      <style jsx global>{`
        .editorial-article-content h2 {
          font-family: var(--font-manrope), sans-serif;
          font-weight: 800;
          font-size: 1.65rem;
          line-height: 1.25;
          letter-spacing: -0.025em;
          margin-top: 2.75rem;
          margin-bottom: 1.25rem;
          scroll-margin-top: 100px;
        }
        @media (min-width: 640px) {
          .editorial-article-content h2 {
            font-size: 2rem;
          }
        }
        html.light .editorial-article-content h2 {
          color: #0F172A !important;
        }
        html:not(.light) .editorial-article-content h2 {
          color: #FFFFFF !important;
        }

        .editorial-article-content h3 {
          font-family: var(--font-manrope), sans-serif;
          font-weight: 700;
          font-size: 1.3rem;
          line-height: 1.35;
          letter-spacing: -0.02em;
          margin-top: 2rem;
          margin-bottom: 1rem;
          scroll-margin-top: 100px;
        }
        html.light .editorial-article-content h3 {
          color: #1E293B !important;
        }
        html:not(.light) .editorial-article-content h3 {
          color: #F8FAFC !important;
        }

        .editorial-article-content p {
          margin-bottom: 1.4rem;
        }

        .editorial-article-content strong {
          font-weight: 700;
        }
        html.light .editorial-article-content strong {
          color: #0F172A;
        }
        html:not(.light) .editorial-article-content strong {
          color: #FFFFFF;
        }

        .editorial-article-content a {
          color: #FF7A1A;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s;
        }
        .editorial-article-content a:hover {
          color: #FF882E;
        }

        .editorial-article-content ul,
        .editorial-article-content ol {
          margin-top: 1rem;
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .editorial-article-content ul {
          list-style-type: disc;
        }
        .editorial-article-content ol {
          list-style-type: decimal;
        }
        .editorial-article-content li {
          margin-bottom: 0.6rem;
        }

        /* ── Technical Data Tables ── */
        .editorial-article-content table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
          line-height: 1.5;
        }
        .editorial-article-content th,
        .editorial-article-content td {
          padding: 0.75rem 1rem;
          text-align: left;
          border-bottom-width: 1px;
        }
        .editorial-article-content tr:first-child td,
        .editorial-article-content thead th {
          font-family: var(--font-manrope), sans-serif;
          font-weight: 700;
          font-size: 0.8125rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* Dark Mode Tables */
        html:not(.light) .editorial-article-content tr:first-child td,
        html:not(.light) .editorial-article-content thead th {
          background-color: #171E26;
          color: #FF7A1A;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        }
        html:not(.light) .editorial-article-content td {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background-color: #0F1419;
          color: #CBD5E1;
        }
        html:not(.light) .editorial-article-content tr:nth-child(even) td {
          background-color: #121820;
        }

        /* Light Mode Tables */
        html.light .editorial-article-content tr:first-child td,
        html.light .editorial-article-content thead th {
          background-color: #F1F5F9;
          color: #C87940;
          border-bottom: 2px solid #CBD5E1;
        }
        html.light .editorial-article-content td {
          border-bottom: 1px solid #E2E8F0;
          background-color: #FFFFFF;
          color: #334155;
        }
        html.light .editorial-article-content tr:nth-child(even) td {
          background-color: #F8FAFC;
        }
      `}</style>
    </div>
  );
}

