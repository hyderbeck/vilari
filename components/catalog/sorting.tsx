"use client";

import { useRouter } from "next/navigation";
import { formatRef } from "@/app/utils";
import { Arrow as ArrowIcon } from "../icons";
import { useSearchParams } from "@/app/hooks";

export default function Sorting() {
  const { replace } = useRouter();
  const params = useSearchParams();

  return (
    <div className="relative ml-auto">
      <select
        onChange={(e) => {
          params.order = e.target.value;
          replace(formatRef(params));
        }}
        style={{
          appearance: "none",
        }}
        className="btn w-40 h-7 outline-none ml-auto"
        defaultValue={params.order}
      >
        <option value="">По умолчанию</option>
        <option value="desc">Сначала дороже</option>
        <option value="asc">Сначала дешевле</option>
      </select>
      <ArrowIcon className="size-4 text-white absolute top-1.5 right-1.5" />
    </div>
  );
}
