"use client";

import { ItemPreview } from "@/interfaces";
import { useItems } from "./bag";

function handleClick(
  item: ItemPreview,
  items: ItemPreview[],
  i: number,
  add = true
) {
  const isAdded = i >= 0;
  if (add) {
    if (!isAdded) {
      items.push(item);
      i = items.findIndex(({ id }) => id == item.id);
      items[i].quantity = 0;
    }
    items[i].quantity++;
  } else {
    items[i].quantity--;
    !items[i].quantity && items.splice(i, 1);
  }
  localStorage.setItem("bag", JSON.stringify(items));
  window.dispatchEvent(new Event("bag"));
}

export default function Add({ item }: { item: ItemPreview }) {
  const items = useItems();
  const i = items.findIndex(({ id }) => id === item.id);
  const quantity = i >= 0 ? items[i].quantity : 0;

  return (
    <section>
      <button
        disabled={!item.stock || item.stock - quantity <= 0}
        onClick={() => handleClick(item, items, i)}
      >
        +
      </button>
      <p>{item.stock ? (quantity ? quantity : "add") : "out of stock"}</p>
      <button
        disabled={!item.stock || !quantity}
        onClick={() => handleClick(item, items, i, false)}
      >
        -
      </button>
    </section>
  );
}
