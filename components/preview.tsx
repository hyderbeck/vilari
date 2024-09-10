/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { ItemPreview } from "@/interfaces";
import Add from "./add";

export default function Preview({
  item,
  onClick,
}: {
  item: ItemPreview;
  onClick?: () => void;
}) {
  const { id, name, price, code, imageHref } = item;

  return (
    <article className="flex flex-col justify-between items-center bg-white p-6">
      <img
        alt=""
        src={"https://placehold.co/400/white/white" /* imageHref */}
        className="w-[200px] aspect-square"
      />
      <Link href={`/${id}`} onClick={onClick}>
        <h3>Private Decor Collection</h3>
      </Link>
      <p>{code}</p>
      <p>{`${price / 100} RUB`}</p>
      <Add item={item} />
    </article>
  );
}
