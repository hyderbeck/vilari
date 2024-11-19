"use client";

import { useRouter } from "next/navigation";

export default function Back({ className }: { className: string }) {
  const { back } = useRouter();

  return (
    <button onClick={() => back()} className={`underlined ${className}`}>
      Назад
    </button>
  );
}
