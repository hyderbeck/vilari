"use client";

import Preview from "./preview";
import { Item } from "@/interfaces";
import Link from "next/link";

export default function Bag({
  items,
  className,
  checkout = false,
}: {
  items: Item[];
  className: string;
  checkout?: boolean;
}) {
  return (
    <section className={className}>
      <div className="flex flex-col gap-y-6 p-6 pl-0 pb-0 overflow-y-scroll">
        {items.map((item) => (
          <Preview
            key={item.id}
            item={item}
            page={checkout ? "checkout" : undefined}
          />
        ))}
      </div>
      <footer className="flex flex-col gap-y-6 p-6 pt-0">
        <p className="flex justify-between items-center pt-6 border-t w-full">
          <span>Итого</span>
          <span className="text-base">
            {items.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            ) + " RUB"}
          </span>
        </p>
        {!checkout && (
          <Link href="/checkout" className="btn mx-auto">
            Оформить
          </Link>
        )}
      </footer>
    </section>
  );
}
