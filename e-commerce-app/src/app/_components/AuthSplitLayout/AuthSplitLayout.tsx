import type { ReactNode } from "react";
import { LuClock, LuShieldCheck, LuShoppingCart, LuTruck } from "react-icons/lu";

// fruits and vegetables around the cart
const emojis = [
  { emoji: "🥕", top: "10%", left: "12%" },
  { emoji: "🍎", top: "8%", left: "76%" },
  { emoji: "🥦", top: "44%", left: "4%" },
  { emoji: "🍊", top: "46%", left: "84%" },
  { emoji: "🍅", top: "76%", left: "16%" },
  { emoji: "🍋", top: "74%", left: "72%" },
];

const perks = [
  { icon: LuTruck, label: "Free Delivery" },
  { icon: LuShieldCheck, label: "Secure Payment" },
  { icon: LuClock, label: "24/7 Support" },
];

export default function AuthSplitLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto grid w-[90%] max-w-6xl items-center gap-10 py-10 lg:grid-cols-2">
      {/* Picture side (desktop only) */}
      <div className="hidden lg:block">
        <div className="relative flex h-80 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-green-100 via-emerald-50 to-white shadow-md">
          <div className="absolute -start-10 -top-10 size-44 rounded-full bg-green-200/50" />
          <div className="absolute -bottom-12 -end-12 size-52 rounded-full bg-emerald-200/50" />

          <div className="relative flex size-40 items-center justify-center rounded-full bg-white text-7xl text-green-600 shadow-xl">
            <LuShoppingCart />
          </div>

          {emojis.map((item, index) => (
            <span
              key={item.emoji}
              aria-hidden
              className="float-slow absolute select-none text-5xl drop-shadow-lg"
              style={{
                top: item.top,
                left: item.left,
                animationDelay: `${index * 0.6}s`,
              }}
            >
              {item.emoji}
            </span>
          ))}
        </div>

        <h2 className="mt-8 text-center text-3xl font-bold text-gray-900">
          FreshCart - Your One-Stop Shop for Fresh Products
        </h2>

        <p className="mt-3 text-center text-gray-500">
          Join thousands of happy customers who trust FreshCart for their daily
          grocery needs
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          {perks.map((perk) => (
            <span key={perk.label} className="flex items-center gap-2">
              <perk.icon className="text-green-600" />
              {perk.label}
            </span>
          ))}
        </div>
      </div>

      {/* Form side */}
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
        <p className="text-center text-3xl font-bold">
          <span className="text-green-600">Fresh</span>
          <span className="text-gray-900">Cart</span>
        </p>

        <h1 className="mt-4 text-center text-2xl font-bold text-gray-900">
          {title}
        </h1>

        <p className="mt-1 mb-6 text-center text-sm text-gray-500">
          {subtitle}
        </p>

        {children}
      </div>
    </main>
  );
}