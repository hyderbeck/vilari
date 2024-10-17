"use client";

import Link from "next/link";
import { useState } from "react";
import { Spinner } from "../icons";
import { buildRef } from "@/utils";
import { SearchParams } from "@/interfaces";

export default function Load({
  searchParams
}:
{
  searchParams: SearchParams
}) {
  const [loading, setLoading] = useState(false);
  searchParams.limit = String(Number(searchParams.limit) + 10)
  const ref = buildRef(searchParams);
  return (
    <Link
      replace
      href={ref}
      scroll={false}
      className="btn mx-auto"
      onClick={() => {
        setLoading(true);
      }}
    >
      {loading && <Spinner />}
      Больше
    </Link>
  );
}
