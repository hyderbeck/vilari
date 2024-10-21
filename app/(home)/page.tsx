import Catalog from "./catalog";
import { Spinner } from "@/components/icons";
import { Suspense } from "react";
import Home from "./home";
import { SearchParams } from "@/interfaces";
import { Main } from "@/components/skeleton";

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  if (!(searchParams.type || searchParams.search))
    return (
      <Main className="flex flex-col justify-center items-center">
        <Home />
      </Main>
    );

  const key =
    (searchParams.search || "") +
    searchParams.order +
    searchParams.brands +
    searchParams.collections +
    searchParams.designers +
    searchParams.materials +
    searchParams.type;

  return (
    <Main className="flex flex-col gap-y-12 px-6 min-h-24">
      <Suspense
        key={key}
        fallback={
          <>
            <Spinner className="m-auto" />
          </>
        }
      >
        <Catalog searchParams={searchParams} />
      </Suspense>
    </Main>
  );
}
