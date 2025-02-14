import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        "primary-foreground": "#FFFFFF",

        secondary: "#666666",
        "secondary-foreground": "#FFFFFF",

        background: "#F8F8F8",
        foreground: "#111111",

        border: "#D4D4D4",
        "border-muted": "#9E9E9E",

        accent: "#E5E7EB",
        "accent-foreground": "#000000",

        muted: "#9E9E9E",
        "muted-foreground": "#444444",

        destructive: "#DC2626",
        "destructive-foreground": "#FFFFFF",

        success: "#16A34A",
        warning: "#FACC15",
        info: "#3B82F6",
      },
      fontFamily: {},
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
