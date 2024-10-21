import Link from "next/link";
import { PlusIcon } from "../icons";

export function Create() {
  return (
    <Link href="cms" className="btn w-fit min-w-0 ml-auto -mt-[23px]">
      <PlusIcon />
    </Link>
  );
}

export function Edit({ id }: { id: number }) {
  return (
    <Link
      href={`cms?id=${id}`}
      className="btn w-fit min-w-0 ml-auto -mt-[23px] absolute top-[9rem] left-[1.5rem]"
    >
      Ред.
    </Link>
  );
}
