"use client";

import { useEffect, useState } from "react";
import { getBag } from "./bag";

import { ItemPreview } from "@/interfaces";

export default function Preview({ item }: { item: ItemPreview }) {
  const [items, setItems] = useState([] as ItemPreview[]);
  const { id, name, price, code } = item;
  const added = items.some((item) => item.id === id);

  useEffect(() => {
    setItems(getBag());
    window.addEventListener("bag", () => setItems(getBag()));
  }, []);

  return (
    <article className="flex">
      <img alt="" />
      <h3>{name}</h3>
      <p>{code}</p>
      <p>{price}</p>
      <button
        onClick={() => {
          added
            ? items.splice(
                items.findIndex((item) => item.id === id),
                1
              )
            : items.push(item);
          localStorage.setItem("bag", JSON.stringify(items));
          window.dispatchEvent(new Event("bag"));
        }}
      >
        {added ? "x" : "add"}
      </button>
    </article>
  );
}
