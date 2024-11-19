import Header from "@/components/header";
import { ReactNode } from "react";

export function Main({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <main className={`${className} flex-1`}>{children}</main>;
}

export default function Skeleton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <>
      <Header />
      <Main className={`flex justify-center items-center ${className}`}>
        {children}
      </Main>
    </>
  );
}
