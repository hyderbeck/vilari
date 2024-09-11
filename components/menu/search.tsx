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
      <button className="md:hidden z-10" onClick={onButtonClick}>
        <SearchIcon />
      </button>
      <div
        style={{ clipPath: "inset(0px -10px -10px -10px" }}
        className={`absolute mt-14 md:m-0 md:top-0 right-0 md:bottom-0 left-0 ${
          !search ? "hidden md:flex" : "flex"
        } justify-center items-center p-6 pt-0 md:pt-6 pl-0 md:pl-6 bg-white shadow`}
      >
        <SearchIcon className="relative left-10 md:ml-6" />
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
          className="flex-1 md:max-w-screen-xs lg:max-w-screen-sm 2xl:max-w-screen-lg px-4 pl-12 py-2 bg-inherit rounded-full outline-none text-base border border-black"
        />
      </div>
    </>
  );
}
