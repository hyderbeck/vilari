"use client";

import Link from "next/link";
import { useItems } from "../bag";
import { BagIcon } from "../icons";

export default function Bag({
  bag,
  onClick,
}: {
  bag: boolean;
  onClick: () => void;
}) {
  const items = useItems();
  return (
    <>
      <button
        className="hidden md:flex gap-x-1 items-center z-10"
        onClick={onClick}
      >
        <BagIcon />
        {items.length}
      </button>
      <Link
        href="/checkout"
        className="flex md:hidden gap-x-1 items-center z-10"
        onClick={() => (document.body.style.overflow = "auto")}
      >
        <BagIcon />
        {items.length}
      </Link>
      <section
        className={
          `absolute right-0 ${
            bag ? "hidden md:flex" : "hidden"
          } flex-col pt-16 w-full max-w-md max-h-[480px] shadow -z-10 bg-white` /* hidden below search div */
        }
      >
        {items.length ? (
          <>
            <section className="flex flex-col overflow-y-scroll gap-y-6 p-6 2xl:pr-12">
              {items.map((item) => (
                <article className="flex justify-between gap-x-6 h-[100px]">
                  <img
                    alt="item"
                    src={item.imageHref}
                    className="w-[100px] aspect-square"
                  />
                  <p className="overflow-hidden">{item.name}</p>
                  <div className="flex flex-col justify-between items-end w-[394px]">
                    <p className="text-xs">x{item.quantity}</p>
                    <p className="text-base">{item.price / 100} RUB</p>
                  </div>
                </article>
              ))}
            </section>
            <footer className="flex flex-col p-6 pt-0 2xl:pr-12 gap-y-6">
              <p className="flex items-center justify-between w-full border-t pt-6">
                <span>Итого</span>
                <span className="text-base">
                  {items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  ) / 100}{" "}
                  RUB
                </span>
              </p>
              <Link
                href="/checkout"
                className="px-3 py-2 text-center bg-black text-white rounded font-normal"
              >
                Оформить
              </Link>
            </footer>
          </>
        ) : (
          <p className="p-6">Пусто</p>
        )}
      </section>
    </>
  );
}
