"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LuSlidersHorizontal } from "react-icons/lu";
import { BrandType, CategoryType } from "@/api/types/product.type";

// the price boxes have their own state, the url is changed only when Apply is clicked
function PriceFilter({
  minPrice,
  maxPrice,
  onApply,
}: {
  minPrice: string;
  maxPrice: string;
  onApply: (min: string, max: string) => void;
}) {
  const [min, setMin] = useState(minPrice);
  const [max, setMax] = useState(maxPrice);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onApply(min, max);
      }}
      className="flex flex-col gap-3"
    >
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={0}
          value={min}
          onChange={(e) => setMin(e.target.value)}
          placeholder="Min"
          aria-label="Minimum price"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600"
        />

        <span className="text-gray-400">-</span>

        <input
          type="number"
          min={0}
          value={max}
          onChange={(e) => setMax(e.target.value)}
          placeholder="Max"
          aria-label="Maximum price"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600"
        />
      </div>

      <button
        type="submit"
        className="cursor-pointer rounded-md bg-green-600 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
      >
        Apply
      </button>
    </form>
  );
}

export default function ShopFilters({
  categories,
  brands,
}: {
  categories: CategoryType[];
  brands: BrandType[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false); // mobile only

  const selectedCategories = searchParams.getAll("category");
  const selectedBrand = searchParams.get("brand") ?? "";
  const minPrice = searchParams.get("minPrice") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";

  const hasFilters =
    selectedCategories.length > 0 ||
    selectedBrand !== "" ||
    minPrice !== "" ||
    maxPrice !== "" ||
    searchParams.get("sort") !== null;

  // every change starts again from page 1
  function pushParams(params: URLSearchParams) {
    params.delete("page");

    const query = params.toString();
    router.push(query ? `/shop?${query}` : "/shop", { scroll: false });
  }

  function toggleCategory(id: string) {
    const params = new URLSearchParams(searchParams.toString());

    const next = selectedCategories.includes(id)
      ? selectedCategories.filter((item) => item !== id)
      : [...selectedCategories, id];

    params.delete("category");
    next.forEach((item) => params.append("category", item));

    pushParams(params);
  }

  function changeBrand(id: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (id) {
      params.set("brand", id);
    } else {
      params.delete("brand");
    }

    pushParams(params);
  }

  function applyPrice(min: string, max: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (min) params.set("minPrice", min);
    else params.delete("minPrice");

    if (max) params.set("maxPrice", max);
    else params.delete("maxPrice");

    pushParams(params);
  }

  // clear everything except the search word
  function clearFilters() {
    const params = new URLSearchParams();
    const keyword = searchParams.get("keyword");

    if (keyword) params.set("keyword", keyword);

    pushParams(params);
  }

  return (
    <div>
      {/* Filters button (mobile / tablet) */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 lg:hidden"
      >
        <LuSlidersHorizontal />
        Filters
      </button>

      <div
        className={`${
          open ? "block" : "hidden"
        } mt-3 space-y-6 rounded-xl border border-gray-200 bg-white p-5 lg:mt-0 lg:block`}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Filters</h2>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="cursor-pointer text-sm font-medium text-green-600 hover:text-green-700"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Categories */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-800">
            Categories
          </h3>

          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category._id}
                className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category._id)}
                  onChange={() => toggleCategory(category._id)}
                  className="size-4 accent-green-600"
                />
                {category.name}
              </label>
            ))}
          </div>
        </div>

        {/* Brand */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-800">Brand</h3>

          <select
            value={selectedBrand}
            onChange={(e) => changeBrand(e.target.value)}
            aria-label="Brand"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-green-600"
          >
            <option value="">All brands</option>

            {brands.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-800">
            Price (EGP)
          </h3>

          <PriceFilter
            key={`${minPrice}-${maxPrice}`}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onApply={applyPrice}
          />
        </div>
      </div>
    </div>
  );
}