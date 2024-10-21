"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function Carousel() {
  return (
    <Swiper
      className="w-full -my-6"
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
            className="ml-6"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
