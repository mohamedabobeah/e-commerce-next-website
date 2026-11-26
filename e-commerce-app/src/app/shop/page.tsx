import { Suspense } from "react";
import { LuStore } from "react-icons/lu";
import { getProducts } from "@/api/services/routemisr.service";
import { getAllCategories } from "@/api/services/categories.service";
import { getAllBrands } from "@/api/services/brands.service";
import PageHero from "@/app/_components/PageHero/PageHero";
import ProductsGrid from "@/app/_components/ProductsGrid/ProductsGrid";
import Pagination from "@/app/_components/Pagination/Pagination";
import ShopFilters from "@/app/_components/ShopFilters/ShopFilters";
import SortSelect from "@/app/_components/SortSelect/SortSelect";

type SearchParams = Record<string, string | string[] | undefined>;

// ?category=a&category=b  =>  ["a", "b"]
function toArray(value: string | string[] | undefined) {
  if (!value) return undefined;
  return Array.isArray(value) ? value : [value];
}

function toText(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const keyword = toText(params.keyword);
  const page = Math.max(1, Number(toText(params.page)) || 1);

  const [{ products, currentPage, numberOfPages }, categories, brands] =
    await Promise.all([
      getProducts({
        keyword,
        sort: toText(params.sort),
        minPrice: toText(params.minPrice),
        maxPrice: toText(params.maxPrice),
        brand: toText(params.brand),
        category: toArray(params.category),
        page,
      }),
      getAllCategories(),
      getAllBrands(),
    ]);

  return (
    <main className="min-h-screen bg-gray-50">
      <PageHero
        title="Shop"
        subtitle={
          keyword ? `Search results for "${keyword}"` : "Browse all our products"
        }
        crumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
        icon={<LuStore />}
      />

      <section className="mx-auto w-[90%] py-10">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Filters */}
          <aside className="lg:w-64 lg:shrink-0">
            <Suspense fallback={null}>
              <ShopFilters categories={categories} brands={brands} />
            </Suspense>
          </aside>

          {/* Products */}
          <div className="min-w-0 flex-1">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-gray-500">
                Page {currentPage} of {numberOfPages}
              </p>

              <Suspense fallback={null}>
                <SortSelect />
              </Suspense>
            </div>

            <ProductsGrid
              products={products}
              emptyMessage="No products match your search."
              itemClassName="p-2 w-full sm:w-1/2 lg:w-1/3"
            />

            <Pagination
              currentPage={currentPage}
              numberOfPages={numberOfPages}
              basePath="/shop"
              searchParams={params}
            />
          </div>
        </div>
      </section>
    </main>
  );
}