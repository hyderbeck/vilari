import Link from "next/link";
import { atteron } from "../fonts";
import Menu from "./menu";
import { getItemTypes } from "@/queries";

// backend
// label buttons w icons

export default async function Header({
  layout,
}: {
  layout?: "home" | "checkout";
}) {
  return (
    <header
      className={`fixed top-0 right-0 left-0 flex justify-between items-center bg-white p-6 2xl:px-12 shadow`}
    >
      <h1 className={`${atteron.className} text-4xl tracking-widest z-10`}>
        <Link href="/">vilari</Link>
      </h1>
      {layout === "home" && <Menu itemTypes={await getItemTypes()} />}
    </header>
  );
}
