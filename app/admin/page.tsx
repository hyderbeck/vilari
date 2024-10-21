import { fetchData } from "@/queries";
import { createClient } from "@/supabase";
import { createClient as createAdmin } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

async function insert(formData: FormData) {
  "use server";

  function formatLwh(l: string, w: string, h: string, isSecond?: boolean) {
    if (isSecond) {
      if (!(l || w || h)) return "}";
      return `,${l || w},${w || l},${h || 0}}`;
    }
    return `{${l || w},${w || l},${h || 0}`;
  }

  const item = {
    name:
      (JSON.parse(formData.get("type") as string).singular || "") +
      (formData.get("collection")
        ? " " + JSON.parse(formData.get("collection") as string).name
        : "") +
      (formData.get("object_name") ? " " + formData.get("object_name") : "") +
      " " +
      JSON.parse(formData.get("brand") as string).name,
    brand: JSON.parse(formData.get("brand") as string).id,
    collection: formData.get("collection")
      ? JSON.parse(formData.get("collection") as string).id
      : null,
    designer: formData.get("designer")
      ? JSON.parse(formData.get("designer") as string).id
      : null,
    material: JSON.parse(formData.get("material") as string).id,
    type: JSON.parse(formData.get("type") as string).id,
    colors: formData.getAll("colors").length ? formData.getAll("colors") : null,
    lwh:
      formatLwh(
        formData.get("l") as string,
        formData.get("w") as string,
        formData.get("h") as string
      ) +
      formatLwh(
        formData.get("l2") as string,
        formData.get("w2") as string,
        formData.get("h2") as string,
        true
      ),
    volume: formData.get("volume") || null,
    weight: formData.get("weight") || null,
    moysklad_id: (await fetchData(`product/${formData.get("moysklad_id")}`)).id,
    price: formData.get("price"),
    object_name: formData.get("object_name") || null,
  };

  const supabase = createAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  const { data, error } = await supabase.from("object").insert(item).select();

  if (error) {
    console.log(error);
    return;
  }

  const { error: imageError } = await supabase.storage
    .from("objects")
    .upload(`${data[0].id}/1.jpeg`, formData.get("image") as File);

  if (imageError) {
    console.log(data[0].id);
  }
}

async function Select({ name }: { name: string }) {
  const {
    data,
  }: {
    data:
      | {
          id: number;
          name: string;
        }[]
      | null;
  } = await createClient().from(name).select();
  return (
    <select name={name}>
      <option value={""} key={0}>
        {name}
      </option>
      {data?.map(({ id, name }) => (
        <option value={JSON.stringify({ id, name })} key={id}>
          {name}
        </option>
      ))}
    </select>
  );
}

async function Colors() {
  const {
    data,
  }: {
    data:
      | {
          id: number;
          name: string;
        }[]
      | null;
  } = await createClient().from("color").select();
  return (
    <section className="flex flex-col border rounded">
      {data?.map(({ id, name }) => (
        <label key={id}>
          <input type="checkbox" name="colors" value={id} />
          {name}
        </label>
      ))}
    </section>
  );
}

export default async function Admin({
  searchParams,
}: {
  searchParams: { secret?: string };
}) {
  if (searchParams.secret !== process.env.ADMIN_SECRET) redirect("/");
  return (
    <main>
      <form className="flex flex-col w-fit p-6 gap-y-1" action={insert}>
        <input type="text" name="object_name" placeholder="object_name" />
        <Select name="type" />
        <Select name="brand" />
        <Select name="collection" />
        <Select name="designer" />
        <Select name="material" />
        <Colors />
        <input type="text" name="l" placeholder="l" />
        <input type="text" name="w" placeholder="w" />
        <input type="text" name="h" placeholder="h" />
        <input type="text" name="l2" placeholder="l" />
        <input type="text" name="w2" placeholder="w" />
        <input type="text" name="h2" placeholder="h" />
        <input type="text" name="volume" placeholder="volume" />
        <input type="text" name="weight" placeholder="weight" />
        <input type="text" name="price" placeholder="price" />
        <input type="text" name="moysklad_id" placeholder="moysklad_id" />
        <input type="file" id="image" name="image" accept="image/jpeg" />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
