"use client";

import { ItemPreview } from "@/interfaces";
import { useFormStatus } from "react-dom";
import { Spinner } from "../icons";

export default function Submit({
  items,
  onClick,
  pre,
}: {
  items: ItemPreview[];
  onClick: () => void;
  pre?: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={!items.length || pending}
      className="py-2 text-center bg-black text-white rounded font-normal flex justify-center items-center gap-x-3"
    >
      {pending && <Spinner />}
      Оформить {pre ? "предзаказ" : "заказ"}
    </button>
  );
}
