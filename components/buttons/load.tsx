"use client";

import Link from "next/link";
import { useState } from "react";
import { Spinner } from "../icons";

export default function Load({
  limit,
  search,
  filter,
}: {
  limit: number;
  search?: string;
  filter?: string;
}) {
  const [loading, setLoading] = useState(false);
  let endpoint = `?limit=${limit + 10}`;
  if (search) endpoint += `&search=${search}`;
  if (filter) endpoint += `&filter=${filter}`;
  return (
    <Link
      replace
      href={endpoint}
      scroll={false}
      className="p-2 text-center bg-black text-white rounded font-normal w-28 flex justify-center items-center gap-x-3"
      onClick={() => {
        setLoading(true);
      }}
    >
      {loading && <Spinner />}
      Больше
    </Link>
  );
}
