import { Item } from "@/interfaces";
import { getQuantity, getPrice } from "@/queries";
import { createClient } from "@supabase/supabase-js";
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
    await supabase.from("items").update({ price }).eq("id", item.id);
  }
}

export default async function Update({
  searchParams,
}: {
  searchParams: { secret?: string };
}) {
  if (searchParams.secret !== process.env.ADMIN_SECRET) redirect("/");
  const supabase = createAdmin();
  // await updateQuantities(supabase);
  // await updateFilters(supabase);
  // await updatePrices(supabase);
}
