import { Suspense } from "react";
import Item from "./item";
import { Spinner } from "@/components/icons";
import { Main } from "@/components/skeleton";
import { SearchParams } from "@/interfaces";
import { Edit } from "@/components/buttons/cms";

export default async function Page({
  params,
  searchParams,
}: {
  params: { item: number };
  searchParams: SearchParams;
}) {
  return (
    <Main className="flex justify-center items-center">
      {searchParams.secret === process.env.ADMIN_SECRET && (
        <Edit id={params.item} />
      )}
      <Suspense
        fallback={
          <>
            <Spinner />
          </>
        }
      >
        <Item params={params} />
      </Suspense>
    </Main>
  );
}
