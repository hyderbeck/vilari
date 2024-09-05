import Preview from "@/components/preview";
import { getItems } from "@/queries";
import Link from "next/link";

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
    <main>
      <h2></h2>
      <p></p>
      <section>
        {items.map((item) => (
          <Preview key={item.id} name={item.name} />
        ))}
      </section>
      {nextHref && (
        <Link href={`?limit=${limit + 10}`} scroll={false}>
          Load more
        </Link>
      )}
    </main>
  );
}
