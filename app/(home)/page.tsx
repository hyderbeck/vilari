import Catalog from "@/components/catalog";
import { Spinner } from "@/components/icons";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: { limit?: number; search?: string; filter?: string };
}) {
  return (
    <main className="px-6 2xl:px-12 pt-28 flex-1">
      <Suspense
        key={searchParams.filter || searchParams.search}
        fallback={
          <div className="flex justify-center">
            <Spinner />
          </div>
        }
      >
        <Catalog searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
