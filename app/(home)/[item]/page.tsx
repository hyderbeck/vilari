/* eslint-disable @next/next/no-img-element */
import { getItem } from "@/queries";
import { notFound } from "next/navigation";
import Item from "./item";

export default async function Page({ params }: { params: { item: string } }) {
  const item = await getItem(params.item);
  if (!item) return notFound();
  return (
    <main className="px-6 pt-32 flex justify-center">
      <Item item={item} page="item" />
    </main>
  );
}
