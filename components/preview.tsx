"use client";

import { Item } from "@/interfaces";
import Add from "./buttons/add";
import Image from "next/image";
import Link from "next/link";
import { fmtPrice } from "@/utils";

function formatName(item: Item) {
  let itemName = item.name
    .replace(item.collection?.name || "", "")
    .replace(item.item_name || "", "")
    .replace(item.brand.name, "")
    .trim();
  return itemName + (item.item_name ? " " + item.item_name.toUpperCase() : "");
}

function formatDescription({ item }: { item: Item }) {
  const description =
    item.collection?.description
      ?.replaceAll(" - ", " — ")
      .split(item.collection.name) ||
    item.brand.description?.replaceAll(" - ", " — ").split(item.brand.name);
  if (description) {
    const which = item.collection?.description ? "collection" : "brand";
    const id = item.collection?.description
      ? item.collection.id
      : item.brand.id;
    const name = item.collection?.description
      ? item.collection.name
      : item.brand.name;
    return (
      <p className="mt-6 border-t pt-6">
        {description.map((s, i) => {
          return (
            <span key={i}>
              {s}
              {i < description.length - 1 ? (
                <Link
                  href={`/?category=all&${which}s=${id}`}
                  className="underline underline-offset-4"
                >
                  {name}
                </Link>
              ) : (
                ""
              )}
            </span>
          );
        })}
      </p>
    );
  }
}

function formatLwh(lwh?: number[]) {
  function format(lwh: number[]) {
    let d = 0;
    if (lwh[0] === lwh[1] && lwh[1] !== 0) d = lwh[0];
    return d
      ? "⌀ " + d + (lwh[2] ? " см" + " ↕ " + lwh[2] + " см" : " см")
      : lwh[0]
      ? lwh[0] +
        " см x " +
        lwh[1] +
        (lwh[2] ? " см x " + lwh[2] + " см" : " см")
      : "↕ " + lwh[2] + " см";
  }
  if (!lwh?.length) return;
  return lwh.length > 3 ? (
    <>
      <span>{format(lwh)}</span>
      <span>{format(lwh.slice(3))}</span>
    </>
  ) : (
    <span>{format(lwh)}</span>
  );
}

export default function Preview({
  item,
  page,
  welcome,
}: {
  item: Item;
  page?: "home" | "checkout" | "item";
  welcome?: true;
}) {
  const {
    id,
    brand,
    collection,
    designer,
    material,
    category,
    colors,
    lwh,
    price,
    quantity,
    volume,
  } = item;

  return (
    <article
      className={`flex ${
        page === "home"
          ? `${
              welcome ? "w-[350px]" : "w-[150px] xs:w-[215px] xl:w-[260px]"
            } flex-col`
          : page === "item"
          ? "flex-col md:flex-row w-full justify-center items-center md:items-start gap-x-12"
          : page === "checkout"
          ? "pb-6 gap-x-6"
          : "justify-between pb-6 gap-x-6"
      }`}
    >
      <Image
        alt="item"
        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/objects/${id}/1.jpeg`}
        width={350}
        height={350}
        quality={100}
        className={`${
          page === "home"
            ? `${
                welcome ? "w-[350px]" : "w-[150px] xs:w-[215px] xl:w-[260px]"
              } mb-3`
            : page === "item"
            ? `w-[350px] mx-auto md:mx-0 md:ml-6 md:mt-24`
            : page === "checkout"
            ? "w-[100px] xs:w-[150px]"
            : "w-[125px] xs:w-[150px]"
        } aspect-square`}
      />
      <div
        className={`flex ${
          page === "home"
            ? "flex-col h-full"
            : page === "item"
            ? "flex-col px-6 w-full md:w-[32rem]"
            : "flex-1 justify-between"
        }`}
      >
        <div
          className={`flex overflow-hidden ${
            page === "home"
              ? "flex-col gap-y-1.5 mb-3"
              : page === "item"
              ? "flex-col gap-y-1.5 mb-1.5"
              : `flex-col gap-y-3 -ml-3 mr-3 xs:mr-6`
          }`}
        >
          <Link
            href={`/?category=all&brands=${brand.id}`}
            className={`${
              page === "item" ? "text-lg" : "text-base"
            } font-normal uppercase w-fit`}
          >
            {brand.name}
          </Link>
          <div>
            {page === "item" ? (
              <h3 className="text-2xl font-extralight ">{formatName(item)}</h3>
            ) : (
              <Link href={`/${id}`}>{formatName(item)}</Link>
            )}
            {collection && page !== "item" && (
              <>
                {" "}
                /{" "}
                <Link
                  href={`/?category=all&collections=${collection.id}`}
                  className="font-extralight"
                >
                  {collection.name}
                </Link>
              </>
            )}
          </div>
        </div>
        <div
          className={`flex ${
            page === "home"
              ? `${
                  welcome ? "flex-row-reverse" : "flex-col"
                } xs:items-center gap-y-1.5 justify-between mt-auto xs:flex-row-reverse`
              : page === "item"
              ? "flex-row gap-x-6 mb-3 mt-1.5"
              : "flex-col justify-between"
          }`}
        >
          <div>
            <Add item={item} page={page} />
            {page === "item" && (
              <p className="text-xs text-center mt-1.5 mb-3">
                {quantity ? `В наличии ${quantity} шт` : ``}
              </p>
            )}
          </div>
          <p
            className={`text-base ${
              page === "checkout" ? "text-end" : "text-center"
            } xs:text-end`}
          >
            {fmtPrice(price)}
          </p>
        </div>
        {page === "item" && (
          <p className="flex flex-col">
            <span>
              Категория:{" "}
              <Link
                href={`/?category=${category.id}`}
                className="underline underline-offset-4"
              >
                {category.name}
              </Link>
            </span>
            <span>
              Бренд:{" "}
              <Link
                href={`/?category=all&brands=${brand.id}`}
                className="underline underline-offset-4"
              >
                {brand.name}
              </Link>
            </span>
            {collection && (
              <span>
                Коллекция:{" "}
                <Link
                  href={`/?category=all&collections=${collection.id}`}
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
                  href={`/?category=all&designers=${designer.id}`}
                  className="underline underline-offset-4"
                >
                  {designer.name}
                </Link>
              </span>
            )}
            <span>Производство: {brand.country}</span>
            <span>Материал: {material.name}</span>
            {colors && (
              <span>Цвет: {colors.map((color) => color.name).join(" / ")}</span>
            )}
            {formatLwh(lwh)}
            {volume && <span>{volume} мл</span>}
          </p>
        )}
        {page === "item" && formatDescription({ item })}
      </div>
    </article>
  );
}
