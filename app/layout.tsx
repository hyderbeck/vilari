import type { Metadata } from "next";
import { inter } from "./fonts";
import "./globals.css";
import Footer from "@/components/footer";

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
        className={`${inter.className} font-light text-sm tracking-wide flex flex-col gap-y-12 justify-between min-h-screen`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
