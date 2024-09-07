"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Preview from "./preview";
import { ItemPreview } from "@/interfaces";

export function getBag() {
  return JSON.parse(localStorage.getItem("bag") || "[]") as ItemPreview[];
}

export function useItems() {
  const [items, setItems] = useState([] as ItemPreview[]);

  useEffect(() => {
    setItems(getBag());
    window.addEventListener("bag", () => setItems(getBag()));
  }, []);

  return items;
}

export function Bag({ onClick }: { onClick?: () => void }) {
  const items = useItems();

  return (
    <section>
      {onClick && <button onClick={onClick}>x</button>}
      {items.length ? (
        items.map((item) => (
          <Preview key={item.id} item={item} onClick={onClick} />
        ))
      ) : (
        <p>empty</p>
      )}
    </section>
  );
}

export default function BagHeader() {
  const [bag, setBag] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setBag(true);
        }}
      >
        bag
      </button>
      {bag && (
        <section className="absolute top-0 right-0 bottom-0 left-0 bg-white">
          <Bag onClick={() => setBag(false)} />
          <Link href="/checkout">checkout</Link>
        </section>
      )}
    </>
  );
}
