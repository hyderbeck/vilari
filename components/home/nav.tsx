import { departments } from "@/utils";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <ul className="flex flex-col sm:flex-row sm:justify-around w-full max-w-screen-lg -mt-6">
      {[1, 2, 3].map((num) => {
        const d = departments.find((d) => d.id === num)!;
        return (
          <li key={num} className="flex items-center sm:flex-col text-center">
            <Image
              src={`/nav/${num}.jpeg`}
              alt={d.name}
              width="300"
              height="300"
            />
            <Link
              href={`category=${d.param}`}
              className="text-base underline underline-offset-4 w-full"
            >
              {d.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
