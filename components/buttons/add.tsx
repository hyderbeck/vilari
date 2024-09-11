"use client";

import { PlusIcon, MinusIcon } from "../icons";
import { useItems } from "../bag";
import { ItemPreview } from "@/interfaces";

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
  const className =
    "flex gap-x-3 items-center p-2 h-10 text-white font-normal bg-black rounded w-28";

  return quantity ? (
    <section className={`${className} justify-between`}>
      <button onClick={() => handleClick(item, items, i, false)}>
        <MinusIcon />
      </button>
      <p>{quantity}x</p>
      <button
        onClick={() => handleClick(item, items, i)}
        disabled={!item.stock || item.stock - quantity <= 0}
        className={
          !item.stock || item.stock - quantity <= 0 ? "text-black" : ""
        }
      >
        <PlusIcon />
      </button>
    </section>
  ) : (
    <button
      onClick={() => handleClick(item, items, i)}
      disabled={!item.stock}
      className={`${className} justify-center`}
    >
      {item.stock ? "В корзину" : "Ожидается"}
    </button>
  );
}
