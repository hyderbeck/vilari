"use client";

import { ItemTypes } from "@/interfaces";
import Link from "next/link";
import { useState } from "react";

export default function Nav({ itemTypes }: { itemTypes: ItemTypes }) {
  const [nav, setNav] = useState(false);
  const [group, setGroup] = useState("");
  return (
    <>
      <button onClick={() => setNav(true)}>navbar</button>
      {nav && (
        <nav className="absolute top-0 right-0 bottom-0 left-0 bg-white">
          {group && <button onClick={() => setGroup("")}>{"<<"}</button>}
          <button
            onClick={() => {
              setNav(false);
              setGroup("");
            }}
          >
            x
          </button>
          {group
            ? itemTypes[group].map((itemType) => (
                <Link
                  replace
                  key={itemType.id}
                  href={"?filter=pathName=" + group + "/" + itemType.name}
                  onClick={() => {
                    setNav(false);
                    setGroup("");
                  }}
                >
                  {itemType.name}
                </Link>
              ))
            : Object.keys(itemTypes).map((key) => (
                <button key={key} onClick={() => setGroup(key)}>
                  {key}
                </button>
              ))}
        </nav>
      )}
    </>
  );
}
