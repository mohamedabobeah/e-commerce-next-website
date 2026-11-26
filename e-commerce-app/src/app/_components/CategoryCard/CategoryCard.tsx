import Link from "next/link";
import { CategoryType } from "@/api/types/product.type";

export default function CategoryCard({ category }: { category: CategoryType }) {
  return (
    <Link
      href={`/categories/${category._id}`}
      className="group flex flex-col rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-500 hover:shadow-lg"
    >
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-gray-100">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <h2 className="mt-3 text-sm font-semibold text-gray-800 transition-colors group-hover:text-green-600 md:text-base">
        {category.name}
      </h2>

      <span className="mt-1 text-xs font-medium text-green-600 opacity-0 transition-opacity group-hover:opacity-100">
        View Subcategories →
      </span>
    </Link>
  );
}