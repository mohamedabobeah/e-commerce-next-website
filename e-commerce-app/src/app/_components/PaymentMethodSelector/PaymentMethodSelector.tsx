"use client";

import { LuBanknote, LuCreditCard } from "react-icons/lu";

export type PaymentMethod = "card" | "cash";

const options = [
  {
    value: "card",
    title: "Pay Online",
    description: "Secure payment with your card",
    icon: LuCreditCard,
  },
  {
    value: "cash",
    title: "Cash on Delivery",
    description: "Pay when you receive your order",
    icon: LuBanknote,
  },
] as const;

export default function PaymentMethodSelector({
  value,
  onChange,
}: {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-[#16A34A]">Payment Method</p>

      <div
        role="radiogroup"
        aria-label="Payment method"
        className="grid gap-3 sm:grid-cols-2"
      >
        {options.map((option) => {
          const selected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 text-start transition ${
                selected
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200 bg-white hover:border-green-300"
              }`}
            >
              <option.icon
                className={`mt-0.5 text-xl ${
                  selected ? "text-green-600" : "text-gray-400"
                }`}
              />

              <span>
                <span className="block font-semibold text-gray-800">
                  {option.title}
                </span>

                <span className="block text-sm text-gray-500">
                  {option.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}