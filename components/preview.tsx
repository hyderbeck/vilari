"use client";

import { ItemPreview } from "@/interfaces";
import Add from "./buttons/add";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Spinner } from "./icons";

export default function Preview({
  item,
  page,
}: {
  item: ItemPreview;
  page?: "home" | "checkout" | "item";
}) {
  const { id, designer, collection, price, quantity, itemType } = item;
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
    <article
      className={
        page === "home"
          ? "flex flex-col xs:w-[225px] 2xl:w-[270px] gap-y-3"
          : "flex gap-x-6"
      }
    >
      {imageHref ? (
        <Image
          alt="item"
          src={imageHref}
          width={400}
          height={400}
          className={
            page === "home"
              ? "xs:w-[225px] 2xl:w-[270px] aspect-square object-contain"
              : "w-[150px] aspect-square object-contain"
          }
        />
      ) : (
        <div
          className={
            page
              ? "h-[342px] xs:h-[225px] 2xl:h-[270px] aspect-square flex justify-center items-center"
              : "aspect-square h-[150px] flex justify-center items-center"
          }
        >
          <Spinner />
        </div>
      )}
      <div
        className={`flex ${
          page === "checkout" ? "flex-col xs:flex-row" : ""
        } justify-between w-full`}
      >
        <div
          className={
            page === "home"
              ? "flex flex-col w-[150px] xs:w-[75px] gap-y-3"
              : "flex flex-col w-[50px] gap-y-3"
          }
        >
          <Link
            href={`?filter=https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/6da26107-62a7-11ee-0a80-0051000d3d54=${designer.href}`}
            className="font-normal text-base"
          >
            {designer.name.toUpperCase()}
          </Link>
          <p>
            {page !== "item" ? (
              <>
                <Link href={`/${id}`}>{name}</Link>
                {collection.name && (
                  <>
                    /
                    <Link
                      href={`?filter=https://api.moysklad.ru/api/remap/1.2/entity/product/metadata/attributes/16711943-7caa-11ef-0a80-06b70009ddd6=${collection.href}`}
                      className="font-thin hover:font-normal"
                    >
                      {collection.name}
                    </Link>
                  </>
                )}
              </>
            ) : (
              name
            )}
          </p>
        </div>
        <div
          className={
            page
              ? "flex flex-col items-end gap-y-3"
              : "flex flex-col justify-between items-end"
          }
        >
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
