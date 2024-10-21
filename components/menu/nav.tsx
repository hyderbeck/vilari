"use client";

import { Category } from "@/interfaces";
import { NavIcon } from "../icons";
import Link from "next/link";
// import Image from "next/image";
import { useState } from "react";
import { buildRef } from "@/utils";

export default function Nav({
  categories,
  nav,
  onClick,
}: {
  categories: Category[];
  nav: boolean;
  onClick: () => void;
}) {
  const departments = [
    { id: 1, name: "Столовые предметы" },
    { id: 2, name: "Чайные предметы" },
    { id: 3, name: "Декор" },
  ];

  const [department, setDepartment] = useState(0);

  let itemTypes: Category[] = [];

  if (!nav && department) {
    setDepartment(0);
  } else {
    itemTypes = categories.filter(
      (category) => category.department === department
    );
  }
  return (
    <>
      <button
        className="md:hidden z-10"
        onClick={() => {
          setDepartment(0);
          onClick();
        }}
        aria-label="nav"
      >
        <NavIcon />
      </button>
      <nav className="hidden md:flex gap-x-6 absolute top-9 left-[12.5rem]">
        {departments.map((departm) => (
          <button
            key={departm.id}
            onClick={() => {
              setDepartment(departm.id);
              (!nav || department === departm.id) && onClick();
            }}
          >
            {departm.name}
          </button>
        ))}
        <section
          className={`${
            nav ? "grid" : "hidden"
          } grid grid-cols-3 fixed top-16 mt-6 p-6 right-0 left-0 bg-white border-t border-b`}
        >
          {itemTypes
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((itemType) => {
              const ref = buildRef({
                category: String(itemType.id),
              });
              return (
                <Link
                  key={itemType.id}
                  replace
                  href={ref}
                  className="w-fit"
                  onClick={onClick}
                >
                  {itemType.name}
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
        {department ? (
          <button onClick={() => setDepartment(0)} className="text-base mb-3">
            {"<<"}
          </button>
        ) : (
          <Link
            replace
            href="/?category=all"
            className="text-base mb-3"
            onClick={onClick}
          >
            Всё
          </Link>
        )}
        {department
          ? itemTypes
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((itemType) => {
                const ref = buildRef({
                  category: String(itemType.id),
                });
                return (
                  <Link
                    key={itemType.id}
                    replace
                    href={ref}
                    className="text-base md:text-sm"
                    onClick={onClick}
                  >
                    {itemType.name}
                  </Link>
                );
              })
          : departments.map((department) => (
              <button
                key={department.id}
                className="text-base md:text-sm"
                onClick={() => setDepartment(department.id)}
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
