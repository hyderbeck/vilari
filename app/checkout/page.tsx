import Form from "@/components/form";
import { ItemPreview } from "@/interfaces";
import { createOrder, getCustomer } from "@/queries";

export async function placeOrder(
  _prevState: undefined | true,
  formData: FormData
) {
  "use server";

  const customer = {
    name: ((formData.get("name") as string) || "").trim(),
    phone: ((formData.get("phone") as string) || "").trim(),
    bag: JSON.parse(formData.get("bag") as string) as ItemPreview[],
    description: ((formData.get("description") as string) || "").trim(),
  };

  if (!customer.name || customer.name.length < 2 || customer.name.length > 20)
    return;
  if (
    !customer.phone ||
    customer.phone.length < 6 ||
    customer.phone.length > 20 ||
    !/^\d+$/.test(customer.phone)
  )
    return;
  if (!customer.bag.length) return;
  if (customer.description?.length > 300) return;

  const customerId = await getCustomer(customer.name, customer.phone);
  await createOrder(
    customerId,
    customer.bag.map((item) => {
      return {
        id: item.id,
        quantity: 1,
        price: item.price,
      };
    }),
    customer.description
  );
  return true;
}

export default function Checkout() {
  return (
    <main>
      <h2></h2>
      <Form placeOrderAction={placeOrder} />
    </main>
  );
}
