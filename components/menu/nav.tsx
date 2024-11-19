"use client";

import { Category } from "@/interfaces";
import { Nav as NavIcon } from "../icons";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { formatRef } from "@/app/utils";
import { departments } from "@/app/constants";

export default function Nav({
  categories,
  nav,
  onClick,
}: {
  categories: Category[];
  nav: boolean;
  onClick: () => void;
}) {
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
        <NavIcon className="size-6" />
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
            nav && itemTypes.length ? "flex" : "hidden"
          } flex-col gap-y-3 fixed top-16 mt-6 p-6 right-0 left-0 bg-white border-t border-b`}
        >
          {!!department && (
            <Link
              key={departments.find((d) => department === d.id)!.param}
              replace
              href={formatRef({
                category: departments.find((d) => department === d.id)!.param,
              })}
              className="w-fit underline underline-offset-4"
              onClick={onClick}
            >
              Всё
            </Link>
          )}
          <div className={`grid grid-rows-5 grid-flow-col`}>
            {itemTypes
              .sort((a, b) => {
                if (b.name === "Разное") return -1;
                return a.name.localeCompare(b.name);
              })
              .map((itemType) => {
                const ref = formatRef({
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
          </div>
        </section>
      </nav>
      <div
        className={`${
          nav ? "flex md:hidden" : "hidden"
        } flex-col items-center gap-y-12 fixed top-16 mt-6 py-6 right-0 bottom-0 left-0 bg-white border-t overflow-scroll`}
      >
        <nav className="flex flex-col items-center text-base">
          {department ? (
            <button onClick={() => setDepartment(0)} className="mb-3">
              {"<<"}
            </button>
          ) : (
            <Link
              replace
              href="/?category=all"
              className="mb-3 underline underline-offset-4"
              onClick={onClick}
            >
              Всё
            </Link>
          )}
          {!!department && (
            <Link
              key={departments.find((d) => department === d.id)!.param}
              replace
              href={formatRef({
                category: departments.find((d) => department === d.id)!.param,
              })}
              className={`w-fit ${
                department === 2 ? "" : "mb-3"
              } underline underline-offset-4`}
              onClick={onClick}
            >
              Всё
            </Link>
          )}
          {department === 2 && (
            <Link
              key="multiple"
              replace
              href={formatRef({
                category: "6,7,11",
              })}
              className="w-fit mb-3"
              onClick={onClick}
            >
              Кружки и чашки
            </Link>
          )}
          {department
            ? itemTypes
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((itemType) => {
                  const ref = formatRef({
                    category: String(itemType.id),
                  });
                  return (
                    <Link
                      key={itemType.id}
                      replace
                      href={ref}
                      className="md:text-sm"
                      onClick={onClick}
                    >
                      {itemType.name}
                    </Link>
                  );
                })
            : departments.map((department) => (
                <button
                  key={department.id}
                  className="md:text-sm"
                  onClick={() => setDepartment(department.id)}
                >
                  {department.name}
                </button>
              ))}
        </nav>
        <Image alt="vilari" src="/logo.png" width={160} height={200} />
      </div>
    </>
  );
}
