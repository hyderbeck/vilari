import { atteron } from "../app/fonts";
import Link from "next/link";
import Menu from "./menu";
import { createClient } from "@/supabase";
import { getCategories } from "@/queries";

export default async function Header({
  layout,
}: {
  layout?: "home" | "checkout";
}) {
  return (
    <header
      className={`fixed top-0 right-0 left-0 flex justify-between items-center bg-white p-6 border-b z-10`}
    >
      <h1 className={`${atteron.className} text-4xl tracking-widest`}>
        <Link scroll={false} href="/">
          vilari
        </Link>
      </h1>
      {layout === "home" && (
        <Menu categories={await getCategories(createClient())} />
      )}
    </header>
  );
}
