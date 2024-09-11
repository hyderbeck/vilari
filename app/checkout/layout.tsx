import Header from "@/components/header";

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
