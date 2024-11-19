import { fetchData } from "@/queries";
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

  await updateQuantities(createAdmin(), items);

  return new Response(null, { status: 200 });
}
