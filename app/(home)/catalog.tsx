import { getFilters, getItems } from "@/queries";
import Load from "@/components/buttons/load";
import Preview from "@/components/preview";
import { createClient } from "@/supabase";
import Sorting from "@/components/catalog/sorting";
import { SearchParams } from "@/interfaces";
import Filtering from "@/components/catalog/filtering";

export default async function Catalog({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const supabase = createClient();
  const data = await getItems(supabase, searchParams);

  return data?.items.length ? (
    <>
      <section className="-mt-[23px] flex justify-between items-center">
        <p className="hidden md:block">Нашлось: {data.count}</p>
        <Sorting />
      </section>
      <div className="flex flex-col md:flex-row">
        <Filtering filters={await getFilters(supabase)} />
        <section className="flex justify-center md:-mt-6">
          {data.items.map((item) => (
            <Preview key={item.id} item={item} page="home" />
          ))}
        </section>
      </div>
      {(data.count || 0) > (Number(searchParams.limit) || 10) && (
        <Load searchParams={searchParams} />
      )}
    </>
  ) : (
    <p className="m-auto text-base">Ничего не найдено</p>
  );
}
