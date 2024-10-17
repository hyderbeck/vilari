"use client";

import { Item } from "@/interfaces";
import Add from "./buttons/add";
import Image from "next/image";
import Link from "next/link";

const groups: { [key: string]: string } = {
  Вазы: "Ваза",
};

export default function Preview({
  item,
  page,
}: {
  item: Item;
  page?: "home" | "checkout" | "item";
}) {
  const {
    id,
    brand,
    collection,
    designer,
    material,
    type,
    lwh,
    volume,
    weight,
    price,
    quantity,
  } = item;

  const name =
    groups[type.name] +
    " " +
    (collection ? collection.name.toUpperCase() + " " : "") +
    item.name.toUpperCase();

  const description = collection?.description;

  let d = 0;
  if (lwh[0] === lwh[1]) d = lwh[0];

  return (
    <article
      className={`flex ${
        page === "home"
          ? "flex-col w-[250px]"
          : page === "item"
          ? "flex-col md:flex-row w-full justify-center items-center"
          : page === "checkout"
          ? "pb-6"
          : "justify-between pb-6"
      }`}
    >
      <Image
        alt="item"
        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/objects/${id}/1.png`}
        width={500}
        height={500}
        quality={100}
        className={`${
          page === "home"
            ? "w-[250px]"
            : page === "item"
            ? "w-[350px] shrink-0"
            : page === "checkout"
            ? "w-[125px] xs:w-[250px]"
            : "w-[125px] xs:w-[150px]"
        } aspect-square`}
      />
      <div
        className={`flex ${
          page === "home"
            ? "flex-col"
            : page === "item"
            ? "flex-col px-6 md:w-[32rem]"
            : "flex-1 justify-between"
        }`}
      >
        <div
          className={`flex overflow-hidden ${
            page === "home"
              ? "flex-col gap-y-1.5 mb-3"
              : page === "item"
              ? "flex-col gap-y-1 mb-1.5"
              : "flex-col gap-y-3 -ml-3 mr-3 xs:mr-6"
          }`}
        >
          <Link
            href={`/?type=all&brands=${brand.id}`}
            className={`${
              page === "item" ? "text-lg" : "text-base"
            } font-normal uppercase w-fit`}
          >
            {brand.name}
          </Link>
          <div>
            {page === "item" ? (
              <h2 className="text-2xl font-extralight tracking-tight">
                {name}
              </h2>
            ) : (
              <Link href={`/${id}`}>{name}</Link>
            )}
            {collection && page !== "item" && (
              <>
                /
                <Link
                  href={`/?type=all&collections=${collection.id}`}
                  className="font-extralight"
                >
                  {collection.name}
                </Link>
              </>
            )}
          </div>
        </div>
        <div
          className={`flex justify-between ${
            page && ["home", "item"].includes(page)
              ? "flex-row-reverse"
              : "flex-col"
          }`}
        >
          <div>
            <Add item={item} page={page} />
            {page === "item" && quantity && (
              <p className="text-xs text-center mt-1.5">
                В наличии {quantity} шт
              </p>
            )}
          </div>
          <p className="text-base text-end">{price} RUB</p>
        </div>
        {page === "item" && description && (
          <p className="my-6 border-y py-6">{description}</p>
        )}
        {page === "item" && (
          <p className="flex flex-col">
            <span>{item.name}</span>
            <span>Тип изделия: {groups[type.name]}</span>
            <span>
              Бренд:{" "}
              <Link
                href={`/?type=all&brands=${brand.id}`}
                className="underline underline-offset-4"
              >
                {brand.name}
              </Link>
            </span>
            <span>Производство: {brand.country}</span>
            {collection && (
              <span>
                Коллекция:{" "}
                <Link
                  href={`/?type=all&collections=${collection.id}`}
                  className="underline underline-offset-4"
                >
                  {collection.name}
                </Link>
              </span>
            )}
            {designer && (
              <span>
                Дизайнер:{" "}
                <Link
                  href={`/?type=all&designers=${designer.id}`}
                  className="underline underline-offset-4"
                >
                  {designer.name}
                </Link>
              </span>
            )}
            <span>Материал: {material.name}</span>
            <span>
              {d
                ? ["⌀", d, "h", lwh[2]].join(" ")
                : lwh[0] + " x " + lwh[1] + " x " + lwh[2]}
            </span>
            {volume && <span>{volume}</span>}
            {weight && <span>{weight}</span>}
          </p>
        )}
      </div>
    </article>
  );
}
