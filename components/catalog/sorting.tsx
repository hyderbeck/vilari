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
    <>
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
        <option value="new">Сначала новые</option>
        <option value="desc">Сначала дороже</option>
        <option value="asc">Сначала дешевле</option>
      </select>
      <ArrowIcon className="absolute top-[7.5rem] right-[1.825rem] text-white" />
    </>
  );
}
