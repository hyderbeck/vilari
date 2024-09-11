"use client";

import { ItemPreview } from "@/interfaces";
import { useFormStatus } from "react-dom";
import { Spinner } from "../icons";

export default function Submit({
  items,
  onClick,
}: {
  items: ItemPreview[];
  onClick: () => void;
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
      Оформить
    </button>
  );
}
