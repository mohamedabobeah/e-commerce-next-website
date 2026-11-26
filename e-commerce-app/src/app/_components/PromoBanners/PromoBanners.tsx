import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import Reveal from "../Reveal/Reveal";

const banners = [
  {
    badge: "Deal of the Day",
    badgeEmoji: "🔥",
    title: "Fresh Organic Fruits",
    text: "Get up to 40% off on selected organic fruits",
    discount: "40% OFF",
    code: "ORGANIC40",
    button: "Shop Now",
    href: "/shop",
    gradient: "from-emerald-500 to-green-700",
    buttonText: "text-green-700",
  },
  {
    badge: "New Arrivals",
    badgeEmoji: "✨",
    title: "Exotic Vegetables",
    text: "Discover our latest collection of premium vegetables",
    discount: "25% OFF",
    code: "FRESH25",
    button: "Explore Now",
    href: "/shop",
    gradient: "from-orange-500 to-rose-500",
    buttonText: "text-orange-600",
  },
];

export default function PromoBanners() {
  return (
    <section className="mx-auto my-12 grid w-[90%] max-w-7xl gap-6 md:grid-cols-2">
      {banners.map((banner, index) => (
        <Reveal key={banner.title} delay={index * 150}>
          <div
            className={`relative h-full overflow-hidden rounded-2xl bg-gradient-to-br p-8 text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl ${banner.gradient}`}
          >
            {/* soft circles */}
            <div className="absolute -end-10 -top-10 size-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-10 -start-10 size-32 rounded-full bg-white/10" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
                <span aria-hidden>{banner.badgeEmoji}</span>
                {banner.badge}
              </span>

              <h3 className="mt-4 text-3xl font-bold">{banner.title}</h3>
              <p className="mt-2 text-white/90">{banner.text}</p>

              <div className="mt-5 flex flex-wrap items-baseline gap-4">
                <span className="text-3xl font-bold">{banner.discount}</span>

                <span className="text-sm text-white/90">
                  Use code: <strong>{banner.code}</strong>
                </span>
              </div>

              <Link
                href={banner.href}
                className={`mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold transition hover:gap-3 ${banner.buttonText}`}
              >
                {banner.button}
                <LuArrowRight />
              </Link>
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}