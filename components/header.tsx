import Link from "next/link";
import { atteron } from "./fonts/fonts";
import { getItemTypes } from "@/queries";
import Menu from "./menu/menu";

export default async function Header({ menu = false }: { menu?: boolean }) {
  return (
    <header
      className={`fixed top-0 right-0 left-0 flex items-center justify-between bg-white p-6 2xl:px-12 ${
        menu ? "shadow md:shadow-none" : "shadow"
      }`}
    >
      <h1 className={`${atteron.className} text-4xl tracking-widest z-10`}>
        <Link href="/" replace>
          vilari
        </Link>
      </h1>
      {menu ? (
        <Menu itemTypes={await getItemTypes()} />
      ) : (
        <h2 className={`${atteron.className} text-2xl tracking-widest`}>
          Checkout
        </h2>
      )}
    </header>
  );
}
