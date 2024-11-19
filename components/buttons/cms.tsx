import Link from "next/link";
import { Plus as PlusIcon } from "../icons";

export function Create({ className }: { className: string }) {
  return (
    <Link replace href="cms" className={`btn ${className}`}>
      <PlusIcon className="size-4" />
    </Link>
  );
}

export function Edit({ id, className }: { id: number; className: string }) {
  return (
    <Link replace href={`cms?id=${id}`} className={`btn ${className}`}>
      Ред.
    </Link>
  );
}
