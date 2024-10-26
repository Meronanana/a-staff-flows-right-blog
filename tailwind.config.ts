import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "white-lg":
          "0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)",
      },
      colors: {
        burgundy: {
          100: "#f8e3e7",
          200: "#f1c7d0",
          300: "#5c0b33",
          400: "#4b0929",
          DEFAULT: "#38030e",
          600: "#2f0324",
          700: "#26021a",
          800: "#1d0110",
          900: "#140106",
        },
      },
      fontFamily: {
        sans: ["Pretendard"],
        serif: ["Heiro"],
      },
      inset: {
        "showcase-bar-port": "calc(50vh + 25vw)",
        "showcase-bar-land": "calc(50vh + 25vh)",
      },
      screens: {},
      spacing: {
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
      },
    },
  },
  plugins: [],
};

export default config;
