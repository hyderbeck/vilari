"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Preview from "../preview";
import { Item } from "@/interfaces";

export function Logos({ className }: { className: string }) {
  return (
    <Swiper
      className={`border-t ${className}`}
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
      {Array.from(Array(6).keys()).map((num) => (
        <SwiperSlide key={num}>
          <Image
            alt=""
            src={`/logos/${num + 1}.jpeg`}
            width="100"
            height="100"
            className="mt-6 ml-6"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export function Items({
  items,
  className,
}: {
  items: Item[];
  className: string;
}) {
  return (
    <Swiper
      className={className}
      slidesPerView={1}
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
