import { getProductsByCategory } from "@/api/services/routemisr.service";
import ProductsGrid from "../ProductsGrid/ProductsGrid";

export default async function RelatedProducts({
  categoryId,
  currentId,
}: {
  categoryId?: string;
  currentId: string;
}) {
  if (!categoryId) return null;

  const products = await getProductsByCategory(categoryId);

  // the same category without the product we are looking at
  const related = (products ?? [])
    .filter((product) => product.id !== currentId)
    .slice(0, 5);

  if (related.length === 0) return null;

  return (
    <section className="mt-14">
      <h2 className="mb-6 border-s-8 border-[#16A34A] ps-3 text-2xl font-bold text-gray-900">
        You May Also <span className="text-[#16A34A]">Like</span>
      </h2>

      <ProductsGrid products={related} />
    </section>
  );
}