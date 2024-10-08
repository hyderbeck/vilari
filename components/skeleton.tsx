import Header from "@/components/header";
import { ReactNode } from "react";

export default function Skeleton({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-32 flex-1 flex justify-center items-center">
        {children}
      </main>
    </>
  );
}
