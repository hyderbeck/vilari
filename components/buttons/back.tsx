"use client";

import { useRouter } from "next/navigation";

export function Back() {
  const { back } = useRouter();
  return (
    <button
      onClick={() => back()}
      className="underline underline-offset-4 w-fit absolute top-0 left-[1.5rem]"
    >
      Назад
    </button>
  );
}
