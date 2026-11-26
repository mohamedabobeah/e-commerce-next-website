"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LuChevronDown } from "react-icons/lu";
import { CategoryType } from "@/api/types/product.type";

// the categories shown in the menu, in this order (like the design)
const preferred = ["electronics", "women", "men", "beauty"];

function pickCategories(categories: CategoryType[]) {
  const picked: CategoryType[] = [];

  preferred.forEach((word) => {
    const found = categories.find(
      (category) =>
        category.name.toLowerCase().includes(word) && !picked.includes(category)
    );

    if (found) picked.push(found);
  });

  // if some of them do not exist, fill the list with the first categories
  categories.forEach((category) => {
    if (picked.length < 4 && !picked.includes(category)) picked.push(category);
  });

  return picked;
}

const itemClasses =
  "block px-5 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-600";

// Desktop: opens on hover (and on click for touch screens)
export default function CategoriesMenu({
  categories,
}: {
  categories: CategoryType[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex cursor-pointer items-center gap-1 text-[15px] font-medium text-gray-800 transition hover:text-green-600"
      >
        Categories
        <LuChevronDown
          className={`size-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        // pt-3 keeps the mouse inside the menu while it moves down
        <div role="menu" className="absolute start-0 top-full z-50 pt-3">
          <div className="w-56 animate-[fade-up_0.2s_ease-out] rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
            <Link
              href="/categories"
              role="menuitem"
              onClick={() => setOpen(false)}
              className={itemClasses}
            >
              All Categories
            </Link>

            {pickCategories(categories).map((category) => (
              <Link
                key={category._id}
                href={`/categories/${category._id}`}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={itemClasses}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Mobile panel: a list that opens and closes
export function MobileCategoriesMenu({
  categories,
  onNavigate,
}: {
  categories: CategoryType[];
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between py-3 text-[15px] font-medium text-gray-800 hover:text-green-600"
      >
        Categories
        <LuChevronDown
          className={`size-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="mb-2 ms-3 border-s-2 border-green-100">
          <Link
            href="/categories"
            onClick={onNavigate}
            className="block py-2 ps-4 text-sm text-gray-700 hover:text-green-600"
          >
            All Categories
          </Link>

          {pickCategories(categories).map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              onClick={onNavigate}
              className="block py-2 ps-4 text-sm text-gray-700 hover:text-green-600"
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}