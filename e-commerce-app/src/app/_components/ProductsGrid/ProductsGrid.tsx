import Link from "next/link";
import { ProductType } from "@/api/types/product.type";
import ProductCard from "../ProductCard/ProductCard";
import Reveal from "../Reveal/Reveal";

export default function ProductsGrid({
  products,
  emptyMessage = "No products found.",
  itemClassName = "p-2 w-full sm:w-1/2 lg:w-1/4 xl:w-1/5",
}: {
  products?: ProductType[];
  emptyMessage?: string;
  itemClassName?: string; // the width of every card
}) {
  if (!products || products.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap">
      {products.map((product, index) => (
        // every card appears one after the other
        <Reveal
          key={product.id}
          delay={(index % 6) * 80}
          className={itemClassName}
        >
          <Link href={`/productdetails/${product.id}`} className="block">
            <ProductCard product={product} />
          </Link>
        </Reveal>
      ))}
    </div>
  );
}