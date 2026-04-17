import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#102016",
        mist: "#f4faf6",
        brand: {
          50: "#eefaf2",
          100: "#d7f2e1",
          200: "#b2e5c5",
          300: "#82d29f",
          400: "#4db577",
          500: "#1f8f55",
          600: "#167346",
          700: "#115b38"
        },
        accent: "#2f9d62",
        gold: "#c79f52"
      },
      boxShadow: {
        soft: "0 26px 70px rgba(16, 32, 22, 0.12)",
        lift: "0 18px 44px rgba(16, 32, 22, 0.12)"
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top left, rgba(31, 143, 85, 0.22), transparent 34%), radial-gradient(circle at bottom right, rgba(125, 181, 146, 0.18), transparent 34%)"
      }
    }
  },
  plugins: []
} satisfies Config;
