import { Suspense } from "react";
import Item from "./item";
import { Spinner } from "@/components/icons";
import { Main } from "@/components/skeleton";

export default async function Page({ params }: { params: { item: number } }) {
  return (
    <Main className="flex justify-center items-center">
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
