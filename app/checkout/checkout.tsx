"use client";

import Bag from "@/components/bag";
import { useItems } from "@/app/hooks";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import Submit from "@/components/buttons/submit";

export default function Checkout({
  placeOrderAction,
  pre,
}: {
  placeOrderAction: (
    _prevState: undefined | true,
    formData: FormData
  ) => Promise<undefined | true>;
  pre?: true;
}) {
  const bag = pre ? "pre" : "order";
  const [state, formAction] = useFormState(placeOrderAction, undefined);
  const items = useItems(bag);

  useEffect(() => {
    if (state) {
      localStorage.setItem(bag, "[]");
      window.dispatchEvent(new Event(bag));
    }
  }, [state, bag]);

  return state ? (
    <p className="m-auto">
      {bag === "order" ? "Заказ" : "Предзаказ"} оформлен! Мы свяжемся с вами в
      ближайшее время.
    </p>
  ) : items.length ? (
    <>
      <Bag
        items={items}
        className="flex flex-col max-h-[24rem] -my-6 w-full md:max-w-[36rem]"
        checkout
      />
      <form
        className="flex flex-col h-[24rem] justify-between gap-y-9 px-6 w-full md:max-w-[32rem]"
        id="form"
        action={formAction}
      >
        <input
          type="text"
          name="name"
          autoComplete="on"
          required
          minLength={2}
          placeholder="Имя или название компании"
          aria-label="Имя или название компании"
          className="outline-none rounded-none text-base xs:text-sm border-b pb-1.5"
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
          placeholder="Телефон для связи"
          aria-label="Телефон для связи"
          autoComplete="on"
          required
          pattern="\+?[0-9]{6,}"
          className="outline-none rounded-none text-base xs:text-sm border-b pb-1.5"
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
          maxLength={300}
          placeholder="Пожелания к заказу"
          aria-label="Пожелания к заказу"
          className="resize-none outline-none text-base xs:text-sm border border-t-0 border-l-0 rounded-br"
          rows={5}
          autoCorrect="false"
          spellCheck="false"
        />
        <Submit
          onClick={() => {
            const form = document.getElementById("form")!;

            const orderInput = document.createElement("input");
            orderInput.setAttribute("name", "bag");
            orderInput.value = JSON.stringify(items);
            orderInput.style.display = "none";
            form.appendChild(orderInput);

            const orderTypeInput = document.createElement("input");
            orderTypeInput.setAttribute("name", "orderType");
            orderTypeInput.value = bag;
            orderTypeInput.style.display = "none";
            form.appendChild(orderTypeInput);
          }}
        />
      </form>
    </>
  ) : (
    <p className="m-auto">В корзине ничего нет</p>
  );
}
