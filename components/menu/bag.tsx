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
      {bag && (
        <BagSection
          items={items}
          className={
            `absolute right-0 ${
              bag ? "hidden md:flex" : "hidden"
            } flex-col pt-16 w-full max-w-md max-h-[480px] shadow -z-10 bg-white` /* hidden below search div */
          }
        />
      )}
    </>
  );
}
