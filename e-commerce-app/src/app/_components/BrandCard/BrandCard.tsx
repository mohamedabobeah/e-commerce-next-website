import Link from "next/link";
import { BrandType } from "@/api/types/product.type";

export default function BrandCard({ brand }: { brand: BrandType }) {
  return (
    <Link
      href={`/brands/${brand._id}`}
      className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-28 w-full items-center justify-center rounded-lg bg-gray-50 p-3">
        <img
          src={brand.image}
          alt={brand.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <h2 className="text-center text-sm font-semibold text-gray-800 transition-colors group-hover:text-green-600">
        {brand.name}
      </h2>
    </Link>
  );
}