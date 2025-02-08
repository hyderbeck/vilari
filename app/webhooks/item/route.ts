import { fetchData, getImageHref, getQuantity } from "@/queries";
import { createAdmin } from "../supabase";

async function getFieldValue(
  supabase: ReturnType<typeof createAdmin>,
  fields: { name: string; value: string }[],
  fieldName: string
) {
  const value = fields.find((f) => f.name === fieldName)?.value;
  if (!value) return;

  const { data } = await supabase
    .from(fieldName === "category" ? "categories" : `${fieldName}s`)
    .select()
    .eq("name", value);

  if (data?.length) return data[0].id as string;
}

async function upsertItem(
  supabase: ReturnType<typeof createAdmin>,
  data: any,
  action: string
) {
  const fields: { name: string; value: string }[] = data.attributes || [];

  const wms_id = data.id;
  const quantity = await getQuantity(wms_id);

  const count = (await supabase.from("items").select("*", { count: "exact", head: true }).eq("wms_id", wms_id)).count

  const item = {
    brand: await getFieldValue(supabase, fields, "brand") || (count ? undefined : 1),
    collection: await getFieldValue(supabase, fields, "collection"),
    designer: await getFieldValue(supabase, fields, "designer"),
    material: await getFieldValue(supabase, fields, "material") || (count ? undefined : 1),
    category: await getFieldValue(supabase, fields, "category") || (count ? undefined : 1),
    lwh: fields.find((f) => f.name === "lwh")?.value,
    name: fields.find((f) => f.name === "name")?.value,
    volume: fields.find((f) => f.name === "volume")?.value,
    single: fields.find((f) => f.name === "single")?.value,
    wms_id,
    price: data.salePrices[0].value / 100,
    quantity,
    in_stock: !!quantity,
  };

  let id = ""

  if (action === "CREATE" || !count) {
    const { data } = await supabase.from("items").insert(item).select()
    id = data ? data[0].id : ""
  } else {
    const { data } = await supabase.from("items").update(item).eq("wms_id", wms_id).select();
    id = data ? data[0].id : ""
  }

  const images = (await fetchData(`product/${wms_id}/images`)).rows
  const downloadHref = images.length ? images[0].meta.downloadHref : undefined
  if (downloadHref) {
    const image = await getImageHref(downloadHref)
    await supabase.storage.from("objects").upload(`${id}/1.jpeg`, image, { upsert: true })
  }
}

export async function POST(request: Request) {
  const data = await request.json();

  for (const event of data.events) {
    const url = event.meta.href as string;
    const id = url.slice(url.lastIndexOf("/") + 1);
    try {
      await upsertItem(
        createAdmin(),
        await fetchData(`product/${id}`),
        event.action
      );
    }
    catch (e) {
      console.error(id)
      console.error(e)
    }
  }

  return new Response(null, { status: 200 });
}
