// import Preview from "@/components/preview";
import Link from "next/link";
import Search from "@/components/search";

export default function HomeLayout({
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
        <button>bag</button>
        <section className="flex items-center">
          {/*<Preview />*/}
          <p>empty</p>
          <Link href="/checkout">checkout</Link>
        </section>
        <button>navbar</button>
        <nav>
          <ul>
            <li></li>
          </ul>
        </nav>
      </header>
      {children}
    </>
  );
}
