/* eslint-disable @next/next/no-img-element */
import { IGIcon, WAIcon } from "@/app/icons";

export default function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row bg-vlr-pattern pt-72 sm:pt-0 bg-center bg-no-repeat xl:mx-auto xl:w-full max-w-screen-2xl">
      <div className="flex flex-col gap-y-6 bg-white p-6 pt-9 sm:py-3 border-black -mt-1 -mb-1">
        <address className="not-italic flex flex-col gap-y-6 pr-12 lg:pr-24">
          <div className="flex gap-x-3">
            <a href="instagram.com/vilari_mhk">
              <IGIcon />
            </a>
            <a href="https://wa.me/+79933451128">
              <WAIcon />
            </a>
          </div>
          <a
            href="tel:+79933451128"
            className="underline underline-offset-4 text-base"
          >
            +7 (993) 345 11 28
          </a>
          <div>
            367008
            <br />
            <a
              href="http://maps.google.com/?q=Ulitsa Batyrmurzayeva, 85, Makhachkala, Republic of Dagestan, Russia, 367008"
              target="_blank"
              className="underline underline-offset-4"
            >
              Батырмурзаева 85
            </a>
            <br />
            Махачкала
            <br />
            11:00 - 19:00 (кроме пятницы)
          </div>
        </address>
        <img
          alt="villari"
          src="logo.png"
          className="w-40 2xl:w-52 sm:mx-auto"
        />
      </div>
    </footer>
  );
}
