import { FaApple, FaGooglePlay, FaStar } from "react-icons/fa";
import { LuLeaf, LuMail, LuSmartphone, LuTag, LuTruck } from "react-icons/lu";
import Reveal from "../Reveal/Reveal";
import NewsletterForm from "../NewsletterForm/NewsletterForm";

const perks = [
  { icon: LuLeaf, label: "Fresh Picks Weekly" },
  { icon: LuTruck, label: "Free Delivery Codes" },
  { icon: LuTag, label: "Members-Only Deals" },
];

export default function NewsletterApp() {
  return (
    <section className="mx-auto my-16 w-[90%] max-w-7xl">
      <Reveal>
        <div className="grid gap-8 rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-white p-6 shadow-sm md:p-10 lg:grid-cols-[1.7fr_1fr]">
          {/* Newsletter */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-xl bg-green-500 text-xl text-white">
                <LuMail />
              </span>

              <div className="leading-tight">
                <p className="text-xs font-bold uppercase tracking-wide text-green-600">
                  Newsletter
                </p>
                <p className="text-xs text-gray-500">50,000+ subscribers</p>
              </div>
            </div>

            <h2 className="mt-6 text-3xl font-bold text-gray-900 md:text-4xl">
              Get the Freshest Updates{" "}
              <span className="text-green-600">Delivered Free</span>
            </h2>

            <p className="mt-3 text-gray-500">
              Weekly recipes, seasonal offers & exclusive member perks.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {perks.map((perk) => (
                <span
                  key={perk.label}
                  className="flex items-center gap-2 rounded-full border border-green-100 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm"
                >
                  <span className="flex size-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <perk.icon />
                  </span>
                  {perk.label}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>

          {/* Mobile app */}
          <div className="rounded-2xl bg-slate-900 p-6 text-white">
            <span className="inline-flex items-center gap-2 rounded-md border border-green-500/40 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
              <LuSmartphone />
              MOBILE APP
            </span>

            <h3 className="mt-5 text-2xl font-bold">Shop Faster on Our App</h3>

            <p className="mt-3 text-sm text-gray-400">
              Get app-exclusive deals & 15% off your first order.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href="#"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
              >
                <FaApple className="text-2xl" />

                <span className="leading-tight">
                  <span className="block text-[10px] uppercase text-gray-400">
                    Download on
                  </span>
                  <span className="block font-semibold">App Store</span>
                </span>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
              >
                <FaGooglePlay className="text-xl" />

                <span className="leading-tight">
                  <span className="block text-[10px] uppercase text-gray-400">
                    Get it on
                  </span>
                  <span className="block font-semibold">Google Play</span>
                </span>
              </a>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs text-gray-400">
              <span className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} />
                ))}
              </span>
              4.9 · 100K+ downloads
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}