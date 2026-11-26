"use client";

import type { CSSProperties } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Swiper reads these CSS variables for its arrows and bullets
const swiperTheme = {
  "--swiper-navigation-color": "#16A34A",
  "--swiper-pagination-color": "#16A34A",
  "--swiper-pagination-bullet-inactive-color": "#ffffff",
  "--swiper-pagination-bullet-inactive-opacity": "1",
  "--swiper-pagination-bullet-opacity": "1",
  "--swiper-pagination-bullet-width": "14px",
  "--swiper-pagination-bullet-height": "14px",
  "--swiper-pagination-bullet-horizontal-gap": "6px",
  "--swiper-pagination-bottom": "14px",
} as CSSProperties;

export default function Slider({
  spaceBetween = 0,
  slidesPerView = 1,
  listOfImages,
  heightClass,
}: {
  spaceBetween?: number;
  slidesPerView?: number;
  listOfImages: string[];
  heightClass: string;
}) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      className={`w-full my-5 [&_.swiper-pagination]:z-20 [&_.swiper-pagination-bullet]:border-2 [&_.swiper-pagination-bullet]:border-white [&_.swiper-pagination-bullet]:shadow-[0_0_4px_rgba(0,0,0,0.6)] [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet-active]:w-8! [&_.swiper-pagination-bullet-active]:rounded-full!`}
      style={swiperTheme}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      pagination={{ clickable: true }}
      navigation
    >
      {listOfImages.map((src) => (
        <SwiperSlide key={src}>
          <div
            className={`group relative w-full overflow-hidden ${heightClass}`}
          >
            <img
              src={src}
              alt="slide"
              className="block h-full w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            />

            {/* Light green tint on hover (image stays clear) */}
            <div className="pointer-events-none absolute inset-0 bg-green-300/0 transition-colors duration-300 group-hover:bg-green-300/20" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}