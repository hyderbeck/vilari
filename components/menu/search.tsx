"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { SearchIcon } from "../icons";
import { buildRef } from "@/utils";

export default function Search({
  search,
  onClick,
}: {
  search: boolean;
  onClick: () => void;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  return (
    <>
      <button className="z-10" onClick={onClick} aria-label="search">
        <SearchIcon />
      </button>
      <div
        className={`absolute top-16 mt-6 right-0 left-0 ${
          search ? "flex" : "hidden"
        } justify-center items-center gap-x-3 p-6 bg-white border-t border-b`}
      >
        <SearchIcon />
        <input
          type="search"
          name="search"
          aria-label="search"
          onChange={(e) => {
            const search = e.target.value.trim();
            const ref = buildRef({
              search,
              type: !search ? "all" : "",
            });
            replace(ref);
          }}
          defaultValue={searchParams.get("search")?.toString()}
          autoCorrect="false"
          spellCheck="false"
          className="flex-1 text-base bg-inherit rounded-none outline-none"
        />
      </div>
    </>
  );
}
