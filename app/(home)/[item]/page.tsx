/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";

export default async function Item(/* { params }: { params: { item: string } }*/) {
  return notFound();

  /* 
  import { getItem } from "@/queries";
  import Link from "next/link";
  import { Suspense } from "react";

  const item = await getItem(params.item);
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
      </main>
    </Suspense>
  );
  */
}
