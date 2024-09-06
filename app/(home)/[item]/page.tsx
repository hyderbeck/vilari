import { getItem } from "@/queries";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Item({ params }: { params: { item: string } }) {
  const item = await getItem(params.item);
  if (!item) return notFound();
  const { price, name, code, itemType } = item;

  return (
    <main className="flex">
      <img alt="" />
      <h2 className="text-2xl">{name}</h2>
      <p>{code}</p>
      <p>{price}</p>
      <Link replace href={`/?filter=pathName=${itemType}`}>
        <p>{itemType}</p>
      </Link>
      <button></button>
    </main>
  );
}
