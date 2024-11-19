"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Search as SearchIcon } from "../icons";
import { formatRef } from "@/app/utils";

export default function Search({
  search,
  onClick,
  className,
}: {
  search: boolean;
  onClick: () => void;
  className: { btn: string; search: string };
}) {
  const { replace } = useRouter();

  return (
    <>
      <button onClick={onClick} aria-label="search" className={className.btn}>
        <SearchIcon className="size-6" />
      </button>

      <div
        className={`${
          search ? "flex" : "hidden"
        } justify-center items-center gap-x-3 p-6 bg-white border-t border-b ${
          className.search
        }`}
      >
        <SearchIcon className="size-6" />
        <input
          type="search"
          name="search"
          aria-label="search"
          onChange={(e) => {
            const search = e.target.value.trim();
            replace(
              formatRef({
                search,
                category: search ? undefined : "all",
              })
            );
          }}
          defaultValue={useSearchParams().get("search") ?? undefined}
          autoCorrect="false"
          spellCheck="false"
          className="flex-1 text-base bg-inherit rounded-none outline-none"
        />
      </div>
    </>
  );
}
