"use client";

import { ItemPreview } from "@/interfaces";
import Add from "@/components/buttons/add";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Spinner } from "@/components/icons";

export default function Item({
  item,
  page,
}: {
  item: ItemPreview;
  page?: "home" | "checkout" | "item";
}) {
  const {
    id,
    material,
    size,
    designer,
    collection,
    price,
    quantity,
    itemType,
  } = item;
  const [imageHref, setImageHref] = useState("");
  useEffect(() => {
    async function getImage(id: string) {
      const href = await (
        await fetch(`http://192.168.1.158:3000/api/${id}`)
      ).json();
      setImageHref(href);
    }
    getImage(id);
  }, []);
  const name =
    (itemType.includes("Ваз") ? "Ваза" : "") +
    " " +
    collection.name.toUpperCase() +
    " " +
    item.name.toUpperCase();
  return (
    <article className="flex flex-col items-center md:flex-row md:justify-center gap-3 w-full max-w-screen-lg">
      {imageHref ? (
        <Image
          alt="item"
          src={imageHref}
          width={400}
          height={400}
          className="w-[400px] h-[400px]"
        />
      ) : (
        <div className="w-[400px] h-[400px] flex justify-center items-center">
          <Spinner />
        </div>
      )}
      <div className="flex md:flex-col justify-between w-full md:w-fit">
        <div className="w-[150px] gap-3">
          <p className="font-normal text-base">{designer.name.toUpperCase()}</p>
          <p>
            {page !== "item" ? <Link href={`/${id}`}>{name}</Link> : name}
            <span className="font-thin">/{collection.name}</span>
          </p>
          <p>{size}</p>
          <p>{material}</p>
        </div>
        <div className="flex flex-col items-end md:items-start gap-3">
          {page ? (
            <Add item={item} page={page} />
          ) : (
            <p className="text-xs">{quantity}x</p>
          )}
          <p className="text-base">{price / 100} RUB</p>
        </div>
      </div>
    </article>
  );
}
