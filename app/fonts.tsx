import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["100", "200", "300", "400"],
});

export const atteron = localFont({
  src: "fonts/atteron.ttf",
  display: "swap",
});
