import { ItemPosition } from "@/interfaces";
import { fetchData } from "@/queries";

async function getCustomer(name: string, phone: string) {
  let customer = (
    await fetchData(`counterparty?filter=phone~${phone.slice(2)}`)
  ).rows;
  if (customer.length) return customer[0].id as string;

  return (
    await fetchData("counterparty", { name, phone, companyType: "individual" })
  ).id as string;
}

async function createOrder(customerId: string, bag: ItemPosition[]) {
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
  });
}

export async function placeOrder(
  customer: { name: string; phone: string },
  bag: { id: string; quantity: number; price: number }[]
) {
  const customerId = await getCustomer(customer.name, customer.phone);
  await createOrder(customerId, bag);
}
