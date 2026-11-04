import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: "#0D0E10",
          900: "#111315",
          DEFAULT: "#17191B",
          800: "#1E2124",
        },
        charcoal: {
          DEFAULT: "#202326",
          light: "#2A2E33",
          border: "#343940",
        },
        steel: {
          dark: "#4C5156",
          DEFAULT: "#858B90",
          light: "#B6BBC0",
          ultralight: "#D8DCDE",
        },
        offwhite: {
          DEFAULT: "#F4F3EF",
          card: "#EBE9E2",
          border: "#DDD9CE",
          dark: "#D1CCC0",
        },
        copper: {
          light: "#DB9564",
          DEFAULT: "#C47A48",
          dark: "#A45F31",
          hover: "#B36B3B",
          glow: "rgba(196, 122, 72, 0.15)",
        },
      },
      fontFamily: {
        heading: ["'Space Grotesk'", "system-ui", "-apple-system", "sans-serif"],
        body: ["'Inter'", "system-ui", "-apple-system", "sans-serif"],
        editorial: ["'DM Sans'", "system-ui", "-apple-system", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.2em",
        tightest: "-0.04em",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "industrial-mesh": "radial-gradient(circle at 1px 1px, rgba(133, 139, 144, 0.12) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};

export default config;
