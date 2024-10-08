"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { SearchIcon } from "../icons";

export default function Search({
  search,
  onButtonClick,
  onInputClick,
}: {
  search: boolean;
  onButtonClick: () => void;
  onInputClick: () => void;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  return (
    <>
      <button className="z-10" onClick={onButtonClick} aria-label="search">
        <SearchIcon />
      </button>
      <div
        className={`absolute top-16 right-0 left-0 ${
          search ? "flex" : "hidden"
        } justify-center items-center px-6 py-2 mt-6 2xl:px-12 bg-white shadow border-t`}
      >
        <SearchIcon />
        <input
          type="search"
          name="search"
          aria-label="search"
          onChange={(e) => {
            const search = e.target.value;
            replace(search ? `?search=${search}` : "/");
          }}
          onClick={onInputClick}
          defaultValue={searchParams.get("search")?.toString()}
          autoCorrect="false"
          spellCheck="false"
          className="flex-1 p-4 text-base bg-inherit rounded-none outline-none"
        />
      </div>
    </>
  );
}
