"use client";

import Bag, { getBag, useItems } from "./bag";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Submit from "./buttons/submit";

export default function Form({
  placeOrderAction,
}: {
  placeOrderAction: (
    _prevState: undefined | true,
    formData: FormData
  ) => Promise<undefined | true>;
}) {
  const [mount, setMount] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [state, formAction] = useFormState(placeOrderAction, undefined);
  const items = useItems();

  useEffect(() => {
    setMount(true);
    if (state) {
      localStorage.setItem("bag", "[]");
      window.dispatchEvent(new Event("bag"));
      window.scrollTo(0, 0);
    }
  }, [state]);

  return state ? (
    <p className="text-center w-full">Заказ оформлен</p>
  ) : items.length ? (
    <>
      <Bag
        items={items}
        className="flex flex-col w-full max-w-screen-sm max-h-[55vh] xs:max-h-[70vh] -mt-10"
        checkout
      />
      <form
        className="flex flex-col w-full max-w-screen-sm gap-y-9 mb-auto px-6 lg:px-0"
        id="form"
        action={formAction}
      >
        <input
          type="text"
          name="name"
          aria-label="name"
          autoComplete="on"
          required
          minLength={2}
          placeholder="Имя или название компании"
          className="py-2 bg-inherit outline-none border-b rounded-none text-base xs:text-sm"
          autoCorrect="false"
          spellCheck="false"
          onInvalid={(e) => {
            const validity = e.currentTarget.validity;
            if (validity.valueMissing || validity.tooShort) {
              e.currentTarget.setCustomValidity("Заполните это поле");
            } else {
              e.currentTarget.setCustomValidity("");
            }
          }}
        />
        <input
          type="tel"
          name="phone"
          aria-label="phone"
          autoComplete="on"
          required
          pattern="[0-9]{6,}"
          placeholder="Телефон для связи"
          className="py-2 bg-inherit outline-none border-b rounded-none text-base xs:text-sm"
          autoCorrect="false"
          spellCheck="false"
          onInvalid={(e) => {
            const validity = e.currentTarget.validity;
            if (validity.patternMismatch) {
              e.currentTarget.setCustomValidity("Введите номер телефона");
            } else if (validity.valueMissing) {
              e.currentTarget.setCustomValidity("Заполните это поле");
            } else {
              e.currentTarget.setCustomValidity("");
            }
          }}
        />
        <textarea
          name="description"
          aria-label="description"
          maxLength={300}
          placeholder="Пожелания к заказу"
          className="px-4 py-2 bg-inherit outline-none border rounded resize-none text-base xs:text-sm"
          rows={5}
          autoCorrect="false"
          spellCheck="false"
        />
        <Submit
          items={items}
          onClick={() => {
            setClicked(clicked);
            const form = document.getElementById("form")!;
            const bag = document.createElement("input");
            bag.setAttribute("name", "bag");
            bag.value = JSON.stringify(getBag());
            bag.style.display = "none";
            form.appendChild(bag);
          }}
        />
      </form>
    </>
  ) : mount ? (
    <p className="text-center w-full">В корзине пусто</p>
  ) : (
    <p className="h-screen"></p>
  );
}
