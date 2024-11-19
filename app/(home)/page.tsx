import Catalog from "./catalog";
import { Spinner } from "@/components/icons";
import { Suspense } from "react";
import Home from "./home";
import { SearchParams } from "@/interfaces";
import { Main } from "@/components/skeleton";
import { createClient } from "@/supabase";
import { Metadata } from "next";
import { departments, title } from "@/app/constants";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata | undefined> {
  if (!(searchParams.category || searchParams.search)) return;

  if (searchParams.search || searchParams.category === "all")
    return {
      title: title + "Все категории",
    };

  if (["tableware", "teaware", "decor"].includes(searchParams.category ?? ""))
    return {
      title:
        title +
        departments.find((d) => searchParams.category === d.param)!.name,
    };

  if (searchParams.category === "6,7,11") {
    return {
      title: title + "Кружки и чашки",
    };
  }

  const { data } = await createClient()
    .from("categories")
    .select("*, department(name)")
    .eq("id", searchParams.category);

  if (!data || !data.length)
    return {
      title: title + "Все категории",
    };

  return {
    title: title + data[0].name,
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  if (!(searchParams.category || searchParams.search))
    return (
      <Main className="flex-1 flex flex-col justify-center items-center gap-y-12">
        <Home />
      </Main>
    );

  const key =
    (searchParams.search ?? "") +
    searchParams.order +
    searchParams.brands +
    searchParams.collections +
    searchParams.designers +
    searchParams.materials +
    searchParams.category;

  return (
    <Main className="flex-1 flex flex-col gap-y-6 px-6 min-h-24 mt-28">
      <Suspense
        key={key}
        fallback={
          <div className="m-auto pt-4">
            <Spinner />
          </div>
        }
      >
        <Catalog searchParams={searchParams} />
      </Suspense>
    </Main>
  );
}
