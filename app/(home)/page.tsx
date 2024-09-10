import Preview from "@/components/preview";
import { getItems } from "@/queries";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: { limit?: number; search?: string; filter?: string };
}) {
  const limit = Number(searchParams.limit) || 10;
  const { items, nextHref } = await getItems(limit, {
    search: searchParams.search,
    filter: searchParams.filter,
  });
  return (
    <main className="flex flex-col items-center justify-center">
      <h2></h2>
      <p></p>
      <Suspense fallback="...">
        <section className="px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {items.length
              ? items.map((item) => <Preview key={item.id} item={item} />)
              : "not found"}
          </div>
          {nextHref && (
            <Link href={`?limit=${limit + 10}`} scroll={false}>
              Load more
            </Link>
          )}
        </section>
      </Suspense>
    </main>
  );
}
