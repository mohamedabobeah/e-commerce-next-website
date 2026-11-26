"use client";

import { LuMapPin, LuPlus } from "react-icons/lu";
import type { AddressApi } from "@/actions/address.actions";

export default function AddressSelector({
  addresses,
  selectedId,
  onSelect,
}: {
  addresses: AddressApi[];
  selectedId: string; // an address id, or "new"
  onSelect: (id: string) => void;
}) {
  function cardClasses(selected: boolean) {
    return `flex w-full cursor-pointer items-start gap-3 rounded-lg border p-4 text-start transition ${
      selected
        ? "border-green-600 bg-green-50"
        : "border-gray-200 bg-white hover:border-green-300"
    }`;
  }

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-[#16A34A]">
        Delivery Address
      </p>

      <div
        role="radiogroup"
        aria-label="Delivery address"
        className="grid gap-3 sm:grid-cols-2"
      >
        {addresses.map((address) => {
          const selected = selectedId === address._id;

          return (
            <button
              key={address._id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(address._id)}
              className={cardClasses(selected)}
            >
              <LuMapPin
                className={`mt-0.5 shrink-0 text-xl ${
                  selected ? "text-green-600" : "text-gray-400"
                }`}
              />

              <span className="min-w-0">
                <span className="block font-semibold text-gray-800">
                  {address.name}
                </span>

                <span className="block text-sm text-gray-500">
                  {address.city} - {address.details}
                </span>

                <span className="block text-sm text-gray-500">
                  {address.phone}
                </span>
              </span>
            </button>
          );
        })}

        <button
          type="button"
          role="radio"
          aria-checked={selectedId === "new"}
          onClick={() => onSelect("new")}
          className={cardClasses(selectedId === "new")}
        >
          <LuPlus
            className={`mt-0.5 shrink-0 text-xl ${
              selectedId === "new" ? "text-green-600" : "text-gray-400"
            }`}
          />

          <span>
            <span className="block font-semibold text-gray-800">
              Use a different address
            </span>

            <span className="block text-sm text-gray-500">
              Enter the delivery details yourself
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}