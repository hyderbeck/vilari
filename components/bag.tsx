"use client";

import { ItemPreview } from "@/interfaces";
import Link from "next/link";
import { useState, useEffect } from "react";
import Preview from "./preview";

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

export default function Bag({
  items,
  className,
  checkout = false,
}: {
  items: ItemPreview[];
  className: string;
  checkout?: boolean;
}) {
  return (
    <section className={className}>
      {items.length ? (
        <>
          <div
            className={`flex flex-col overflow-y-scroll ${
              !checkout ? "p-6 2xl:pr-12 gap-y-6" : "gap-y-12"
            }`}
          >
            {items.map((item) => (
              <Preview
                key={item.id}
                item={item}
                page={checkout ? "checkout" : undefined}
              />
            ))}
          </div>
          <footer
            className={`flex flex-col ${
              !checkout ? "p-6 2xl:pr-12" : ""
            } pt-0 gap-y-6`}
          >
            <p className="flex items-center justify-between w-full border-t pt-6">
              <span>Итого</span>
              <span className="text-base">
                {items.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                ) / 100}{" "}
                RUB
              </span>
            </p>
            {!checkout && (
              <Link
                href="/checkout"
                className="px-3 py-2 text-center bg-black text-white rounded font-normal"
                onClick={() => (document.body.style.overflow = "auto")}
              >
                Оформить
              </Link>
            )}
          </footer>
        </>
      ) : (
        <p className="p-6">Пусто</p>
      )}
    </section>
  );
}
