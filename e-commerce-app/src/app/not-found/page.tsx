import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import GoBackButton from "../_components/GoBackButton/GoBackButton";

const floating = [
  { emoji: "🍎", top: "12%", left: "6%" },
  { emoji: "🥕", top: "22%", left: "90%" },
  { emoji: "🍋", top: "78%", left: "10%" },
  { emoji: "🥦", top: "70%", left: "86%" },
];

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gray-50 px-4 py-16">
      {/* fruits and vegetables in the corners */}
      {floating.map((item, index) => (
        <span
          key={item.emoji}
          aria-hidden
          className="float-slow absolute select-none text-4xl opacity-40"
          style={{
            top: item.top,
            left: item.left,
            animationDelay: `${index * 0.8}s`,
          }}
        >
          {item.emoji}
        </span>
      ))}

      <div className="relative text-center">
        <div className="relative mx-auto mb-8 w-fit">
          <div className="flex size-40 items-center justify-center rounded-3xl bg-white text-7xl text-green-400 shadow-xl">
            <LuShoppingCart />
          </div>

          <span className="absolute -end-8 -top-8 flex size-20 items-center justify-center rounded-full bg-green-600 text-2xl font-bold text-white shadow-lg ring-8 ring-white">
            404
          </span>
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl">
          Oops! Nothing Here
        </h1>

        <p className="mx-auto mt-4 max-w-md text-gray-500">
          Looks like this page went out of stock! Don&apos;t worry, there&apos;s
          plenty more fresh content to explore.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg"
          >
            <FaHome />
            Go to Homepage
          </Link>

          <GoBackButton />
        </div>
      </div>
    </main>
  );
}