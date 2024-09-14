import { getItems } from "@/queries";
import Load from "./buttons/load";
import Preview from "./preview";

export default async function Catalog({
  searchParams,
}: {
  searchParams: { limit?: number; search?: string; filter?: string };
}) {
  const limit = Number(searchParams.limit) || 10;
  const { items, nextHref } = await getItems(limit, {
    search: searchParams.search,
    filter: searchParams.filter,
  });
  return items.length ? (
    <section className="flex flex-col items-center justify-center gap-y-12">
      <div className="grid grid-cols-1 gap-y-12 w-full max-w-screen-lg">
        {items.map((item) => (
          <Preview key={item.id} item={item} page="home" />
        ))}
      </div>
      {nextHref && (
        <Load
          key={limit}
          limit={limit}
          search={searchParams.search}
          filter={searchParams.filter}
        />
      )}
    </section>
  ) : (
    <p className="text-center">Ничего не найдено</p>
  );
}
