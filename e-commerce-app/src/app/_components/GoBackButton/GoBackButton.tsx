"use client";

import { useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <LuArrowLeft />
      Go Back
    </button>
  );
}