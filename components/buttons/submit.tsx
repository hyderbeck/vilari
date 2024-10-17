"use client";

import { useFormStatus } from "react-dom";
import { Spinner } from "../icons";

export default function Submit({ onClick }: { onClick: () => void }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={pending}
      className="btn mx-auto"
    >
      {pending && <Spinner />}
      Оформить
    </button>
  );
}
