"use client";

import { SearchParams, Filters } from "@/interfaces";
import { buildRef } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckIcon, FiltersIcon } from "../icons";
import { useEffect, useState } from "react";

function FilterSet({
  filters,
  searchParams,
  filterType,
}: {
  filters: Filters;
  searchParams: SearchParams;
  filterType: keyof Filters;
}) {
  const { replace } = useRouter();
  const filterTypeDict = {
    brands: "Бренды",
    collections: "Коллекции",
    materials: "Материалы",
  };
  const [filterSet, setFilterSet] = useState(searchParams[filterType]);
  useEffect(() => {
    setFilterSet(searchParams[filterType]);
  }, [searchParams, filterType]);

  if (searchParams.category && !["all", "tableware", "teaware", "decor"].includes(searchParams.category)) {
    filters[filterType] = filters[filterType].filter((f) =>
      f.categories.includes(Number(searchParams.category))
    ) as any;
  }

  if (filterType === "collections") {
    filters[filterType] = filters[filterType].filter((f) => {
      if (!searchParams.brands) return false;
      return searchParams.brands.split(",").includes(String(f.brand));
    });
  }

  filters[filterType].sort((a, b) => a.name.localeCompare(b.name));

  if (!filters[filterType].length) return;

  return (
    <section className="flex flex-col gap-y-3">
      <h3>{filterTypeDict[filterType]}</h3>
      <ul className={`grid grid-cols-2 md:grid-cols-1 gap-x-9 gap-y-1.5`}>
        {filters[filterType].map((filter) => {
          const id = String(filter.id);
          const isIncluded = filterSet?.split(",").includes(id) || false;
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
                      setFilterSet(filters);
                    } else {
                      const arr = filterSet!.split(",");
                      arr.splice(arr.indexOf(id), 1);
                      searchParams[filterType] = arr.join(",");
                      setFilterSet(arr.join(","));
                    }
                    if ("brand" in filter) {
                      searchParams.brands = String(filter.brand);
                      searchParams.materials = undefined;
                    } else if (filterType === "materials") {
                      searchParams.collections = undefined;
                    } else if (filterType === "brands") {
                      searchParams.collections = undefined;
                    }
                    replace(buildRef(searchParams));
                  }}
                />
                <span className="leading-tight">{filter.name}</span>
                <CheckIcon
                  className={`${
                    isIncluded ? "" : "hidden"
                  } absolute left-[0.1rem] top-[0.1rem] text-white`}
                />
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function Filtering({ filters }: { filters: Filters }) {
  const params = useSearchParams();
  const { replace } = useRouter();
  const searchParams: SearchParams = {};
  params.forEach(
    (value, key) => (searchParams[key as keyof SearchParams] = value)
  );
  const [filterMenu, setFilterMenu] = useState(
    (searchParams.brands ||
      searchParams.collections ||
      searchParams.materials) ??
      false
  );

  return (
    <>
      <button
        className="-mt-[3.1rem] w-fit"
        onClick={() => setFilterMenu(!filterMenu)}
      >
        <FiltersIcon />
      </button>
      {filterMenu && (
        <button
          onClick={() => {
            searchParams.brands = undefined;
            searchParams.collections = undefined;
            searchParams.materials = undefined;
            replace(buildRef(searchParams));
          }}
          className="underline underline-offset-4 w-fit"
        >
          Сбросить
        </button>
      )}
      <section
        className={`${
          filterMenu ? "flex" : "hidden"
        } flex-col md:flex-row gap-x-24 gap-y-6`}
      >
        <FilterSet
          filters={filters}
          searchParams={searchParams}
          filterType="brands"
        />
        <FilterSet
          filters={filters}
          searchParams={searchParams}
          filterType="collections"
        />
        <FilterSet
          filters={filters}
          searchParams={searchParams}
          filterType="materials"
        />
      </section>
    </>
  );
}
