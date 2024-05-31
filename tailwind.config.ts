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

      colors: {
        "main-burgundy": "#38030e",
        "deep-burgundy": "#1b0106",
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
