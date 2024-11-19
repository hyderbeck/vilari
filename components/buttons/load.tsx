"use client";

import Link from "next/link";
import { useState } from "react";
import { Spinner } from "../icons";
import { formatRef } from "@/app/utils";
import { useSearchParams } from "@/app/hooks";

export default function Load({ className }: { className: string }) {
  const params = useSearchParams();
  params.limit = String(Number(params.limit || 12) + 12);

  const [loading, setLoading] = useState(false);

  return (
    <Link
      replace
      href={formatRef(params)}
      scroll={false}
      className={`btn ${className}`}
      onClick={() => {
        setLoading(true);
      }}
    >
      {loading && <Spinner />}
      Больше
    </Link>
  );
}
