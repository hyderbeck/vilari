import { Main } from "@/components/skeleton";
import Checkout from "./checkout";
import { Item } from "@/interfaces";
import { createOrder, getCustomer } from "@/queries";

async function placeOrder(_prevState: undefined | true, formData: FormData) {
  "use server";

  const customer = {
    name: ((formData.get("name") as string) || "").trim(),
    phone: ((formData.get("phone") as string) || "").trim(),
    bag: JSON.parse(formData.get("bag") as string) as Item[],
    description: ((formData.get("description") as string) || "").trim(),
  };

  if (!customer.name || customer.name.length < 2 || customer.name.length > 20)
    return;
  if (
    !customer.phone ||
    customer.phone.length < 6 ||
    customer.phone.length > 20 ||
    !/^(\+\d+)|(\d+)$/.test(customer.phone)
  )
    return;
  if (!customer.bag.length) return;
  if (customer.description?.length > 300) return;

  const customerId = await getCustomer(customer.name, customer.phone);
  await createOrder(
    customerId,
    customer.bag.map((item) => {
      return {
        id: item.moysklad_id,
        quantity: item.quantity,
        price: item.price * 100,
      };
    }),
    customer.description
  );
  return true;
}

export default async function Page({
  searchParams,
}: {
  searchParams: { bag?: "pre" };
}) {
  return (
    <Main className="flex flex-col md:flex-row gap-y-12 justify-center items-center md:items-start">
      <Checkout placeOrderAction={placeOrder} bag={searchParams.bag} />
    </Main>
  );
}
