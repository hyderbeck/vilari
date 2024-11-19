import { Suspense } from "react";
import Item from "./item";
import { Spinner } from "@/components/icons";
import { Main } from "@/components/skeleton";
import { SearchParams } from "@/interfaces";
import { getItem } from "@/queries";
import { createClient } from "@/supabase";
import { formatName } from "@/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { item: number };
}): Promise<Metadata> {
  const item = await getItem(createClient(), params.item);
  if (!item) return notFound();
  return {
    title: "Vilari | " + formatName(item),
    openGraph: {
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/objects/${item.id}/1.jpeg`,
        },
      ],
    },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { item: number };
  searchParams: SearchParams;
}) {
  return (
    <Main className="flex justify-center items-center mt-32 relative">
      <Suspense
        fallback={
          <>
            <Spinner />
          </>
        }
      >
        <Item
          params={params}
          isAdmin={searchParams.secret === process.env.ADMIN_SECRET}
        />
      </Suspense>
    </Main>
  );
}
