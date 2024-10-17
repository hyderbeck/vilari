import Image from "next/image";

const itemGroups = ["Столовая посуда", "Чайная посуда", "Декор"];
const brands = ["seletti"];

export default function Home() {
  return (
    <>
      <section className="flex w-full h-[250px] border -mt-12 mb-12">
        Banner
      </section>
      <section className="flex w-full flex-col gap-y-12">
        {itemGroups.map((group) => (
          <div key={group} className="border h-[250px]">
            {group}
          </div>
        ))}
      </section>
      <section className="flex w-full px-6 -mb-12">
        {brands.map((brand) => (
          <div key={brand} className="relative w-32 aspect-square">
            <Image
              alt={brand}
              src={`/logos/${brand}.jpg`}
              fill={true}
              sizes={"8rem"}
              className="object-contain"
            />
          </div>
        ))}
      </section>
    </>
  );
}
