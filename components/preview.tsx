/* eslint-disable @next/next/no-img-element */
"use client";

import { ItemPreview } from "@/interfaces";
import Add from "./buttons/add";

export default function Preview({
  item,
  page,
}: {
  item: ItemPreview;
  page?: "home" | "checkout";
}) {
  const { name, price, code, imageHref, quantity } = item;

  return (
    <article
      className={
        page === "home"
          ? "flex justify-between gap-x-6 h-[100px]"
          : "flex justify-between gap-x-6 h-[100px]"
      }
    >
      <img alt="item" src={imageHref} />
      <p
        className={
          page
            ? "overflow-hidden w-[90px] xs:w-[210px] 2xl:w-[350px] mr-auto"
            : "overflow-hidden w-[125px] mr-auto"
        }
      >
        {name}
      </p>
      {page === "home" && <p className="mr-auto hidden md:block">{code}</p>}
      <div className="flex flex-col justify-between items-end">
        {page ? <Add item={item} /> : <p className="text-xs">{quantity}x</p>}
        <p className="text-base">{price / 100} RUB</p>
      </div>
    </article>
  );
}
