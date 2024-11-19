"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SearchParams } from "@/interfaces";
import { buildRef } from "@/utils";
import { ArrowIcon } from "../icons";

export default function Sorting() {
  const { replace } = useRouter();

  const params = useSearchParams();
  const searchParams: SearchParams = {};
  params.forEach(
    (value, key) => (searchParams[key as keyof SearchParams] = value)
  );

  return (
    <div className="relative ml-auto">
      <select
        onChange={(e) => {
          searchParams.order = e.target.value === "new" ? "" : e.target.value;
          replace(buildRef(searchParams));
        }}
        style={{
          appearance: "none",
        }}
        className="btn h-7 outline-none ml-auto w-40"
        defaultValue={searchParams.order || "new"}
      >
        <option value="new">По умолчанию</option>
        <option value="desc">Сначала дороже</option>
        <option value="asc">Сначала дешевле</option>
      </select>
      <ArrowIcon className="absolute top-1.5 right-1.5 text-white" />
    </div>
  );
}
