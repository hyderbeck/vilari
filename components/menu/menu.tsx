"use client";

import { useState } from "react";
import Search from "./search";
import Bag from "./bag";
import Nav from "./nav";
import { ItemTypes } from "@/interfaces";

export default function Menu({ itemTypes }: { itemTypes: ItemTypes }) {
  const [search, setSearch] = useState(false);
  const [bag, setBag] = useState(false);
  const [nav, setNav] = useState(false);

  function closeNav() {
    setNav(false);
    document.body.style.overflow = "auto";
    document.body
      .getElementsByTagName("h1")[0]
      .removeEventListener("click", closeNav);
  }

  function unlock() {
    if (window.innerWidth <= 768) {
      document.body.style.overflow = "auto";
      setBag(false);
      window.removeEventListener("resize", unlock);
    }
  }

  function revertPadding() {
    if (window.innerWidth > 768 || window.location.pathname === "/checkout") {
      document.body.getElementsByTagName("main")[0].style.paddingTop = "8rem";
      setSearch(false);
      window.removeEventListener("resize", revertPadding);
    }
  }

  return (
    <section className="flex gap-x-3">
      <Search
        search={search}
        onButtonClick={() => {
          setBag(false);
          setNav(false);
          setSearch(!search);
          document.body.style.overflow = "auto";
          if (window.matchMedia("(max-width: 768px")) {
            document.body.getElementsByTagName("main")[0].style.paddingTop =
              search ? "8rem" : "12rem";
            window.addEventListener("resize", revertPadding);
          }
        }}
        onInputClick={() => {
          setBag(false);
          setNav(false);
          document.body.style.overflow = "auto";
        }}
      />
      <Bag
        bag={bag}
        onClick={() => {
          setSearch(false);
          setNav(false);
          setBag(!bag);
          document.body.style.overflow = bag ? "auto" : "hidden";
          window.addEventListener("resize", unlock);
        }}
      />
      <Nav
        nav={nav}
        onClick={() => {
          setSearch(false);
          setBag(false);
          setNav(!nav);
          document.body.style.overflow = nav ? "auto" : "hidden";
          document.body
            .getElementsByTagName("h1")[0]
            .addEventListener("click", closeNav);
        }}
        itemTypes={itemTypes}
      />
    </section>
  );
}
