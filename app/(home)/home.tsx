import Carousel from "@/components/carousel";

export default async function Home() {
  return (
    <>
      <Carousel />
    </>
  );
}

/*
import Image from "next/image";
import Link from "next/link";

function Department({
  department,
  image,
}: {
  department: string;
  image: number;
}) {
  return (
    <div className="flex flex-col items-center">
      <Image alt="" src={`/home/${image}.jpg`} width="500" height="500" />
    </div>
  );
}
  
import Preview from "@/components/preview";
import { getItem } from "@/queries";
import { createClient } from "@/supabase";

const supabase = createClient();
const items = [80];
const item = await getItem(
  supabase,
  items[Math.floor(Math.random() * items.length)]
);

<section className="-mt-12 flex gap-x-12 justify-around items-center w-full pb-12">
  <Preview item={item!} page="home" welcome />
</section>


      <section className="-mt-12 flex flex-col md:flex-row justify-center w-full">
        <Department department="Столовые предметы" image={1} />
      </section>

*/
