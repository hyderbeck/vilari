"use client";

import Link from "next/link";
import { useState } from "react";
import { Spinner } from "../icons";
import { buildRef } from "@/utils";
import { SearchParams } from "@/interfaces";
import { useSearchParams } from "next/navigation";

export default function Load() {
  const params = useSearchParams();
  const searchParams: SearchParams = {};
  params.forEach(
    (value, key) => (searchParams[key as keyof SearchParams] = value)
  );

  const [loading, setLoading] = useState(false);
  searchParams.limit = String(Number(searchParams.limit || 12) + 12);
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
