"use client";

import { ItemTypes } from "@/interfaces";
import { NavIcon } from "../icons";
import { useState } from "react";
import Link from "next/link";

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
  const className = "text-base hover:font-normal";
  return (
    <>
      <button className="z-10" onClick={onClick}>
        <NavIcon />
      </button>
      <nav
        className={`fixed md:absolute top-0 md:top-auto right-0 bottom-0 md:bottom-auto left-0 md:left-auto ${
          nav ? "" : "hidden"
        } pt-[88px] md:pt-14 w-full md:max-w-xs md:-z-10 md:overflow-scroll bg-white md:shadow nav`}
      >
        <div
          className={`flex flex-col items-center p-6 border-t md:border-none overflow-scroll md:overflow-auto max-h-full`}
        >
          {group ? (
            <button
              onClick={() => setGroup("")}
              className={`${className} mb-3`}
            >
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
            itemTypes[group].map((itemType) => (
              <Link
                replace
                key={itemType.id}
                href={"?filter=pathName=" + group + "/" + itemType.name}
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
              {Object.keys(itemTypes).map((key) => (
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
        </div>
      </nav>
    </>
  );
}
