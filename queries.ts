import { Item, ItemPreview, ItemTypes } from "./interfaces";

export async function fetchData(endpoint: string, body?: Object) {
  const auth =
    "Basic " + Buffer.from(process.env.CREDENTIALS!).toString("base64");
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

export async function getImageHref(id: string) {
  if (!id) return;
  const images = (await fetchData(`product/${id}/images`)).rows;
  if (!images || !images.length) return;
  return (
    await fetch(images[0].meta.downloadHref, {
      method: "GET",
      headers: {
        Authorization:
          "Basic " + Buffer.from(process.env.CREDENTIALS!).toString("base64"),
      },
      redirect: "manual",
    })
  ).headers.get("location");
}

export async function getItems(
  limit: number,
  params: { search?: string; filter?: string; stock: boolean }
) {
  let endpoint = `assortment?limit=${limit}`;
  if (params.search) endpoint += `&search=${params?.search}`;
  if (params.filter) endpoint += `&filter=${params?.filter}`;
  if (params.stock) endpoint += "&filter=quantityMode=positiveOnly";
  const data = await fetchData(endpoint);
  const items = (
    await Promise.all(
      data.rows.map(
        async (item: {
          meta: {
            href: string;
          };
          id: string;
          name: string;
          salePrices: [{ value: number }];
          quantity: number;
          pathName: string;
          attributes: [
            { name: "Материал"; value: { name: string } },
            { name: "Размер"; value: string },
            { name: "Коллекция" },
            { name: "Бренд"; value: { name: string; meta: { href: string } } },
            { name: "Название товара"; value: string },
            {
              name: "Collection";
              value: { name: string; meta: { href: string } };
            },
            { name: "skip"; value: number }
          ];
        }) => {
          let name = "";
          let material = "Материал";
          let size = "Размер";
          let designer = { href: "", name: "БРЕНД" };
          let collection = { name: "", href: "" };
          item.attributes?.forEach((attr: any) => {
            if (attr.name === "Название товара") {
              name = attr.value;
            } else if (attr.name === "Размер") {
              size = attr.value;
            } else if (attr.name === "Бренд") {
              designer.href = attr.value.meta.href;
              designer.name = attr.value.name;
            } else if (attr.name === "Collection") {
              collection.href = attr.value.meta.href;
              collection.name = attr.value.name;
            } else if (attr.name === "skip") {
              name = "";
              collection = { name: "", href: "" };
              designer = { href: "", name: "" };
            }
          });
          if (item.meta.href.includes("variant")) {
            name = "";
            collection = { name: "", href: "" };
            designer = { href: "", name: "" };
          }
          return {
            id: item.id,
            name,
            material,
            size,
            designer,
            collection,
            price: item.salePrices[0].value,
            stock: item.quantity > 0 ? item.quantity : 0,
            quantity: 0,
            itemType: item.pathName || "",
          };
        }
      ) as ItemPreview[]
    )
  ).filter((item) => item.name || item.collection.name || item.designer.name);
  if (!params.stock)
    items.sort((a, b) =>
      !a.stock && b.stock ? 1 : a.stock && !b.stock ? -1 : 0
    );
  return {
    items,
    nextHref: !!data.meta.nextHref,
  };
}

export async function getItem(id: string) {
  let item = await fetchData(`assortment?filter=id=${id}`);
  if ("errors" in item) return;
  item = item.rows[0];
  let name = "";
  let material = "Материал";
  let size = "Размер";
  let designer = { href: "", name: "БРЕНД" };
  let collection = { name: "", href: "" };
  item.attributes?.forEach((attr: any) => {
    if (attr.name === "Название товара") {
      name = attr.value;
    } else if (attr.name === "Материал") {
      material = attr.value.name;
    } else if (attr.name === "Размер") {
      size = attr.value;
    } else if (attr.name === "Бренд") {
      designer.href = attr.value.meta.href;
      designer.name = attr.value.name;
    } else if (attr.name === "Collection") {
      collection.href = attr.value.meta.href;
      collection.name = attr.value.name;
    } else if (attr.name === "skip") {
      name = "";
      collection = { name: "", href: "" };
      designer = { href: "", name: "" };
    }
  });
  if (item.meta.href.includes("variant")) {
    name = "";
    collection = { name: "", href: "" };
    designer = { href: "", name: "" };
  }
  return {
    id,
    name,
    material,
    size,
    designer,
    collection,
    itemType: item.pathName,
    price: item.salePrices[0].value,
    stock: item.stock,
    quantity: 0,
  } as ItemPreview;
}

export async function getItemTypes() {
  const itemTypes: ItemTypes = {};
  (await fetchData("productfolder")).rows.forEach(
    (itemType: { id: string; pathName: string; name: string }) => {
      const pathName = itemType.pathName;
      if (!pathName) return;
      if (!(pathName in itemTypes)) itemTypes[pathName] = [];
      itemTypes[pathName].push({ id: itemType.id, name: itemType.name });
    }
  );
  return itemTypes;
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
  bag: Item[],
  description: string
) {
  return await fetchData("customerorder", {
    organization: {
      meta: {
        href: `https://api.moysklad.ru/api/remap/1.2/entity/organization/${process.env.ORGANIZATION}`,
        type: "organization",
      },
    },
    agent: {
      meta: {
        href: `https://api.moysklad.ru/api/remap/1.2/entity/counterparty/${customerId}`,
        type: "counterparty",
      },
    },
    positions: bag.map(({ id, price, quantity }) => {
      return {
        assortment: {
          meta: {
            href: `https://api.moysklad.ru/api/remap/1.2/entity/product/${id}`,
            type: "product",
          },
        },
        price,
        quantity,
      };
    }),
    description,
  });
}
