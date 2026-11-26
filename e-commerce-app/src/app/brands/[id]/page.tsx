
import { notFound } from "next/navigation";
import { getSpecificBrand } from "@/api/services/brands.service";
import { getProductsByBrand } from "@/api/services/routemisr.service";
import PageHero from "@/app/_components/PageHero/PageHero";
import ProductsGrid from "@/app/_components/ProductsGrid/ProductsGrid";

export default async function BrandDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [brand, products] = await Promise.all([
    getSpecificBrand(id),
    getProductsByBrand(id),
  ]);

  if (!brand) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <PageHero
        title={brand.name}
        subtitle={`Explore all products from ${brand.name}`}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Brands", href: "/brands" },
          { label: brand.name },
        ]}
        image={brand.image}
        color="purple"
      />

      <section className="w-[90%] mx-auto py-10">
        <h2 className="mb-6 border-s-8 border-[#16A34A] ps-3 text-2xl font-bold text-gray-800">
          Brand <span className="text-[#16A34A]">Products</span>
        </h2>

        <ProductsGrid
          products={products}
          emptyMessage="No products found for this brand."
        />
      </section>
    </main>
  );
}