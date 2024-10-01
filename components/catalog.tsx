import { getItems } from "@/queries";
import Load from "./buttons/load";
import Preview from "./preview";

export default async function Catalog({
  searchParams,
}: {
  searchParams: {
    limit?: number;
    search?: string;
    filter?: string;
    outOfStock?: string;
  };
}) {
  const limit = Number(searchParams.limit) || 10;
  const { items, nextHref } = await getItems(limit, {
    search: searchParams.search,
    filter: searchParams.filter,
    stock: !searchParams.outOfStock,
  });
  return items.length ? (
    <section className="flex flex-col items-center gap-y-12">
      <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-12 gap-y-6">
        {items.map((item) => (
          <Preview key={item.id} item={item} page="home" />
        ))}
      </div>
      {(!searchParams.outOfStock || nextHref) && (
        <Load
          key={limit}
          limit={limit}
          search={searchParams.search}
          filter={searchParams.filter}
          nextHref={nextHref}
        />
      )}
    </section>
  ) : (
    <p className="text-center">Ничего не найдено</p>
  );
}
