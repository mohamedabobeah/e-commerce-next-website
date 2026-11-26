import { LuRotateCcw, LuShieldCheck, LuTruck } from "react-icons/lu";

const features = [
  { icon: LuTruck, title: "Free Delivery", text: "Orders over 500 EGP" },
  { icon: LuRotateCcw, title: "30 Days Return", text: "Money back" },
  { icon: LuShieldCheck, title: "Secure Payment", text: "100% Protected" },
];

export default function ProductFeatures() {
  return (
    <div className="grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-3">
      {features.map((feature) => (
        <div key={feature.title} className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
            <feature.icon />
          </span>

          <div className="leading-tight">
            <p className="text-sm font-medium text-gray-800">{feature.title}</p>
            <p className="text-xs text-gray-500">{feature.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}