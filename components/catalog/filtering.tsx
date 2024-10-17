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
  }, [searchParams]);
  return (
    <section className="flex flex-col gap-y-1.5">
      <h3>{filterTypeDict[filterType]}</h3>
      <ul className="flex items-center" /**/>
        {filters[filterType].map((filter) => {
          const id = String(filter.id);
          const isIncluded = filterSet?.split(",").includes(id) || false;
          return (
            <li key={id}>
              <label className="flex items-center gap-x-1.5 relative">
                <input
                  type="checkbox"
                  checked={isIncluded}
                  style={{
                    appearance: "none",
                  }}
                  className="p-2 rounded bg-black"
                  onChange={() => {
                    if (!isIncluded) {
                      const filters = searchParams[filterType]
                        ? searchParams[filterType] + "," + id
                        : id;
                      searchParams[filterType] = filters;
                      setFilterSet(filters);
                    } else {
                      searchParams[filterType] = "";
                      setFilterSet("");
                    }
                    replace(buildRef(searchParams));
                  }}
                />
                {filter.name}
                <CheckIcon
                  className={`${
                    isIncluded ? "" : "hidden"
                  } absolute left-[0.1rem] text-white`}
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
  const [filterMenu, setFilterMenu] = useState(false);
  return (
    <>
      <button
        className="absolute top-[113px] md:hidden"
        onClick={() => setFilterMenu(!filterMenu)}
      >
        <FiltersIcon />
      </button>
      <section
        className={`${
          filterMenu ? "flex" : "hidden md:flex"
        } flex-col -mt-6 md:-mt-0 gap-y-3 mb-12 md:mb-0 md:-mr-6 md:w-[24rem]`}
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
