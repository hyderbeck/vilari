import Link from "next/link";
import { atteron } from "./fonts/fonts";
import { getItemTypes } from "@/queries";
import Menu from "./menu/menu";

export default async function Header({
  layout,
}: {
  layout?: "home" | "checkout";
}) {
  return (
    <header
      className={`fixed top-0 right-0 left-0 flex items-center justify-between bg-white p-6 2xl:px-12 z-10`}
    >
      <h1 className={`${atteron.className} text-4xl tracking-widest z-10`}>
        <Link href="/" replace>
          vilari
        </Link>
      </h1>
      {layout === "home" ? (
        <Menu itemTypes={await getItemTypes()} />
      ) : layout === "checkout" ? (
        <h2 className={`${atteron.className} text-2xl tracking-widest`}>
          Checkout
        </h2>
      ) : (
        ""
      )}
    </header>
  );
}
