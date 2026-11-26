import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { getAllProducts } from "@/api/services/routemisr.service";
import ProductsGrid from "../ProductsGrid/ProductsGrid";

export default async function FeaturedProducts() {
  const allProducts = await getAllProducts();

  return (
    <section className="mx-auto my-12 w-[90%] max-w-7xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="border-s-8 border-[#16A34A] ps-2 text-4xl font-bold">
          Featured <span className="text-[#16A34A]">Products</span>
        </h2>

        <Link
          href="/shop"
          className="flex items-center gap-2 font-medium text-green-600 transition hover:gap-3 hover:text-green-700"
        >
          View all products
          <LuArrowRight />
        </Link>
      </div>

      {/* the first 10 products only, the rest are in the shop page */}
      <ProductsGrid products={allProducts?.slice(0, 10)} />
    </section>
  );
}