import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  variant?: "dark" | "light" | "white";
  showSubtext?: boolean;
}

export default function BrandLogo({
  className,
  variant = "white",
  showSubtext = true,
}: BrandLogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-3.5 select-none focus:outline-none",
        className
      )}
      aria-label="Ferrite Structural Steels Pvt. Ltd. Home"
    >
      {/* Engineered I-Beam / Architectural Monogram */}
      <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform duration-500 group-hover:scale-105"
        >
          {/* Outer framing box */}
          <rect
            x="1.5"
            y="1.5"
            width="33"
            height="33"
            stroke={isLight ? "#202326" : "#858B90"}
            strokeWidth="1.25"
            className="transition-colors duration-300 group-hover:stroke-copper"
          />
          {/* Structural I-Beam Profile */}
          {/* Top Flange */}
          <path
            d="M8 8H28"
            stroke={isLight ? "#17191B" : "#FFFFFF"}
            strokeWidth="2.5"
            strokeLinecap="square"
          />
          {/* Vertical Web */}
          <path
            d="M18 8V28"
            stroke={isLight ? "#17191B" : "#FFFFFF"}
            strokeWidth="2.5"
          />
          {/* Bottom Flange */}
          <path
            d="M8 28H28"
            stroke={isLight ? "#17191B" : "#FFFFFF"}
            strokeWidth="2.5"
            strokeLinecap="square"
          />
          {/* Mid Accent Notch (Industrial Copper) */}
          <rect
            x="14"
            y="15.5"
            width="8"
            height="5"
            fill="#C47A48"
            className="transition-opacity duration-300 group-hover:opacity-100 opacity-90"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "font-heading font-bold text-lg sm:text-xl tracking-[0.14em] uppercase transition-colors duration-300",
              isLight ? "text-graphite" : "text-white group-hover:text-white"
            )}
          >
            FERRITE
          </span>
          <span className="w-1.5 h-1.5 rounded-none bg-copper rotate-45 inline-block" />
        </div>
        {showSubtext && (
          <span
            className={cn(
              "text-[9px] uppercase tracking-[0.2em] font-medium transition-colors",
              isLight ? "text-steel-dark" : "text-steel group-hover:text-steel-light"
            )}
          >
            Structural Steels Pvt. Ltd.
          </span>
        )}
      </div>
    </Link>
  );
}

