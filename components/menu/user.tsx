"use client";

import { useFormStatus } from "react-dom";
import { Spinner, User as UserIcon } from "../icons";

function Login() {
  return (
    <input
      type="tel"
      name="login"
      placeholder="Номер телефона"
      aria-label="Телефон"
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
  );
}

function Password() {
  return (
    <input
      type="password"
      name="password"
      autoComplete="on"
      required
      minLength={2}
      placeholder="Пароль"
      aria-label="Пароль"
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
  );
}

export default function User({
  user,
  onClick,
}: {
  user: boolean;
  onClick: () => void;
}) {
  const { pending } = useFormStatus();
  return (
    <>
      <button onClick={onClick}>
        <UserIcon className="size-6" />
      </button>
      <div
        className={`${
          user ? "flex" : "hidden"
        } absolute top-16 mt-6 right-0 left-0 md:left-auto bg-white border border-r-0 md:w-[32rem] h-[20rem]`}
      >
        <form className="flex flex-col gap-y-9 px-6 m-auto">
          <Login />
          <button className="btn">{pending && <Spinner />}Войти</button>
        </form>
      </div>
    </>
  );
}
