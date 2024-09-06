"use client";

import { useItems } from "./bag";
import { ItemPreview } from "@/interfaces";

export default function Preview({ item }: { item: ItemPreview }) {
  const items = useItems();
  const { id, name, price, code } = item;
  const added = items.some((item) => item.id === id);

  return (
    <article className="flex">
      <img alt="" />
      <h3>{name}</h3>
      <p>{code}</p>
      <p>{`${price / 100} RUB`}</p>
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
