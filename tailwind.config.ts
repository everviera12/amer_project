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
        "amer-ubuntu-sans": ["Ubuntu Sans", "Arial"],
      },
      backgroundImage: {
        "amer-logo": "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('/amer_logo.png')",
      },
    },
  },
  plugins: [],
} satisfies Config;
