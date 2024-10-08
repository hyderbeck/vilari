"use client";

import { ItemTypes } from "@/interfaces";
import { NavIcon } from "../icons";
import { useState } from "react";
import Link from "next/link";

// do top- instead of pt-?

export default function Nav({
  nav,
  onClick,
  itemTypes,
}: {
  nav: boolean;
  onClick: () => void;
  itemTypes: ItemTypes;
}) {
  const [group, setGroup] = useState("");
  const className = "xs:hover:font-normal text-base";
  return (
    <>
      <button className="z-10 sm:hidden" onClick={onClick} aria-label="nav">
        <NavIcon />
      </button>
      <nav className="hidden md:flex absolute top-8 left-[12.5rem] 2xl:left-[14rem]  w-full gap-x-6">
        <Link href="" className="text-base tracking-normal">
          Столовые предметы
        </Link>
        <Link href="" className="text-base tracking-normal">
          Чайные предметы
        </Link>
        <Link href="" className="text-base tracking-normal">
          Декор
        </Link>
      </nav>
      <nav
        className={`absolute top-16 pt-6 mt-6 right-0 left-0 h-screen ${
          nav ? "md:hidden" : "hidden"
        } w-full border-t bg-white flex flex-col items-center overflow-scroll`}
      >
        {group ? (
          <button onClick={() => setGroup("")} className={`${className} mb-3`}>
            {"<<"}
          </button>
        ) : (
          <Link
            replace
            href="/"
            className={`${className} mb-3`}
            onClick={() => {
              onClick();
              setGroup("");
            }}
          >
            Всё
          </Link>
        )}
        {group ? (
          itemTypes[group]
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((itemType) => (
              <Link
                replace
                key={itemType.id}
                href={"?filter=pathname=" + group + "/" + itemType.name}
                onClick={() => {
                  onClick();
                  setGroup("");
                }}
                className={className}
              >
                {itemType.name}
              </Link>
            ))
        ) : (
          <>
            {Object.keys(itemTypes)
              .sort()
              .map((key) => (
                <button
                  key={key}
                  onClick={() => setGroup(key)}
                  className={className}
                >
                  {key}
                </button>
              ))}
          </>
        )}
      </nav>
    </>
  );
}
