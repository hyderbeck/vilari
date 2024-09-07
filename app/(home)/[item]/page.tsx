/* eslint-disable @next/next/no-img-element */
import { getItem } from "@/queries";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Add from "@/components/add";

export default async function Item({ params }: { params: { item: string } }) {
  const item = await getItem(params.item);
  if (!item) return notFound();
  const { price, name, code, itemType, imageHref } = item;

  return (
    <Suspense fallback="...">
      <main className="flex">
        <img alt="" src={imageHref} />
        <h2 className="text-2xl">{name}</h2>
        <p>{code}</p>
        <p>{price}</p>
        <Link replace href={`/?filter=pathName=${itemType}`}>
          <p>{itemType}</p>
        </Link>
        <Add item={item} />
      </main>
    </Suspense>
  );
}
