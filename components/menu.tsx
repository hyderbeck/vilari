"use client";

import Search from "./menu/search";
import Nav from "./menu/nav";
import Bag from "./menu/bag";
import { Category } from "@/interfaces";
import { useState } from "react";

export default function Menu({ categories }: { categories: Category[] }) {
  const [search, setSearch] = useState(false);
  const [nav, setNav] = useState(false);
  const [bag, setBag] = useState(false);

  function handleNavResize() {
    if (window.innerWidth >= 768) {
      document.body.style.overflow = "auto";
      setNav(false);
      window.removeEventListener("resize", handleNavResize);
    }
  }

  function handleClick(button: "search" | "nav" | "bag") {
    const s = button === "search" ? !search : false;
    const n = button === "nav" ? !nav : false;
    const b = button === "bag" ? !bag : false;
    setSearch(s);
    setNav(n);
    setBag(b);
    document.body.style.overflow = n ? "hidden" : "auto";
    n && window.addEventListener("resize", handleNavResize);
  }

  return (
    <section className="flex gap-x-3">
      <Search search={search} onClick={() => handleClick("search")} />
      <Bag bag={bag} onClick={() => handleClick("bag")} />
      <Nav
        nav={nav}
        onClick={() => handleClick("nav")}
        categories={categories}
      />
    </section>
  );
}
