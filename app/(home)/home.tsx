import { Items, Logos } from "@/components/home/carousels";
import { createClient } from "@/supabase/server";

async function getTaggedItems(
  supabase: ReturnType<typeof createClient>,
  tag: string
) {
  const { data } = await supabase
    .from("items")
    .select(`*, brand (*), collection (*), category (*)`)
    .eq("tag", tag);
  if (data?.length) {
    return data;
  }
}

export default async function Home() {
  const items = await getTaggedItems(createClient(), "pick");

  return (
    <>
      {items && (
        <>
          <section className="flex justify-between w-full -mb-9 px-6 mt-28"></section>
          <Items items={items} className="w-full mb-6" />
        </>
      )}
      <Logos className="w-full -mb-6" />
    </>
  );
}

// <div className="bg-vlr-white bg-vlr-ptrn bg-top w-full h-[175px]"></div>
