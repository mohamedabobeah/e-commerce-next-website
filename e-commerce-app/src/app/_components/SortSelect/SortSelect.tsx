"use client";

import { useRouter, useSearchParams } from "next/navigation";

const options = [
  { value: "", label: "Default" },
  { value: "price", label: "Price: Low to High" },
  { value: "-price", label: "Price: High to Low" },
  { value: "-ratingsAverage", label: "Top Rated" },
  { value: "-sold", label: "Best Selling" },
  { value: "-createdAt", label: "Newest" },
];

export default function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    params.delete("page");

    const query = params.toString();
    router.push(query ? `/shop?${query}` : "/shop", { scroll: false });
  }

  return (
    <label className="flex items-center gap-2 text-sm text-gray-600">
      Sort by
      <select
        value={searchParams.get("sort") ?? ""}
        onChange={(e) => handleChange(e.target.value)}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-green-600"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}