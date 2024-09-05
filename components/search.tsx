"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  return (
    <label className="flex items-center">
      search
      <input
        type="search"
        onChange={(e) => {
          const search = e.target.value;
          replace(search ? `?search=${search}` : "/");
        }}
        defaultValue={searchParams.get("search")?.toString()}
        className="min-h-full"
      />
    </label>
  );
}
