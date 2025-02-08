import { fetchData } from "@/queries";
import { createAdmin } from "../supabase";

async function updateQuantities(
  supabase: ReturnType<typeof createAdmin>,
  items: { assortmentId: string; stock: number }[]
) {
  for (const item of items) {
    await supabase
      .from("items")
      .update({ quantity: item.stock, in_stock: !!item.stock })
      .eq("wms_id", item.assortmentId);
  }
}

export async function POST(request: Request) {
  const { reportUrl }: { reportUrl: string } = await request.json();

  const items = (await fetchData(
    `report/stock/all/current${reportUrl.slice(reportUrl.indexOf("?"))}`,
    undefined,
    false
  )) as { assortmentId: string; stock: number }[];

  try {
    await updateQuantities(createAdmin(), items);
  } catch (e) {
    console.error(items)
    console.error(e)
  }

  return new Response(null, { status: 200 });
}
