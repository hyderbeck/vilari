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
  const { id, brand, collection, price } = item;
  item.stock = 1;
  const [imageHref, setImageHref] = useState("");
  useEffect(() => {
    setImageHref("a");
  }, []);
  const name =
    "Ваза" +
    " " +
    collection.name.toUpperCase() +
    " " +
    item.name.toUpperCase();
  return (
    <article
      className={
        page === "home"
          ? "flex flex-col xs:w-[225px] 2xl:w-[270px] gap-y-3"
          : "flex gap-x-6 items-start"
      }
    >
      {imageHref ? (
        <Image
          alt="item"
          src={`https://rzpcucgkjsqqedurowkl.supabase.co/storage/v1/object/public/objects/${id}/1.png`}
          width={400}
          height={400}
          className={
            page === "home"
              ? "xs:w-[225px] 2xl:w-[270px] aspect-square object-contain"
              : "min-w-[125px] w-[125px] max-w-[125px] aspect-square object-contain"
          }
        />
      ) : (
        <div
          className={
            page
              ? "min-w-[342px] xs:min-w-[225px] 2xl:min-w-[270px] aspect-square flex justify-center items-center"
              : "min-w-[125px] w-[125px] max-w-[125px] aspect-square"
          }
        ></div>
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
          <Link href="" className="font-normal text-base">
            {brand.name.toUpperCase()}
          </Link>
          <p className={!page ? "w-[10px]" : ""}>
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
            <p className="text-xs">1x</p>
          )}
          <p className="text-base">{price} RUB</p>
        </div>
      </div>
    </article>
  );
}
