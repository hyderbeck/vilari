"use client";

import Link from "next/link";
import { BagIcon } from "../icons";
import BagSection, { useItems } from "../bag";

export default function Bag({
  bag,
  onClick,
}: {
  bag: boolean;
  onClick: () => void;
}) {
  const items = useItems();
  const className = "justify-between items-center w-10 z-10";
  return (
    <>
      <button
        className={`${className} hidden md:flex`}
        onClick={onClick}
        aria-label="bag"
      >
        <BagIcon />
        {items.reduce((total, item) => total + item.quantity, 0)}
      </button>
      <Link
        href="/checkout"
        className={`${className} flex md:hidden`}
        onClick={() => (document.body.style.overflow = "auto")}
        aria-label="checkout"
      >
        <BagIcon />
        {items.reduce((total, item) => total + item.quantity, 0)}
      </Link>
      {bag && (
        <BagSection
          items={items}
          className={`absolute right-0 top-16 mt-6 hidden ${
            bag ? "md:flex" : ""
          } flex-col w-full max-w-md max-h-[420px] shadow bg-white border-t`}
        />
      )}
    </>
  );
}
