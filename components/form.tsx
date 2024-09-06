"use client";

import { Bag, getBag, useItems } from "./bag";
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
    "order placed"
  ) : (
    <>
      <form
        className="flex flex-col items-center"
        id="form"
        action={formAction}
      >
        <label>
          <input type="text" name="name" required minLength={2} />
        </label>
        <label>
          <input
            type="tel"
            name="phone"
            required
            pattern="[0-9]{6,}"
            title="six or more digits"
          />
        </label>
        <label>
          <textarea name="description" maxLength={300} />
        </label>
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
        >
          submit
        </button>
      </form>
      <Bag />
    </>
  );
}
