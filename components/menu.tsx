"use client";

import Search from "./menu/search";
import Nav from "./menu/nav";
import Bag from "./menu/bag";
import { Category } from "@/interfaces";
import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";

export default function Menu({ categories }: { categories: Category[] }) {
  const [search, setSearch] = useState(false);
  const [nav, setNav] = useState(false);
  const [bag, setBag] = useState(false);

  const pathname = usePathname();
  if (search && pathname !== "/") setSearch(false);

  const handleNavResizeCallback = useCallback(() => {
    if (window.innerWidth >= 768) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, []);

  function handleClick(button: "search" | "nav" | "bag") {
    const s = button === "search" ? !search : false;
    const n = button === "nav" ? !nav : false;
    const b = button === "bag" ? !bag : false;
    setSearch(s);
    setNav(n);
    setBag(b);

    if (n) {
      if (window.innerWidth < 768) {
        document.body.style.overflow = "hidden";
      }
      window.addEventListener("resize", handleNavResizeCallback);
    } else {
      window.removeEventListener("resize", handleNavResizeCallback);
      document.body.style.overflow = "auto";
    }

    if (s) {
      document
        .getElementsByTagName("h1")[0]!
        .addEventListener("click", () => setSearch(false));
    }
  }

  return (
    <section className="flex gap-x-3">
      <Search
        search={search}
        onClick={() => handleClick("search")}
        className={{
          btn: "z-10",
          search: "absolute top-16 mt-6 right-0 left-0",
        }}
      />
      <Bag bag={bag} onClick={() => handleClick("bag")} />
      <Nav
        nav={nav}
        onClick={() => handleClick("nav")}
        categories={categories}
      />
    </section>
  );
}
