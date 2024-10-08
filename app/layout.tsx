import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["200", "300", "400"],
});

export const metadata: Metadata = {
  title: "Vilari",
  description: "Посуда и декор от Seletti, Bitossi, ИФЗ и других брендов",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} font-light text-sm tracking-wide flex flex-col gap-y-12 justify-between bg-white min-h-screen`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
