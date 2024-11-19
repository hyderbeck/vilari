import Header from "@/components/header";
import { title } from "@/app/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: title + "Оформление заказа",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header className="fixed top-0 right-0 left-0 z-10">
        <h2>Оформление заказа</h2>
      </Header>
      {children}
    </>
  );
}
