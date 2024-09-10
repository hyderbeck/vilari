"use client";

import Bag, { getBag, useItems } from "./bag";
import { useFormState } from "react-dom";

export default function Form({
  placeOrderAction,
}: {
  placeOrderAction: (
    _prevState: undefined | true,
    formData: FormData
  ) => Promise<undefined | true>;
}) {
  const [state, formAction] = useFormState(placeOrderAction, undefined);
  const items = useItems();

  if (state) {
    localStorage.setItem("bag", "[]");
    window.dispatchEvent(new Event("bag"));
  }

  return state ? (
    <p className="mx-auto">Заказ оформлен</p>
  ) : items.length ? (
    <>
      <Bag
        items={items}
        className="flex flex-col w-full max-w-screen-sm max-h-[50vh]"
        checkout
      />
      <form
        className="flex flex-col gap-y-12 w-full max-w-screen-sm"
        id="form"
        action={formAction}
      >
        <input
          type="text"
          name="name"
          aria-label="name"
          required
          minLength={2}
          placeholder="Имя или название компании"
          className="py-2 bg-inherit outline-none border-b rounded-none"
        />
        <input
          type="tel"
          name="phone"
          aria-label="phone"
          required
          pattern="[0-9]{6,}"
          title="six or more digits"
          placeholder="Телефон для связи"
          className="py-2 bg-inherit outline-none border-b rounded-none"
        />
        <textarea
          name="description"
          aria-label="description"
          maxLength={300}
          placeholder="Пожелания к заказу"
          className="px-4 py-2 bg-inherit outline-none border rounded resize-none"
          rows={5}
        />
        <button
          type="submit"
          onClick={() => {
            const form = document.getElementById("form")!;
            const bag = document.createElement("input");
            bag.setAttribute("name", "bag");
            bag.value = JSON.stringify(getBag());
            bag.style.display = "none";
            form.appendChild(bag);
          }}
          disabled={!items.length}
          className="px-3 py-2 text-center bg-black text-white rounded font-normal"
        >
          Оформить
        </button>
      </form>
    </>
  ) : (
    <p className="mx-auto">Пусто</p>
  );
}
