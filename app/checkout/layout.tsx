import Link from "next/link";

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="flex">
        <h1 className="text-3xl">
          <Link href="/">Villari</Link>
        </h1>
      </header>
      {children}
    </>
  );
}
