import { LuHeadset, LuRotateCcw, LuShieldCheck, LuTruck } from "react-icons/lu";
import Reveal from "../Reveal/Reveal";

const features = [
  {
    icon: LuTruck,
    title: "Free Shipping",
    text: "On orders over 500 EGP",
    iconClasses: "bg-blue-50 text-blue-500",
  },
  {
    icon: LuShieldCheck,
    title: "Secure Payment",
    text: "100% secure transactions",
    iconClasses: "bg-green-50 text-green-500",
  },
  {
    icon: LuRotateCcw,
    title: "Easy Returns",
    text: "14-day return policy",
    iconClasses: "bg-orange-50 text-orange-500",
  },
  {
    icon: LuHeadset,
    title: "24/7 Support",
    text: "Dedicated support team",
    iconClasses: "bg-purple-50 text-purple-500",
  },
];

export default function HomeFeatureCards() {
  return (
    <section className="mx-auto mt-8 grid w-[90%] max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => (
        <Reveal key={feature.title} delay={index * 90}>
          <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <span
              className={`flex size-12 shrink-0 items-center justify-center rounded-full text-xl ${feature.iconClasses}`}
            >
              <feature.icon />
            </span>

            <div className="leading-tight">
              <p className="font-semibold text-gray-900">{feature.title}</p>
              <p className="mt-1 text-sm text-gray-500">{feature.text}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}