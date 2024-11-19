import { Items, Logos } from "@/components/home/carousels";
// import Nav from "@/components/home/nav";
import { getTaggedItems } from "@/queries";
import { createClient } from "@/supabase";
// import Link from "next/link";

export default async function Home() {
  const items = await getTaggedItems(createClient(), "pick");
  return (
    <>
      {items && (
        <>
          <section className="flex justify-between w-full -mb-9 px-6 mt-28"></section>
          <Items items={items} />
        </>
      )}
      <Logos />
    </>
  );
}

/*

            <h2> </h2>
            <Link
              href={`/?category=all`}
              className="underline underline-offset-4"
            >
              Смотреть всё
            </Link>

      <div className="bg-vlr-white bg-vlr-ptrn bg-top w-full h-[175px]"></div>
      <div className="bg-vlr-white bg-vlr-ptrn bg-center w-full h-[50px] -mt-9"></div>
      <div className="bg-vlr-white bg-vlr-ptrn bg-bottom w-full h-[10px] -mt-9"></div>

*/
