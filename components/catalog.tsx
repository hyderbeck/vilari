// import { getItems } from "@/queries";
import Load from "./buttons/load";
import Preview from "./preview";
import { createClient } from "@/supabase";
import { ItemPreview } from "@/interfaces";

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
  /*const { items, nextHref } = await getItems(limit, {
    search: searchParams.search,
    filter: searchParams.filter,
    stock: !searchParams.outOfStock,
  });*/
  const nextHref = true;
  const supabase = createClient();
  const { data: items } = await supabase
    .from("object")
    .select(
      `*, collection (name), brand (name), designer (name), material (name), type (name)`
    );
  return (items as ItemPreview[]).length ? (
    <section className="flex flex-col gap-y-12">
      <section className="flex justify-between">
        <div>Нашлось: 1</div>
        <select>
          <option>По популярности</option>
        </select>
      </section>
      <div className="flex flex-col md:flex-row">
        <button className="-mt-9 mb-12 w-fit md:hidden">Фильтры</button>
        <section className="shrink-0 w-[23rem] 2xl:w-[24rem] hidden md:block">
          <fieldset>
            <legend>Бренд</legend>
            <ul>
              <li>
                <input type="checkbox"></input>
                <label>SELETTI</label>
              </li>
            </ul>
          </fieldset>
        </section>
        <div className="grid xs:grid-cols-2 gap-x-12 gap-y-6">
          {(items as ItemPreview[]).map((item) => (
            <Preview key={item.id} item={item} page="home" />
          ))}
        </div>
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
