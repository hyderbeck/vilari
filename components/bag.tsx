"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Preview from "./preview";
import { ItemPreview } from "@/interfaces";

export function getBag() {
  return JSON.parse(localStorage.getItem("bag") || "[]") as ItemPreview[];
}

export default function Bag() {
  const [bag, setBag] = useState(false);
  const [items, setItems] = useState([] as ItemPreview[]);

  useEffect(() => {
    setItems(getBag());
    window.addEventListener("bag", () => setItems(getBag()));
  }, []);

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
          <button
            onClick={() => {
              setBag(false);
            }}
          >
            x
          </button>
          {items.length ? (
            items.map((item) => <Preview key={item.id} item={item} />)
          ) : (
            <p>empty</p>
          )}
          <Link href="/checkout">checkout</Link>
        </section>
      )}
    </>
  );
}
