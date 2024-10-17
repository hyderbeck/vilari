import Header from "@/components/header";
import { ReactNode } from "react";

export function Main({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <main className={`${className} mt-[8.5rem] flex-1`}>{children}</main>;
}

export default function Skeleton({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Main className="flex justify-center items-center">{children}</Main>
    </>
  );
}
