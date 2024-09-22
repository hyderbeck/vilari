"use client";

import { ItemPreview } from "@/interfaces";
import Link from "next/link";
import { useState, useEffect } from "react";
import Preview from "./preview";

export function getBag(pre?: boolean) {
  return JSON.parse(
    localStorage.getItem(pre ? "pre" : "bag") || "[]"
  ) as ItemPreview[];
}

export function useItems(pre?: boolean) {
  const [items, setItems] = useState([] as ItemPreview[]);

  useEffect(() => {
    setItems(getBag(pre));
    window.addEventListener(pre ? "pre" : "bag", () => setItems(getBag(pre)));
  }, [pre]);

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
            className={`flex flex-col overflow-y-scroll gap-y-6 p-6 ${
              !checkout ? "2xl:pr-12" : "pt-10 lg:pl-0"
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
            className={`flex flex-col gap-y-6 ${
              !checkout ? "p-6 pt-0 2xl:pr-12" : "px-6 lg:pl-0"
            }`}
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
