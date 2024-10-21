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

  return (
    <>
      <section className="-mt-[23px] flex justify-between items-center">
        {data && <p className="ml-12">Нашлось: {data.count}</p>}
        <Sorting />
      </section>
      <Filtering filters={await getFilters(supabase)} />
      {data?.items.length ? (
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto gap-x-9 xs:gap-x-12 xl:gap-x-18 gap-y-6">
          {data.items.map((item) => (
            <Preview key={item.moysklad_id} item={item} page="home" />
          ))}
        </section>
      ) : (
        <p className="m-auto">Ничего не найдено</p>
      )}
      {(data?.count || 0) > (Number(searchParams.limit) || 10) && (
        <Load key={searchParams.limit} />
      )}
    </>
  );
}
