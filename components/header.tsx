import { atteron } from "@/app/fonts";
import Link from "next/link";
import { ReactNode } from "react";

export default async function Header({
  className,
  children,
}: {
  className: string;
  children?: ReactNode;
}) {
  return (
    <header
      className={`flex justify-between items-center bg-white p-6 border-b ${className}`}
    >
      <h1 className={`${atteron.className} text-4xl tracking-widest`}>
        <Link replace scroll={false} href="/">
          vilari
        </Link>
      </h1>
      {children}
    </header>
  );
}
