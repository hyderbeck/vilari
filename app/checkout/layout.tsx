import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vilari | Оформление заказа",
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header layout="checkout" />
      {children}
    </>
  );
}
