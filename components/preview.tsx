"use client";

import { Item } from "@/interfaces";
import Add from "./buttons/add";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Spinner } from "./icons";

const groups: { [key: string]: string } = {
  Вазы: "Ваза",
  "Сервировочные салфетки": "",
};

function formatName(item: Item) {
  const groupName =
    groups[item.type.name] ||
    item.name
      .replace(item.collection?.name || "", "")
      .replace(item.object_name || "", "")
      .replace(item.brand.name, "")
      .trim();
  return (
    groupName +
    " " +
    item.collection!.name.toUpperCase() +
    (item.object_name ? " " + item.object_name.toUpperCase() : "")
  );
}

function formatDescription({ item }: { item: Item }) {
  const description =
    item.collection?.description
      ?.replaceAll("-", "—")
      .split(item.collection.name) ||
    item.brand.description?.replaceAll("-", "—").split(item.brand.name);
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
                  href={`/?type=all&${which}s=${id}`}
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

function formatWLH() {}

export default function Preview({
  item,
  page,
}: {
  item: Item;
  page?: "home" | "checkout" | "item";
}) {
  const { variants } = item;

  const i = variants
    ? variants.findIndex((variant) => variant.moysklad_id === item.moysklad_id)
    : 0;
  const [variant, setVariant] = useState(i >= 0 ? i : 0);

  let folder = variants ? variant + 1 : 0;

  if (page === "item") {
    Object.entries(variants![variant]).forEach(
      (kv) => ((item[kv[0] as keyof Item] as any) = kv[1])
    );
  }

  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    setTimeout(() => setSpinner(false), 1000);
  }, []);

  const {
    id,
    brand,
    collection,
    designer,
    material,
    type,
    colors,
    lwh,
    volume,
    weight,
    price,
    object_name,
    quantity,
  } = item;

  const name = formatName(item);

  let d = 0;
  if (lwh[0] === lwh[1]) d = lwh[0];

  return (
    <article
      className={`flex ${
        page === "home"
          ? "flex-col w-[150px] xs:w-[215px] xl:w-[260px]"
          : page === "item"
          ? "flex-col md:flex-row w-full justify-center lg:items-center gap-x-12"
          : page === "checkout"
          ? "pb-6 gap-x-6"
          : "justify-between pb-6 gap-x-6"
      }`}
    >
      <div
        className={
          page === "item" && variants!.length > 1
            ? "flex items-center flex-col lg:flex-row-reverse shrink-0 w-full max-w-screen-xs mx-auto md:w-[24rem] md:-mr-6 lg:w-auto lg:mx-0 lg:ml-3"
            : "flex items-center shrink-0"
        }
      >
        <Image
          alt="item"
          src={`${
            process.env.NEXT_PUBLIC_SUPABASE_URL
          }/storage/v1/object/public/objects/${id}${
            folder ? "/" + folder : ""
          }/1.jpeg`}
          width={500}
          height={500}
          quality={100}
          className={`${
            page === "home"
              ? "w-[150px] xs:w-[215px] xl:w-[260px] mb-3"
              : page === "item"
              ? `w-[350px] ${
                  variants!.length > 1
                    ? "mr-auto md:mr-0"
                    : "mx-auto md:mx-0 md:ml-6"
                }`
              : page === "checkout"
              ? "w-[125px] xs:w-[150px]"
              : "w-[125px] xs:w-[150px]"
          } aspect-square`}
        />
        {page === "item" &&
          variants!.length > 1 &&
          (spinner ? (
            <div className="hover:cursor-pointer w-[125px] aspect-square mb-6 md:mb-0 ml-auto mr-3 md:mr-0 md:ml-0 bg-white flex justify-center">
              <Spinner />
            </div>
          ) : (
            <Image
              onClick={() => {
                const nextVariant = variant + 1;
                setSpinner(true);
                setTimeout(() => setSpinner(false), 1000);
                setVariant(nextVariant < variants!.length ? nextVariant : 0);
              }}
              alt="item"
              src={`${
                process.env.NEXT_PUBLIC_SUPABASE_URL
              }/storage/v1/object/public/objects/${id}/${
                folder + 1 <= variants!.length ? folder + 1 : 1
              }/1.jpeg`}
              width={125}
              height={125}
              className="hover:cursor-pointer w-[125px] aspect-square mb-6 md:mb-0 ml-auto mr-3 md:mr-0 md:ml-0"
            />
          ))}
      </div>
      <div
        className={`flex ${
          page === "home"
            ? "flex-col h-full"
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
              <h2 className="text-2xl font-extralight tracking-normal">
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
            page === "home"
              ? "flex-col xs:items-center gap-y-1.5 mt-auto xs:flex-row-reverse"
              : page === "item"
              ? "flex-row-reverse mt-1.5"
              : "flex-col"
          }`}
        >
          <div>
            <Add item={item} page={page} />
            {page === "item" && (
              <p className="text-xs text-center mt-1.5 mb-3">
                {quantity ? `В наличии ${quantity} шт` : `ждать столько-то`}
              </p>
            )}
          </div>
          <p className="text-base text-center xs:text-end">{price} RUB</p>
        </div>
        {page === "item" && (
          <p className="flex flex-col">
            {object_name && <span>{object_name}</span>}
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
            <span>Цвет: {colors.map((color) => color.name).join(" / ")}</span>
            <span>
              Категория:{" "}
              <Link
                href={`/?type=${type.id}`}
                className="underline underline-offset-4"
              >
                {type.name}
              </Link>
            </span>
            <span>
              {d
                ? "⌀ " + d + " см" + (lwh[2] ? " h " + lwh[2] + " см" : "")
                : lwh[0] +
                  " см x " +
                  lwh[1] +
                  " см" +
                  (lwh[2] ? " см x " + lwh[2] + " см" : "")}
            </span>
            {volume && <span>{volume}</span>}
            {weight && <span>{weight}</span>}
          </p>
        )}
        {page === "item" && formatDescription({ item })}
      </div>
    </article>
  );
}
