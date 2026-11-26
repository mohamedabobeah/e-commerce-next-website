import { LuHeadset, LuRotateCcw, LuShieldCheck, LuTruck } from "react-icons/lu";

const features = [
  { icon: LuTruck, title: "Free Shipping", text: "On orders over 500 EGP" },
  { icon: LuRotateCcw, title: "Easy Returns", text: "14-day return policy" },
  { icon: LuShieldCheck, title: "Secure Payment", text: "100% secure checkout" },
  { icon: LuHeadset, title: "24/7 Support", text: "Contact us anytime" },
];

export default function FeaturesStrip() {
  return (
    <section className="mt-12 border-t border-green-100 bg-green-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div key={feature.title} className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-green-100 text-xl text-green-600">
              <feature.icon />
            </span>

            <div className="leading-tight">
              <p className="text-sm font-semibold text-gray-800">
                {feature.title}
              </p>
              <p className="mt-0.5 text-xs text-gray-500">{feature.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}