import Header from "@/components/header";
import { ReactNode } from "react";

export function Main({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <main className={className}>{children}</main>;
}

export function Skeleton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <>
      <Header className="fixed top-0 right-0 left-0 z-10" />
      <Main className={`flex justify-center items-center ${className}`}>
        {children}
      </Main>
    </>
  );
}
