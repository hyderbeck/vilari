import Preview from "@/components/preview";
import { getItem } from "@/queries";
import { createClient } from "@/supabase";
import { notFound } from "next/navigation";

export default async function Item({ params }: { params: { item: number } }) {
  const item = await getItem(createClient(), params.item);
  if (!item) return notFound();
  return <Preview item={item} page="item" />;
}
