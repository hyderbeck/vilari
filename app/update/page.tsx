import { Item } from "@/interfaces";
import { getQuantity, getPrice } from "@/queries";
import { createClient } from "@supabase/supabase-js";
import { writeFile } from "fs";
import { redirect } from "next/navigation";

export const fetchCache = "force-no-store";

function createAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

async function updateQuantities(supabase: ReturnType<typeof createAdmin>) {
  const { data } = await supabase.from("items").select();

  for (const item of data! as Item[]) {
    const quantity = await getQuantity(item.wms_id);
    if (!quantity && quantity !== 0) {
      console.log(item.wms_id);
      continue;
    }
    await supabase
      .from("items")
      .update({ quantity, in_stock: !!quantity })
      .eq("id", item.id);
  }
}

async function updateFilters(supabase: ReturnType<typeof createAdmin>) {
  async function updateFilter(filter: "brands" | "collections" | "materials") {
    const ids = (await supabase.from(filter).select("id")).data!;

    for (const { id } of ids) {
      const data = (
        await supabase
          .from("items")
          .select("category")
          .eq(filter.slice(0, filter.length - 1), id)
      ).data!;

      const categories: number[] = [];
      for (const { category } of data) {
        if (!categories.includes(category)) {
          categories.push(category);
        }
      }

      await supabase.from(filter).update({ categories }).eq("id", id);
    }
  }
  await updateFilter("brands");
  await updateFilter("collections");
  await updateFilter("materials");
}

async function updatePrices(supabase: ReturnType<typeof createAdmin>) {
  const { data } = await supabase.from("items").select();

  for (const item of data! as Item[]) {
    const price = await getPrice(item.wms_id);
    if (!price) {
      console.log(item.wms_id);
      continue;
    }
    await supabase.from("items").update({ price }).eq("id", item.id);
  }
}

async function formatYaml(
  supabase: ReturnType<typeof createAdmin>,
  wmsIds: string[]
) {
  const { data } = await supabase
    .from("items")
    .select(`*, brand (*), collection (*), category (*)`)
    .in("wms_id", wmsIds);
  const yamls: string[] = [];
  for (const item of data!) {
    yamls.push(`<offer id="${item.id}">
    <name>${
      (item.single || item.category?.single) +
      (item.name ? " " + item.name.toUpperCase() : "")
    }</name>
    <vendor>${item.brand.name}</vendor>
    <price>${item.price}</price>
    <currencyId>RUR</currencyId>
    <categoryId>1</categoryId>
    <picture>${
      process.env.NEXT_PUBLIC_SUPABASE_URL
    }/storage/v1/object/public/objects/${item.id}/1.jpeg</picture>
    <description>${
      item.collection?.description?.replaceAll(" - ", " — ") ||
      item.brand.description?.replaceAll(" - ", " — ")
    }</description>
    <shortDescription></shortDescription>
    <url>https://vilari.vercel.app/${item.id}/</url>
</offer>`);
  }
  writeFile(
    "./offers.xml",
    `<?xml version="1.0" encoding="UTF-8"?><yml_catalog><shop><categories><category id="1">Посуда и декор</category></categories><offers>` +
      JSON.stringify(yamls)
        .replaceAll(`[`, "")
        .replaceAll(`]`, "")
        .replaceAll(`\\`, "")
        .replaceAll(`"<`, "<")
        .replaceAll(`>",`, ">")
        .replace(`r>"`, "r>")
        .replaceAll("n    ", "")
        .replaceAll(">n<", "><") +
      "</offers></shop></yml_catalog>",
    () => {}
  );
}

export default async function Update({
  searchParams,
}: {
  searchParams: { secret?: string };
}) {
  if (searchParams.secret !== process.env.ADMIN_SECRET) redirect("/");
  const supabase = createAdmin();
  await updateQuantities(supabase);
  // await updateFilters(supabase);
  await updatePrices(supabase);
  // await formatYaml(supabase, data);
}
