"use client";

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

export function Bag({
  onClick,
  header = false,
}: {
  onClick?: () => void;
  header: boolean;
}) {
  const items = useItems();
  return (
    <section className="flex flex-col overflow-y-scroll gap-y-6 p-6 2xl:pr-12">
      {items.length ? (
        items.map((item) =>
          header ? (
            <p>{item.name}</p>
          ) : (
            <Preview key={item.id} item={item} onClick={onClick} />
          )
        )
      ) : (
        <p>empty</p>
      )}
    </section>
  );
}
