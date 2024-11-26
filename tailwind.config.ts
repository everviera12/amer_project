import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        "amer-ubuntu-sans": ["Ubuntu Sans", "Arial"]
      }
    },
  },
  plugins: [],
} satisfies Config;
