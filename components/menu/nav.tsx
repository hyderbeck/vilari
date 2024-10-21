"use client";

import { ItemGroup } from "@/interfaces";
import { NavIcon } from "../icons";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { buildRef } from "@/utils";

export default function Nav({
  itemGroups,
  nav,
  onClick,
}: {
  itemGroups: ItemGroup[];
  nav: boolean;
  onClick: () => void;
}) {
  const departments = [
    { id: 1, name: "Столовые предметы" },
    { id: 2, name: "Чайные предметы" },
    { id: 3, name: "Декор" },
  ];

  const [group, setGroup] = useState(0);

  let groups: ItemGroup[] = [];

  if (!nav && group) {
    setGroup(0);
  } else {
    groups = itemGroups.filter((itemGroup) => itemGroup.department === group);
  }
  return (
    <>
      <button
        className="md:hidden z-10"
        onClick={() => {
          setGroup(0);
          onClick();
        }}
        aria-label="nav"
      >
        <NavIcon />
      </button>
      <nav className="hidden md:flex gap-x-6 absolute top-9 left-[12.5rem]">
        {departments.map((department) => (
          <button
            key={department.id}
            onClick={() => {
              setGroup(department.id);
              (!nav || group === department.id) && onClick();
            }}
          >
            {department.name}
          </button>
        ))}
        <section
          className={`${
            nav ? "flex" : "hidden"
          } flex flex-col fixed top-16 mt-6 p-6 right-0 left-0 bg-white border-t border-b`}
        >
          {groups.map((itemGroup) => {
            const ref = buildRef({
              type: String(itemGroup.id),
            });
            return (
              <Link
                key={itemGroup.id}
                replace
                href={ref}
                className="w-fit"
                onClick={onClick}
              >
                {itemGroup.name}
              </Link>
            );
          })}
        </section>
      </nav>
      <nav
        className={`${
          nav ? "flex md:hidden" : "hidden"
        } flex-col items-center fixed top-16 mt-6 py-6 right-0 bottom-0 left-0 bg-white border-t`}
      >
        {group ? (
          <button onClick={() => setGroup(0)} className="text-base mb-3">
            {"<<"}
          </button>
        ) : (
          <Link
            replace
            href="/?type=all"
            className="text-base mb-3"
            onClick={onClick}
          >
            Всё
          </Link>
        )}
        {group
          ? groups.map((itemGroup) => {
              const ref = buildRef({
                type: String(itemGroup.id),
              });
              return (
                <Link
                  key={itemGroup.id}
                  replace
                  href={ref}
                  className="text-base md:text-sm"
                  onClick={onClick}
                >
                  {itemGroup.name}
                </Link>
              );
            })
          : departments.map((department) => (
              <button
                key={department.id}
                className="text-base md:text-sm"
                onClick={() => setGroup(department.id)}
              >
                {department.name}
              </button>
            ))}
      </nav>
    </>
  );
}

/*
        <Image
          alt="vilari"
          src="/logo.png"
          width={160}
          height={200}
          className="mt-auto xs:hidden md:block w-auto h-auto"
        />
*/
