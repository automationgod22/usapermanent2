import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { ink: "#211d1b", cream: "#f5f0e9", rose: "#b56b5d", blush: "#d9b9ae", olive: "#5d6253" },
      fontFamily: { display: ["var(--font-cormorant)"], sans: ["var(--font-inter)"] }
    }
  },
  plugins: []
};

export default config;
