import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "vlr-white": "rgb(232, 234, 227)",
      },
      screens: {
        xs: "480px",
      },
      backgroundImage: {
        "vlr-ptrn": "url('../public/pattern.svg')",
      },
    },
  },
  plugins: [],
};
export default config;
