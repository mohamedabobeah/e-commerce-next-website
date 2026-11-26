"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

interface Slide {
  title: string;
  subtitle: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  emojis: string[]; // fruits and vegetables drawn on the green background
  gradient: string;
  // optional real photo: put it in public/images/hero/ and write "/images/hero/name.jpg"
  image?: string;
}

const slides: Slide[] = [
  {
    title: "Fresh Products Delivered to Your Door",
    subtitle: "Get 20% off your first order",
    primary: { label: "Shop Now", href: "/shop" },
    secondary: { label: "Learn More", href: "/categories" },
    emojis: ["🥦", "🍎", "🥕", "🍊", "🍅", "🥬"],
    gradient: "from-green-600 via-green-500 to-emerald-400",
  },
  {
    title: "Premium Quality Guaranteed",
    subtitle: "Fresh from farm to your table",
    primary: { label: "Shop Now", href: "/shop" },
    secondary: { label: "Learn More", href: "/brands" },
    emojis: ["🍇", "🥑", "🍋", "🌽", "🍓", "🥒"],
    gradient: "from-emerald-700 via-green-600 to-green-400",
  },
  {
    title: "Fast & Free Delivery",
    subtitle: "Same day delivery available",
    primary: { label: "Order Now", href: "/shop" },
    secondary: { label: "Delivery Info", href: "/shipping-info" },
    emojis: ["🍍", "🥭", "🥕", "🍏", "🌶️", "🍌"],
    gradient: "from-green-700 via-emerald-600 to-lime-400",
  },
];

// where every emoji is placed on the right side of the slide
const positions = [
  { top: "8%", left: "8%", size: "text-7xl" },
  { top: "48%", left: "0%", size: "text-8xl" },
  { top: "66%", left: "34%", size: "text-6xl" },
  { top: "10%", left: "50%", size: "text-8xl" },
  { top: "44%", left: "64%", size: "text-7xl" },
  { top: "68%", left: "84%", size: "text-6xl" },
];

// the dots of the slider
const swiperTheme = {
  "--swiper-pagination-color": "#ffffff",
  "--swiper-pagination-bullet-inactive-color": "#ffffff",
  "--swiper-pagination-bullet-inactive-opacity": "0.55",
  "--swiper-pagination-bullet-width": "12px",
  "--swiper-pagination-bullet-height": "12px",
  "--swiper-pagination-bottom": "16px",
} as CSSProperties;

const arrowClasses =
  "absolute top-1/2 z-10 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-2xl text-green-600 shadow-lg transition hover:scale-110";

export default function HeroSlider() {
  return (
    <section aria-label="Featured offers">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={800}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        navigation={{ prevEl: ".hero-prev", nextEl: ".hero-next" }}
        style={swiperTheme}
        className="[&_.swiper-pagination-bullet-active]:w-8! [&_.swiper-pagination-bullet-active]:rounded-full! [&_.swiper-pagination-bullet]:transition-all"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div
              className={`relative h-[360px] overflow-hidden bg-gradient-to-r md:h-[420px] ${slide.gradient}`}
            >
              {/* real photo with a green layer on it (optional) */}
              {slide.image && (
                <>
                  <img
                    src={slide.image}
                    alt=""
                    className="hero-bg absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-700/90 via-green-600/70 to-green-500/40" />
                </>
              )}

              {/* soft circles */}
              <div className="absolute -end-24 -top-24 size-80 rounded-full bg-white/10" />
              <div className="absolute -bottom-32 start-1/3 size-72 rounded-full bg-white/10" />

              {/* fruits and vegetables */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 end-0 hidden w-3/5 md:block"
              >
                {slide.emojis.map((emoji, index) => (
                  <span
                    key={`${emoji}-${index}`}
                    className={`float-slow absolute select-none drop-shadow-xl ${positions[index].size}`}
                    style={{
                      top: positions[index].top,
                      left: positions[index].left,
                      animationDelay: `${index * 0.7}s`,
                    }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>

              {/* text */}
              <div className="relative mx-auto flex h-full w-[80%] max-w-7xl flex-col justify-center">
                <h2 className="hero-item max-w-xl text-4xl font-bold text-white drop-shadow md:text-5xl">
                  {slide.title}
                </h2>

                <p className="hero-item mt-3 text-lg text-white/90">
                  {slide.subtitle}
                </p>

                <div className="hero-item mt-6 flex flex-wrap gap-3">
                  <Link
                    href={slide.primary.href}
                    className="rounded-lg bg-white px-6 py-3 font-semibold text-green-700 shadow transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    {slide.primary.label}
                  </Link>

                  <Link
                    href={slide.secondary.href}
                    className="rounded-lg border-2 border-white/70 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
                  >
                    {slide.secondary.label}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* arrows inside white circles */}
        <button
          type="button"
          aria-label="Previous slide"
          className={`hero-prev start-4 ${arrowClasses}`}
        >
          <LuChevronLeft />
        </button>

        <button
          type="button"
          aria-label="Next slide"
          className={`hero-next end-4 ${arrowClasses}`}
        >
          <LuChevronRight />
        </button>
      </Swiper>
    </section>
  );
}