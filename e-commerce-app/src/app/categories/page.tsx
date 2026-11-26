
import { LuLayers } from "react-icons/lu";
import { getAllCategories } from "@/api/services/categories.service";
import PageHero from "@/app/_components/PageHero/PageHero";
import CategoryCard from "@/app/_components/CategoryCard/CategoryCard";

export default async function AllCategoriesPage() {
  const categories = await getAllCategories();

  return (
    <main className="min-h-screen bg-gray-50">
      <PageHero
        title="All Categories"
        subtitle="Browse our wide range of product categories"
        crumbs={[{ label: "Home", href: "/" }, { label: "Categories" }]}
        icon={<LuLayers />}
      />

      <section className="w-[90%] mx-auto py-10">
        {categories.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              No Categories Found
            </h2>

            <p className="mt-2 text-gray-500">
              Something went wrong while loading categories.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}