"use client";

import Link from "next/link";
import { useState } from "react";
import { Spinner } from "../icons";

export default function Load({ limit }: { limit: number }) {
  const [loading, setLoading] = useState(false);
  return (
    <Link
      replace
      href={`?limit=${limit + 10}`}
      scroll={false}
      className="p-2 text-center bg-black text-white rounded font-normal w-28 flex justify-center items-center gap-x-3"
      onClick={() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
      }}
    >
      {loading && <Spinner />}
      Больше
    </Link>
  );
}
