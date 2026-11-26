
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaRegStar, FaStar } from "react-icons/fa";
import { getSingleProduct } from "@/api/services/routemisr.service";
import ProductGallery from "@/app/_components/ProductGallery/ProductGallery";
import ProductPurchase from "@/app/_components/ProductPurchase/ProductPurchase";
import ProductFeatures from "@/app/_components/ProductFeatures/ProductFeatures";
import ProductTabs from "@/app/_components/ProductTabs/ProductTabs";
import RelatedProducts from "@/app/_components/RelatedProducts/RelatedProducts";

export default async function Productdetails(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const product = await getSingleProduct(id);

  if (!product) {
    notFound();
  }

  // cover first, then the other images (no duplicates)
  const images = [product.imageCover, ...(product.images ?? [])].filter(
    (src, index, list) => list.indexOf(src) === index
  );

  const rating = Math.round(product.ratingsAverage);
  const inStock = product.quantity > 0;

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-[90%] max-w-6xl py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>

          {product.category && (
            <>
              <span>/</span>
              <Link
                href={`/categories/${product.category._id}`}
                className="hover:text-green-600"
              >
                {product.category.name}
              </Link>
            </>
          )}

          <span>/</span>
          <span className="text-gray-800">{product.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Images */}
          <ProductGallery images={images} title={product.title} />

          {/* Info */}
          <div className="space-y-5">
            {/* Category + brand */}
            <div className="flex flex-wrap gap-2">
              {product.category && (
                <Link
                  href={`/categories/${product.category._id}`}
                  className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 transition hover:bg-green-100"
                >
                  {product.category.name}
                </Link>
              )}

              {product.brand && (
                <Link
                  href={`/brands/${product.brand._id}`}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 transition hover:bg-gray-200"
                >
                  {product.brand.name}
                </Link>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 text-sm">
              <div
                className="flex text-yellow-500"
                aria-label={`${product.ratingsAverage} out of 5`}
              >
                {[1, 2, 3, 4, 5].map((star) =>
                  star <= rating ? (
                    <FaStar key={star} />
                  ) : (
                    <FaRegStar key={star} />
                  )
                )}
              </div>

              <span className="text-gray-600">
                {product.ratingsAverage} ({product.ratingsQuantity} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {(product.priceAfterDiscount ?? product.price).toLocaleString(
                  "en-US"
                )}{" "}
                EGP
              </span>

              {product.priceAfterDiscount ? (
                <span className="text-lg text-gray-400 line-through">
                  {product.price.toLocaleString("en-US")} EGP
                </span>
              ) : null}
            </div>

            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                inStock ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
              }`}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </span>

            <p className="text-gray-600">{product.description}</p>

            <ProductPurchase product={product} />

            <ProductFeatures />
          </div>
        </div>

        <ProductTabs product={product} />

        <Suspense
          fallback={
            <p className="mt-14 text-center text-gray-400">
              Loading related products...
            </p>
          }
        >
          <RelatedProducts
            categoryId={product.category?._id}
            currentId={product.id}
          />
        </Suspense>
      </div>
    </main>
  );
}