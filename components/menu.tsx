"use client";

import { useState } from "react";
import Search from "./menu/search";
import Bag from "./menu/bag";
import Nav from "./menu/nav";
import { ItemTypes } from "@/interfaces";

export default function Menu({ itemTypes }: { itemTypes: ItemTypes }) {
  const [search, setSearch] = useState(false);
  const [bag, setBag] = useState(false);
  const [nav, setNav] = useState(false);

  function close() {
    setNav(false);
    setBag(false);
    document.body.style.overflow = "auto";
    document.body
      .getElementsByTagName("h1")[0]
      .removeEventListener("click", close);
    document.body
      .getElementsByTagName("main")[0]
      .removeEventListener("click", close);
    document.body
      .getElementsByTagName("footer")[0]
      .removeEventListener("click", close);
  }

  function unlock() {
    if (window.innerWidth <= 768) {
      document.body.style.overflow = "auto";
      setBag(false);
      window.removeEventListener("resize", unlock);
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
          document.body.getElementsByTagName("main")[0].style.paddingTop =
            search ? "7rem" : "11rem";
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
          document.body.getElementsByTagName("main")[0].style.paddingTop =
            "7rem";
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
            .addEventListener("click", close);
          document.body
            .getElementsByTagName("main")[0]
            .addEventListener("click", close);
          document.body
            .getElementsByTagName("footer")[0]
            .addEventListener("click", close);
          document.body.getElementsByTagName("main")[0].style.paddingTop =
            "7rem";
        }}
        itemTypes={itemTypes}
      />
    </section>
  );
}
