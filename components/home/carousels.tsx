"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Preview from "../preview";
import { Item } from "@/interfaces";
import Link from "next/link";

export function Logos() {
  return (
    <Swiper
      className="w-full border-t -mb-6"
      slidesPerView={3}
      breakpoints={{
        480: { slidesPerView: 4 },
        768: { slidesPerView: 5 },
        1280: { slidesPerView: 6 },
      }}
      spaceBetween={48}
      autoplay={true}
      loop={true}
      modules={[Autoplay]}
    >
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <SwiperSlide key={num}>
          <Image
            alt=""
            src={`/logos/${num}.jpeg`}
            width="100"
            height="100"
            className="ml-6 mt-6"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export function Items({ items }: { items: Item[] }) {
  return (
    <Swiper
      slidesPerView={1}
      className="w-full mb-6"
      loop={true}
      breakpoints={{
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
      autoplay={{ delay: 15000 }}
      modules={[Autoplay]}
    >
      {items.map((item) => (
        <SwiperSlide key={item.id} className="!min-h-[360px]">
          <Preview item={item} page="home" welcome />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

/*



*/
