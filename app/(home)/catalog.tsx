import { getFilters, getItems } from "@/queries";
import Load from "@/components/buttons/load";
import Preview from "@/components/preview";
import { createClient } from "@/supabase/server";
import Sorting from "@/components/catalog/sorting";
import { SearchParams } from "@/interfaces";
import Filters from "@/components/catalog/filters";
import { Create } from "@/components/buttons/cms";
import { departments } from "../constants";

export default async function Catalog({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const supabase = createClient();
  const data = await getItems(supabase, searchParams);

  let category = "";
  let department = "Все категории";

  if (!(searchParams.search || searchParams.category === "all")) {
    if (
      ["tableware", "teaware", "decor"].includes(searchParams.category ?? "")
    ) {
      department = departments.find(
        (d) => d.param === searchParams.category
      )!.name;
    } else if (searchParams.category === "6,7,11") {
      category = "Кружки и чашки";
      department = "Чайные предметы";
    } else {
      const { data } = await supabase
        .from("categories")
        .select("*, department(name)")
        .eq("id", searchParams.category);
      if (data?.length) {
        category = data[0].name;
        department = data[0].department.name;
      }
    }
  }

  return (
    <>
      {category ? (
        <h2 className="mb-3">
          <span>{department} / </span>
          <span className="text-base">{category}</span>
        </h2>
      ) : (
        <h2 className="mb-3">{department}</h2>
      )}
      <section className="flex justify-between items-center">
        {data && <p className="ml-12">Нашлось: {data.count}</p>}
        <Sorting />
      </section>
      <Filters
        filters={await getFilters(supabase)}
        className={{ btn: "-mt-[3.1rem] w-fit" }}
      />
      {(searchParams as SearchParams & { secret: string }).secret ===
        process.env.ADMIN_SECRET && (
        <Create className="w-fit min-w-0 ml-auto -mt-[23px]" />
      )}
      {data?.items.length ? (
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto gap-x-9 xs:gap-x-12 xl:gap-x-18 gap-y-6">
          {data.items.map((item) => (
            <Preview key={item.id} item={item} page="home" />
          ))}
        </section>
      ) : (
        <p className="m-auto">Ничего не найдено</p>
      )}
      {(data?.count || 0) > (Number(searchParams.limit) || 12) && (
        <Load key={searchParams.limit} className="mx-auto mt-12" />
      )}
    </>
  );
}
