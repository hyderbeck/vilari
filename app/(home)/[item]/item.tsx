import Preview from "@/components/preview";
import { getItem } from "@/queries";
import { createClient } from "@/supabase";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function Item({
  params,
  isAdmin,
}: {
  params: { item: number };
  isAdmin?: boolean;
}) {
  const item = await getItem(createClient(), params.item);
  if (!item) return notFound();

  return (
    <Preview
      item={item}
      page="item"
      isAdmin={isAdmin}
      referer={!!headers().get("referer")}
    />
  );
}
