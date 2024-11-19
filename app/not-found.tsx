import { Back } from "@/components/buttons/back";
import Skeleton from "@/components/skeleton";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Vilari | " + "Страница не найдена",
  };
}

export default function NotFound() {
  return (
    <Skeleton className="relative mt-32">
      <Back />
      <p className="text-base">404</p>
    </Skeleton>
  );
}
