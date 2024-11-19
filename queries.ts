import { Category, Item, SearchParams, Filters } from "./interfaces";
import { createClient } from "./supabase";

export async function getItem(
  supabase: ReturnType<typeof createClient>,
  id: number
) {
  const { data }: { data: Item[] | null } = await supabase
    .from("items")
    .select(
      `*, brand (*), collection (*), designer (*), material (*), category (*)`
    )
    .eq("id", id);

  if (data?.length) {
    let item = data[0];

    if (item.colors) {
      const colors = (
        await supabase.from("colors").select().in("id", item.colors)
      ).data!;
      for (let i = 0; i < item.colors.length; i++) {
        item.colors[i] = colors.find((color) => color.id === item.colors[i]);
      }
    }

    item.quantity = await getQuantity(item.wms_id);

    return item;
  }
}

export async function getTaggedItems(
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

export async function getItems(
  supabase: ReturnType<typeof createClient>,
  searchParams: SearchParams
) {
  let query = supabase
    .from("items")
    .select(`*, brand(*), collection(*), category!inner(*)`, {
      count: "exact",
    })
    .order("in_stock", { ascending: false })
    .order(searchParams.order ? "price" : "full_name", {
      ascending: searchParams.order === "desc" ? false : true,
    });
  if (searchParams.search) {
    /*
    const search = searchParams.search
      .split(" ")
      .map((word) => "'" + word + "'")
      .join(" & ");
    query = query.textSearch("full_name", `${search}`);
    */
    query = query.ilike("full_name", `%${searchParams.search}%`);
  }
  if (searchParams.category && searchParams.category !== "all") {
    switch (searchParams.category) {
      case "tableware":
        query = query.eq("category.department", 1);
        break;
      case "teaware":
        query = query.eq("category.department", 2);
        break;
      case "decor":
        query = query.eq("category.department", 3);
        break;
      default:
        const categories = searchParams.category.split(",");
        query =
          categories.length > 1
            ? query.in("category", categories)
            : query.eq("category", searchParams.category);
    }
  }
  if (searchParams.brands) {
    query = query.in("brand", searchParams.brands.split(","));
  }
  if (searchParams.collections) {
    query = query.in("collection", searchParams.collections.split(","));
  }
  if (searchParams.materials)
    query = query.in("material", searchParams.materials.split(","));
  if (searchParams.designers)
    query = query.in("designer", searchParams.designers.split(","));

  let { data, count }: { data: Item[] | null; count: number | null } =
    await query.limit(Number(searchParams.limit) || 12);

  if (data?.length) {
    return { items: data, count };
  }
}

export async function getCategories(supabase: ReturnType<typeof createClient>) {
  const { data } = await supabase.from("categories").select();
  return data as Category[];
}

export async function getFilters(supabase: ReturnType<typeof createClient>) {
  return {
    brands: (await supabase.from("brands").select()).data,
    collections: (await supabase.from("collections").select()).data,
    materials: (await supabase.from("materials").select()).data,
  } as Filters;
}

export async function fetchData(endpoint: string, body?: {}) {
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

export async function getQuantity(id: string) {
  if (!id) return 0;
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
  const orders = (await fetchData("customerorder?order=created")).rows;
  const lastOrder = orders[orders.length - 1].name as string;
  const name =
    String(Number(lastOrder.slice(0, lastOrder.length - 1)) + 1) + "C";
  return await fetchData("customerorder", {
    name,
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

export async function createPreorder(
  customerId: string,
  bag: { id: string; quantity: number; price: number }[],
  description?: string
) {
  const orders = (await fetchData("customerorder?order=created")).rows;
  const lastOrder = orders[orders.length - 1].name as string;
  const name =
    String(Number(lastOrder.slice(0, lastOrder.length - 1)) + 1) + "C";

  return await fetchData("customerorder", {
    name,
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
