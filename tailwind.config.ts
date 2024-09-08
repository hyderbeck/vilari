import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // "rgb(222, 228, 218)"
  theme: {
    extend: {
      colors: {
        "vlr-black": "rgb(26, 25, 25)",
        "vlr-black-main": "rgb(83, 83, 83)",
        "vlr-white-main": "rgb(232, 234, 227)",
        "vlr-white": "rgb(123, 149, 106)",
        "vlr-grey": "rgb(198, 197, 197)",
      },
      screens: {
        xs: "480px",
      },
      backgroundImage: {
        "vlr-pattern": "url('../public/vlr-white.svg')",
      },
    },
  },
  plugins: [],
};
export default config;
