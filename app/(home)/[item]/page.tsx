import { Suspense } from "react";
import Item from "./item";
import { Spinner } from "@/components/icons";
import { Main } from "@/components/skeleton";

export default async function Page({ params }: { params: { item: number } }) {
  return (
    <Main>
      <Suspense
        fallback={
          <>
            <Spinner className="m-auto" />
          </>
        }
      >
        <Item params={params} />
      </Suspense>
    </Main>
  );
}
