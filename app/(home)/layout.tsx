import Link from "next/link";
import Search from "@/components/search";
import { getItemTypes } from "@/queries";
import Nav from "@/components/nav";
import Bag from "@/components/bag";

export default async function HomeLayout({
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
        <Search />
        <Bag />
        <Nav itemTypes={await getItemTypes()} />
      </header>
      {children}
    </>
  );
}
