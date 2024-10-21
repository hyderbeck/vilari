"use client";

import { useItems } from "@/app/hooks";
import { Item } from "@/interfaces";
import { PlusIcon, MinusIcon } from "../icons";
import Link from "next/link";

function filterItem(item: Item) {
  const bagItem: { [key: string]: string | number | {} } = {
    id: item.id,
    brand: { id: item.brand.id, name: item.brand.name },
    quantity: item.quantity,
    wms_id: item.wms_id,
    price: item.price,
    amount: item.amount!,
  };
  if (item.collection)
    bagItem.collection = { id: item.collection.id, name: item.collection.name };
  if (item.item_name) bagItem.name = item.item_name;
  return bagItem as unknown as Item;
}

function handleOrder(item: Item, items: Item[], i: number, add = true) {
  const isAdded = i >= 0;
  if (add) {
    if (!isAdded) {
      items.push(filterItem(item));
      i = items.findIndex(({ id }) => id === item.id);
      items[i].amount = 0;
    }
    items[i].amount!++;
  } else {
    items[i].amount!--;
    !items[i].amount && items.splice(i, 1);
  }
  localStorage.setItem("order", JSON.stringify(items));
  window.dispatchEvent(new Event("order"));
}

function handlePre(item: Item) {
  item.amount = 1;
  localStorage.setItem("pre", JSON.stringify([filterItem(item)]));
  window.dispatchEvent(new Event("pre"));
}

export default function Add({
  item,
  page,
}: {
  item: Item;
  page?: "home" | "checkout" | "item";
}) {
  const items = useItems("order");
  const i = items.findIndex(({ id }) => id === item.id);
  const amount = i >= 0 ? items[i].amount : 0;

  return amount ? (
    <section className="btn">
      <button onClick={() => handleOrder(item, items, i, false)}>
        <MinusIcon />
      </button>
      <p>{amount}x</p>
      <button
        onClick={() => handleOrder(item, items, i)}
        disabled={!item.quantity || item.quantity - amount <= 0}
        className={
          !item.quantity || item.quantity - amount <= 0 ? "text-black" : ""
        }
      >
        <PlusIcon />
      </button>
    </section>
  ) : item.quantity ? (
    <button onClick={() => handleOrder(item, items, i)} className="btn w-full">
      В корзину
    </button>
  ) : page === "checkout" ? (
    <div className="btn bg-white border border-black text-black">Предзаказ</div>
  ) : (
    <Link
      href="/checkout?pre=true"
      onClick={() => handlePre(item)}
      className="btn bg-white border border-black text-black"
    >
      Предзаказ
    </Link>
  );
}
