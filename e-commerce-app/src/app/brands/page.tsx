
import { LuTag } from "react-icons/lu";
import { getAllBrands } from "@/api/services/brands.service";
import PageHero from "@/app/_components/PageHero/PageHero";
import BrandCard from "@/app/_components/BrandCard/BrandCard";

export default async function BrandsPage() {
  const brands = await getAllBrands();

  return (
    <main className="min-h-screen bg-gray-50">
      <PageHero
        title="Top Brands"
        subtitle="Shop from your favorite brands"
        crumbs={[{ label: "Home", href: "/" }, { label: "Brands" }]}
        icon={<LuTag />}
        color="purple"
      />

      <section className="w-[90%] mx-auto py-10">
        {brands.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {brands.map((brand) => (
              <BrandCard key={brand._id} brand={brand} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-white p-8 text-center">
            <p className="text-gray-500">No brands found.</p>
          </div>
        )}
      </section>
    </main>
  );
}
