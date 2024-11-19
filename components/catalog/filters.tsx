"use client";

import { Brand, Collection, Material, SearchParams } from "@/interfaces";
import { formatRef } from "@/app/utils";
import { useRouter } from "next/navigation";
import { Check as CheckIcon, Filters as FiltersIcon } from "../icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "@/app/hooks";

export type FilterType =
  | { brands: Brand[] }
  | { collections: Collection[] }
  | { materials: Material[] };

function Filter({
  filter,
  searchParams,
}: {
  filter: FilterType;
  searchParams: SearchParams;
}) {
  const { replace } = useRouter();

  const filterTypeDict = {
    brands: "Бренды",
    collections: "Коллекции",
    materials: "Материалы",
  };

  const filterType = Object.keys(filter)[0] as
    | "brands"
    | "collections"
    | "materials";
  let filterSet = Object.values(filter)[0] as
    | Brand[]
    | Collection[]
    | Material[];

  const [filterParam, setFilterParam] = useState(searchParams[filterType]);

  useEffect(() => {
    setFilterParam(searchParams[filterType]);
  }, [searchParams, filterType]);

  if (
    searchParams.category &&
    !["all", "tableware", "teaware", "decor"].includes(searchParams.category)
  ) {
    filterSet = filterSet.filter((f) =>
      f.categories.includes(Number(searchParams.category))
    ) as typeof filterSet;
  }

  if (filterType === "collections") {
    if (!searchParams.brands) {
      filterSet = [];
    } else {
      const brands = searchParams.brands.split(",");
      filterSet = (filterSet as Collection[]).filter((f) =>
        brands.includes(String(f.brand))
      );
    }
  }

  if (!filterSet.length) return;

  filterSet.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <article className="flex flex-col gap-y-3">
      <h3>{filterTypeDict[filterType]}</h3>
      <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-9 gap-y-1.5">
        {filterSet.map((f) => {
          const id = String(f.id);
          const isIncluded = filterParam?.split(",").includes(id);

          return (
            <li key={id}>
              <label className="flex gap-x-1.5 relative">
                <input
                  type="checkbox"
                  checked={isIncluded}
                  style={{
                    appearance: "none",
                  }}
                  className="p-2 rounded bg-black h-fit"
                  onChange={() => {
                    if (!isIncluded) {
                      const filters = searchParams[filterType]
                        ? searchParams[filterType] + "," + id
                        : id;
                      searchParams[filterType] = filters;
                      setFilterParam(filters);
                    } else {
                      const arr = filterParam!.split(",");
                      arr.splice(arr.indexOf(id), 1);
                      searchParams[filterType] = arr.join(",");
                      setFilterParam(arr.join(","));
                    }

                    if ("brand" in f) {
                      searchParams.brands = String(f.brand);
                      searchParams.materials = undefined;
                    } else if (filterType === "materials") {
                      searchParams.collections = undefined;
                    } else if (filterType === "brands") {
                      searchParams.collections = undefined;
                    }

                    replace(formatRef(searchParams));
                  }}
                />
                <span className="leading-tight">{f.name}</span>
                <CheckIcon
                  className={`${
                    isIncluded ? "" : "hidden"
                  } size-3 text-white absolute left-[0.1rem] top-[0.1rem]`}
                />
              </label>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export default function Filters({
  filters,
  className,
}: {
  filters: {
    brands: Brand[];
    collections: Collection[];
    materials: Material[];
  };
  className: { btn: string };
}) {
  const params = useSearchParams();

  const [isFilters, setFilterParams] = useState(
    !!(params.brands || params.collections || params.materials)
  );

  return (
    <>
      <button
        className={className.btn}
        onClick={() => setFilterParams(!isFilters)}
      >
        <FiltersIcon className="size-6" />
      </button>
      {isFilters && (
        <Link
          replace
          href={formatRef({
            brands: undefined,
            collections: undefined,
            materials: undefined,
            ...params,
          })}
          className="underlined w-fit"
        >
          Сбросить
        </Link>
      )}
      <section
        className={`${
          isFilters ? "flex" : "hidden"
        } flex-col md:flex-row gap-x-24 gap-y-6`}
      >
        {["brands", "collections", "materials"].map((filterType, i) => (
          <Filter
            key={i}
            filter={
              {
                [filterType]: filters[filterType as keyof typeof filters],
              } as FilterType
            }
            searchParams={params}
          />
        ))}
      </section>
    </>
  );
}
