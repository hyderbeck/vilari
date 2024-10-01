"use client";

import { PlusIcon, MinusIcon } from "../icons";
import { useItems } from "../bag";
import { ItemPreview } from "@/interfaces";
import Link from "next/link";

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

function handlePreorder(item: ItemPreview) {
  item.quantity = 1;
  localStorage.setItem("pre", JSON.stringify([item]));
  window.dispatchEvent(new Event("pre"));
}

export default function Add({
  item,
  page,
}: {
  item: ItemPreview;
  page: "home" | "checkout" | "item";
}) {
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
  ) : item.stock ? (
    <button
      onClick={() => handleClick(item, items, i)}
      className={`${className} justify-center`}
    >
      В корзину
    </button>
  ) : page === "checkout" ? (
    <button disabled className={`${className} justify-center`}>
      Предзаказ
    </button>
  ) : (
    <Link
      href="/checkout?pre=true"
      onClick={() => handlePreorder(item)}
      className={`${className} justify-center`}
    >
      Предзаказ
    </Link>
  );
}
