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
    materials: "Материал",
  };
  const [filterSet, setFilterSet] = useState(searchParams[filterType]);
  useEffect(() => {
    setFilterSet(searchParams[filterType]);
  }, [searchParams]);
  return (
    <section className="flex flex-col gap-y-1">
      <h3>{filterTypeDict[filterType]}</h3>
      <ul
        className={`grid grid-cols-2 md:grid-cols-1 ${
          filters[filterType].length > 5 ? "md:grid-cols-2" : ""
        } gap-x-9 gap-y-1`}
      >
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
  const searchParams: SearchParams = {};
  params.forEach(
    (value, key) => (searchParams[key as keyof SearchParams] = value)
  );
  const [filterMenu, setFilterMenu] = useState(true);

  return (
    <>
      <button
        className="absolute top-[115px]"
        onClick={() => setFilterMenu(!filterMenu)}
      >
        <FiltersIcon />
      </button>
      <section
        className={`${
          filterMenu ? "flex" : "hidden"
        } flex-col md:flex-row -mt-6 gap-x-6 gap-y-6 justify-between`}
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
