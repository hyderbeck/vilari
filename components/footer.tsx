import { IGIcon, WAIcon } from "./icons";
import { atteron } from "../app/fonts";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="bg-white md:w-[24rem] flex flex-col gap-y-6 p-6">
        <address className="not-italic flex flex-col gap-y-6">
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
            className="text-base underline underline-offset-4 w-fit"
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
        <p className={`${atteron.className} text-2xl tracking-widest`}>
          vilari
        </p>
      </div>
    </footer>
  );
}
