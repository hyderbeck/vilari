"use client";

import { ItemPreview } from "@/interfaces";
import { useItems } from "./bag";
import Link from "next/link";
import { ChildProps } from "postcss";

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </svg>
  );
}

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
  const className = "flex items-center p-2 h-10 border border-black";

  return quantity ? (
    <section className={`${className} justify-between`}>
      <button onClick={() => handleClick(item, items, i, false)}>
        <MinusIcon />
      </button>

      <Link replace href="/checkout">
        {`В корзине ${quantity} шт`}
      </Link>

      <button
        onClick={() => handleClick(item, items, i)}
        disabled={!item.stock || item.stock - quantity <= 0}
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
      {item.stock ? "В корзину" : "Нет в наличии"}
    </button>
  );
}
