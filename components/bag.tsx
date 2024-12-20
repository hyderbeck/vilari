"use client";

import Preview from "./preview";
import { Item } from "@/interfaces";
import { fmtPrice } from "@/utils";
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
      <div
        className={`flex flex-col gap-y-6 p-6 overflow-y-scroll ${
          checkout ? "pt-[7.5rem] gap-y-9" : ""
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
      <footer className="flex flex-col gap-y-6 p-6 pt-0">
        <p className="flex justify-between items-center pt-6 border-t w-full">
          <span>Итого</span>
          <span className="text-base">
            {fmtPrice(
              items.reduce(
                (total, item) => total + item.price * item.amount!,
                0
              )
            )}
          </span>
        </p>
        {!checkout && (
          <Link scroll={false} href="/checkout" className="btn mx-auto">
            Оформить
          </Link>
        )}
      </footer>
    </section>
  );
}
