"use client";

import { useBag } from "@/app/hooks";
import { OrderItem, Item, Page, Order } from "@/interfaces";
import { Plus as PlusIcon, Minus as MinusIcon } from "../icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

function setBag(orderType: Order, items: OrderItem[]) {
  localStorage.setItem(orderType, JSON.stringify(items));
  window.dispatchEvent(new Event(orderType));
}

function formatItem(item: Item) {
  const orderItem: OrderItem = {
    id: item.id,
    name: item.name,
    brand: { id: item.brand.id, name: item.brand.name },
    quantity: item.quantity,
    wms_id: item.wms_id,
    price: item.price,
    amount: 1,
    single: (item.single || item.category.single)!,
  };
  if (item.collection)
    orderItem.collection = {
      id: item.collection.id,
      name: item.collection.name,
    };

  return orderItem;
}

function handleBag(bag: OrderItem[], i: number, item?: Item | OrderItem) {
  if (item) {
    i < 0 ? bag.push(formatItem(item as Item)) : bag[i].amount++;
  } else {
    bag[i].amount--;
    !bag[i].amount && bag.splice(i, 1);
  }

  setBag("order", bag);
}

export default function Add({
  item,
  page,
}: {
  item: Item | OrderItem;
  page?: Page;
}) {
  const { replace } = useRouter();
  const bag = useBag("order");
  const i = bag.findIndex(({ id }) => id === item.id);
  const amount = i >= 0 ? bag[i].amount : 0;
  const isMore = item.quantity - amount > 0;

  const preBtnClassName = "btn bg-white text-black border border-black";

  return amount ? (
    <article className="btn">
      <button onClick={() => handleBag(bag, i)}>
        <MinusIcon className="size-4" />
      </button>
      <p>{amount}x</p>
      <button
        onClick={() => handleBag(bag, i, item)}
        disabled={!isMore}
        className={isMore ? "text-black" : ""}
      >
        <PlusIcon className="size-4" />
      </button>
    </article>
  ) : item.quantity ? (
    <button onClick={() => handleBag(bag, i, item)} className="btn w-full">
      В корзину
    </button>
  ) : (
    <button
      disabled={page === "checkout"}
      onClick={() => {
        setBag("pre", [formatItem(item as Item)]);
        replace("/checkout?pre=true");
      }}
      className={preBtnClassName}
    >
      Предзаказ
    </button>
  );
}
