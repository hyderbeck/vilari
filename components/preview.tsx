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
    <article className="flex">
      <img alt="" src={imageHref} />
      <Link href={`/${id}`} onClick={onClick}>
        <h3>{name}</h3>
      </Link>
      <p>{code}</p>
      <p>{`${price / 100} RUB`}</p>
      <Add item={item} />
    </article>
  );
}
