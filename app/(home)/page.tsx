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
    <main className="px-6 pt-32 flex-1 flex justify-center items-center">
      <Suspense fallback={<p className="text-base font-normal">. . .</p>}>
        <section className="flex flex-col items-center justify-center gap-y-6 w-full">
          <div className="grid grid-cols-1 gap-8 w-full max-w-screen-lg 2xl:ml-12">
            {items.length
              ? items.map((item) => (
                  <Preview key={item.id} item={item} page="home" />
                ))
              : "not found"}
          </div>
          {nextHref && (
            <Link
              replace
              href={`?limit=${limit + 10}`}
              scroll={false}
              className="py-2 text-center bg-black text-white rounded font-normal w-28 2xl:ml-12"
            >
              Больше
            </Link>
          )}
        </section>
      </Suspense>
    </main>
  );
}
