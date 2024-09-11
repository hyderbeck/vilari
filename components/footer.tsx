/* eslint-disable @next/next/no-img-element */
import { IGIcon, WAIcon } from "./icons";
import { atteron } from "./fonts/fonts";

export default function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row bg-vlr-ptrn pt-72 sm:pt-0 bg-center bg-vlr-white">
      <div className="flex flex-col gap-y-6 bg-white p-6 2xl:px-12 sm:py-3 border-black -mt-1 -mb-1">
        <address className="not-italic flex flex-col gap-y-6 pr-32">
          <div className="flex gap-x-3">
            <a href="https://instagram.com/vilari_mhk" target="_blank">
              <IGIcon />
            </a>
            <a href="https://wa.me/+79933451128" target="_blank">
              <WAIcon />
            </a>
          </div>
          <a
            href="tel:+79933451128"
            className="underline underline-offset-4 text-base font-normal"
          >
            +7 (993) 345 11 28
          </a>
          <div>
            367008
            <br />
            <a
              href="http://maps.google.com/?q=Ulitsa Batyrmurzayeva, 85, Makhachkala, Republic of Dagestan, Russia, 367008"
              target="_blank"
              className="underline underline-offset-4 font-normal"
            >
              Батырмурзаева 85
            </a>
            <br />
            Махачкала
            <br />
            11:00 - 19:00 (кроме пятницы)
          </div>
        </address>
        <img alt="vilari" src="logo.png" className="w-40 sm:hidden" />
        <p
          className={`hidden sm:block ${atteron.className} text-2xl tracking-widest`}
        >
          vilari
        </p>
      </div>
    </footer>
  );
}
