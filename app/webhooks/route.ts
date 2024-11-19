import { Item } from "@/interfaces";
import { fetchData, getQuantity } from "@/queries";
import { createClient } from "@supabase/supabase-js";

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

async function updateQuantities(
  supabase: ReturnType<typeof createAdmin>,
  wms_ids: string[]
) {
  const { data } = await supabase.from("items").select().in("wms_id", wms_ids);

  for (const item of data! as Item[]) {
    const quantity = await getQuantity(item.wms_id);
    await supabase
      .from("items")
      .update({ quantity, in_stock: !!quantity })
      .eq("id", item.id);
  }
}

export async function POST(request: Request) {
  const { reportUrl }: { reportUrl: string } = await request.json();

  const ids = (
    (await fetchData(
      `report/stock/all/current${reportUrl.slice(reportUrl.indexOf("?"))}`,
      undefined,
      false
    )) as { assortmentId: string }[]
  ).map((item) => item.assortmentId);

  const supabase = createAdmin();

  await updateQuantities(supabase, ids);

  return new Response(null, { status: 200 });
}
