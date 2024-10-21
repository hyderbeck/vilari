"use client";

import BagSection from "../bag";
import { useItems } from "@/app/hooks";
import { BagIcon } from "../icons";
import Link from "next/link";
import { useEffect } from "react";

export default function Bag({
  bag,
  onClick,
}: {
  bag: boolean;
  onClick: () => void;
}) {
  const items = useItems("order");
  useEffect(() => {
    if (bag && !items.length) {
      onClick();
    }
  }, [items, bag, onClick]);
  return (
    <>
      <div className="flex justify-between items-center w-10">
        <button
          className="hidden md:block z-10"
          onClick={() => items.length && onClick()}
          aria-label="bag"
        >
          <BagIcon />
        </button>
        <Link
          scroll={false}
          href="/checkout"
          className="md:hidden"
          onClick={() => items.length && onClick()}
          aria-label="checkout"
        >
          <BagIcon />
        </Link>
        {items.reduce((total, item) => total + item.amount!, 0)}
      </div>
      <BagSection
        items={items}
        className={`${
          bag ? "hidden md:flex" : "hidden"
        } flex-col absolute top-16 mt-6 right-0 bg-white border border-r-0 w-[32rem] h-[20rem]`}
      />
    </>
  );
}
