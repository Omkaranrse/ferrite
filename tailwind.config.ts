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
        industrial: {
          dark: "#111619",
          surface: "#202629",
          orange: "#C87940",
          accent: "#F28A35",
          text: "#F5F3EF",
          muted: "#A9AFB2",
          border: "rgba(255, 255, 255, 0.12)",
        },
        graphite: {
          950: "#0D0E10",
          900: "#111619",
          DEFAULT: "#17191B",
          800: "#202629",
        },
        charcoal: {
          DEFAULT: "#202629",
          light: "#2A2E33",
          border: "#343940",
        },
        steel: {
          dark: "#4C5156",
          DEFAULT: "#858B90",
          light: "#A9AFB2",
          ultralight: "#D8DCDE",
        },
        offwhite: {
          DEFAULT: "#F5F3EF",
          card: "#EBE9E2",
          border: "#DDD9CE",
          dark: "#D1CCC0",
        },
        copper: {
          light: "#F28A35",
          DEFAULT: "#C87940",
          dark: "#A45F31",
          hover: "#B56B33",
          glow: "rgba(200, 121, 64, 0.18)",
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
