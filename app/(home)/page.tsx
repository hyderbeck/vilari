import Load from "@/components/buttons/load";
import { Spinner } from "@/components/icons";
import Preview from "@/components/preview";
import { getItems } from "@/queries";
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
    <main className="px-6 2xl:px-12 pt-32">
      {items.length ? (
        <Suspense
          key={items[items.length - 1].id || ""}
          fallback={
            <div className="flex justify-center">
              <Spinner />
            </div>
          }
        >
          <section className="flex flex-col items-center justify-center gap-y-12">
            <div className="grid grid-cols-1 gap-y-12 w-full max-w-screen-lg">
              {items.map((item) => (
                <Preview key={item.id} item={item} page="home" />
              ))}
            </div>
            {nextHref && <Load limit={limit} />}
          </section>
        </Suspense>
      ) : (
        <p className="text-center">Ничего не найдено</p>
      )}
    </main>
  );
}
