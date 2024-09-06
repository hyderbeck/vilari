import { ItemPage, ItemPosition, ItemPreview, ItemTypes } from "./interfaces";

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

export async function getItems(
  limit: number,
  params?: { search?: string; filter?: string }
) {
  let endpoint = `product?limit=${limit}`;
  if (params?.search) endpoint += `&search=${params?.search}`;
  if (params?.filter) endpoint += `&filter=${params?.filter}`;
  const data = await fetchData(endpoint);
  return {
    items: data.rows.map(
      (item: {
        id: string;
        name: string;
        code: string;
        externalCode: string;
        salePrices: [{ value: number }];
      }) => {
        return {
          id: item.id,
          name: item.name,
          code: `${item.externalCode}, ${item.code}`,
          price: item.salePrices[0].value,
        };
      }
    ) as ItemPreview[],
    nextHref: !!data.meta.nextHref,
  };
}

export async function getItem(id: string) {
  const item = await fetchData(`product/${id}`);
  if ("errors" in item) return;
  return {
    id,
    name: item.name,
    code: `${item.externalCode}, ${item.code}`,
    itemType: item.pathName,
    price: item.salePrices[0].value,
  } as ItemPage;
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
  bag: ItemPosition[],
  description: string
) {
  return await fetchData("customerorder", {
    organization: {
      meta: {
        href: `https://api.moysklad.ru/api/remap/1.2/entity/organization/${process.env.ACCOUNT_ID}`,
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
