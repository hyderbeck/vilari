import Back from "@/components/buttons/back";
import { Skeleton } from "@/components/skeleton";
import { title } from "@/app/constants";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title + "Страница не найдена",
  };
}

export default function NotFound() {
  return (
    <Skeleton className="relative mt-32 flex-1">
      <Back className="w-fit absolute top-0 left-[1.5rem]" />
      <p className="text-base">404</p>
    </Skeleton>
  );
}
