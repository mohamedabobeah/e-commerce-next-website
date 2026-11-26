import Link from "next/link";
import { getWishlist } from "@/actions/wishlist.actions";
import WishlistView from "@/app/_components/WishlistView/WishlistView";

export default async function WishlistPage() {
  const products = await getWishlist();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto w-[90%] max-w-5xl py-8">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-800">Wishlist</span>
        </nav>

        <WishlistView initialProducts={products} />
      </div>
    </main>
  );
}
