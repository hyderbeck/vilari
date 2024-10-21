import {
  ItemGroup,
  Item,
  SearchParams,
  Filters,
  ItemVariant,
} from "./interfaces";
import { createClient } from "./supabase";

export async function getItem(
  supabase: ReturnType<typeof createClient>,
  id: number
) {
  const { data }: { data: Item[] | null } = await supabase
    .from("object")
    .select(
      `*, brand (*), collection (*), designer (*), material (*), type (*)`
    )
    .eq("id", id);

  if (data?.length) {
    let item = data[0];

    if (item.colors) {
      const colors = (
        await supabase.from("color").select().in("id", item.colors)
      ).data!;
      for (let i = 0; i < item.colors.length; i++) {
        item.colors[i] = colors.find((color) => color.id === item.colors[i]);
      }
    }

    item.quantity = await getQuantity(item.moysklad_id);

    if (item.variants) {
      const computedVariant: ItemVariant = {
        material: item.material,
        moysklad_id: item.moysklad_id,
        price: item.price,
        colors: item.colors,
        object_name: item.object_name,
      };
      item.variants = [computedVariant, ...(item.variants || [])];
      for (const variant of item.variants.slice(1)) {
        if (variant.colors) {
          const colors = (
            await supabase.from("color").select().in("id", variant.colors)
          ).data!;
          for (let i = 0; i < item.colors.length; i++) {
            variant.colors[i] = colors.find(
              (color) => color.id === variant.colors![i]
            );
          }
        }

        if (variant.material) {
          variant.material = (
            await supabase.from("material").select().eq("id", variant.material)
          ).data![0];
        }
      }
    }

    return item;
  }
}

export async function getItems(
  supabase: ReturnType<typeof createClient>,
  searchParams: SearchParams
) {
  let query = supabase
    .from("object")
    .select(`*, brand (*), collection (*), type (*)`, { count: "exact" })
    .order(searchParams.order ? "price" : "name", {
      ascending: searchParams.order === "desc" ? false : true,
    });
  if (searchParams.search)
    query = query.ilike("name", `%${searchParams.search}%`);
  if (searchParams.type && searchParams.type !== "all")
    query = query.eq("type", searchParams.type);

  if (searchParams.brands)
    query = query.in("brand", searchParams.brands.split(","));
  if (searchParams.collections) {
    query = query.or(
      `collection.in.(${searchParams.collections}), collab->val->>id.in.(${searchParams.collections})`
    );
    //in("collection", searchParams.collections.split(","));
    //query = query.in("collab->val->>id", searchParams.collections.split(","));
  }
  if (searchParams.materials)
    query = query.in("material", searchParams.materials.split(","));
  if (searchParams.designers)
    query = query.in("designer", searchParams.designers.split(","));

  let { data, count }: { data: Item[] | null; count: number | null } =
    await query.limit(Number(searchParams.limit) || 12);

  if (data?.length) {
    //for (const item of data) {
    //  item.quantity = await getQuantity(item.moysklad_id);
    //}
    return { items: data, count };
  }
}

export async function getItemGroups(supabase: ReturnType<typeof createClient>) {
  const { data } = await supabase.from("type").select();
  return data as ItemGroup[];
}

export async function getFilters(supabase: ReturnType<typeof createClient>) {
  return {
    brands: (await supabase.from("brand").select()).data,
    collections: (await supabase.from("collection").select()).data,
    materials: (await supabase.from("material").select()).data,
  } as Filters;
}

export async function fetchData(endpoint: string, body?: Object) {
  const auth =
    "Basic " + Buffer.from(process.env.MOYSKLAD_CREDS!).toString("base64");
  return await (
    await fetch(`https://api.moysklad.ru/api/remap/1.2/entity/${endpoint}`, {
      method: body ? "POST" : "GET",
      headers: body
        ? {
            Authorization: auth,
            "Accept-Encoding": "gzip",
            "Content-Type": "application/json",
          }
        : { Authorization: auth },
      body: JSON.stringify(body),
    })
  ).json();
}

async function getQuantity(id: string) {
  return (await fetchData(`assortment?filter=id=${id}`)).rows[0].quantity;
}

export async function getCustomer(name: string, phone: string) {
  let customer = (
    await fetchData(`counterparty?filter=phone~${phone.slice(2)}`)
  ).rows;
  if (customer.length) return customer[0].id as string;

  return (
    await fetchData("counterparty", { name, phone, companyType: "individual" })
  ).id as string;
}

export async function createOrder(
  customerId: string,
  bag: { id: string; quantity: number; price: number }[],
  description?: string
) {
  return await fetchData("customerorder", {
    organization: {
      meta: {
        href: `https://api.moysklad.ru/api/remap/1.2/entity/organization/${process.env.MOYSKLAD_ID}`,
        type: "organization",
      },
    },
    agent: {
      meta: {
        href: `https://api.moysklad.ru/api/remap/1.2/entity/counterparty/${customerId}`,
        type: "counterparty",
      },
    },
    positions: bag.map(({ id, quantity, price }) => {
      return {
        assortment: {
          meta: {
            href: `https://api.moysklad.ru/api/remap/1.2/entity/product/${id}`,
            type: "product",
          },
        },
        quantity,
        price,
      };
    }),
    description,
  });
}

export async function preorder(
  supabase: ReturnType<typeof createClient>,
  customer: string,
  object: string,
  description: string | null
) {
  return await supabase
    .from("preorder")
    .insert({ customer, object, description });
}
