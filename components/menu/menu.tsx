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

  return (
    <section
      className="flex gap-x-3"
    >
      <Search
        search={search}
        onClick={() => {
          setBag(false);
          setNav(false);
          setSearch(!search);
          document.body.style.overflow = "auto";
        }}
      />
      <Bag
        bag={bag}
        onClick={() => {
          setSearch(false)
          setNav(false);
          setBag(!bag);
          document.body.style.overflow = bag ? "auto" : "hidden";
        }}
      />
      <Nav
        nav={nav}
        onClick={() => {
          setSearch(false);
          setBag(false);
          setNav(!nav);
          document.body.style.overflow = nav ? "auto" : "hidden";
        }}
        itemTypes={itemTypes}
      />
    </section>
  );
}
