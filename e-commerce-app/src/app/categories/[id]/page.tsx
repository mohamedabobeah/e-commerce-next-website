

import { notFound } from "next/navigation";
import {
  getSpecificCategory,
  getSubcategoriesByCategory,
} from "@/api/services/categories.service";
import { getProductsByCategory } from "@/api/services/routemisr.service";
import PageHero from "@/app/_components/PageHero/PageHero";
import ProductsGrid from "@/app/_components/ProductsGrid/ProductsGrid";

export default async function CategoryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [category, subcategories, products] = await Promise.all([
    getSpecificCategory(id),
    getSubcategoriesByCategory(id),
    getProductsByCategory(id),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <PageHero
        title={category.name}
        subtitle={`Explore all subcategories and products of ${category.name}`}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: category.name },
        ]}
        image={category.image}
      />

      {/* Subcategories */}
      <section className="w-[90%] mx-auto py-10">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Subcategories</h2>

        {subcategories.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {subcategories.map((subcategory) => (
              <div
                key={subcategory._id}
                className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="font-semibold text-gray-800">
                  {subcategory.name}
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-white p-8 text-center">
            <p className="text-gray-500">
              No subcategories found for this category.
            </p>
          </div>
        )}
      </section>

      {/* Products */}
      <section className="w-[90%] mx-auto pb-12">
        <h2 className="mb-6 border-s-8 border-[#16A34A] ps-3 text-2xl font-bold text-gray-800">
          Category <span className="text-[#16A34A]">Products</span>
        </h2>

        <ProductsGrid
          products={products}
          emptyMessage="No products found in this category."
        />
      </section>
    </main>
  );
}