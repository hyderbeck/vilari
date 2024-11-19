"use client";

import Preview from "./preview";
import { OrderItem } from "@/interfaces";
import { formatPrice } from "@/app/utils";
import Link from "next/link";

export default function Bag({
  items,
  className,
  checkout = false,
}: {
  items: OrderItem[];
  className: string;
  checkout?: boolean;
}) {
  return (
    <article className={className}>
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
            {formatPrice(
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
    </article>
  );
}
