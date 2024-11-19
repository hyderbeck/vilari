"use client";

import { useFormStatus } from "react-dom";
import { Spinner } from "../icons";

export default function Submit({
  onClick,
  className,
}: {
  onClick: () => void;
  className: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={pending}
      className={`btn ${className}`}
    >
      {pending && <Spinner />}
      Оформить
    </button>
  );
}
