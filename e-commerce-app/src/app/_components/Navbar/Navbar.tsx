
"use client";

import { useState, useContext, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { FormEvent } from "react";
import {
  LuHeadset,
  LuHeart,
  LuMenu,
  LuSearch,
  LuShoppingCart,
  LuUser,
  LuUserPlus,
  LuX,
  LuChevronDown,
  LuPackage,
  LuMapPin,
  LuLogOut,
} from "react-icons/lu";

import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/context/CartContext";
import { WishlistContext } from "@/context/WishlistContext";
import { CategoryType } from "@/api/types/product.type";
import CategoriesMenu, {
  MobileCategoriesMenu,
} from "../CategoriesMenu/CategoriesMenu";

const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
];

// the pages of the "My Account" menu
const accountLinks = [
  { label: "My Account", href: "/profile", icon: LuUser },
  { label: "My Orders", href: "/allorders", icon: LuPackage },
  { label: "My Addresses", href: "/addresses", icon: LuMapPin },
];

// Sign In / Sign Up buttons appear only on these pages
const authPages = [
  "/login",
  "/register",
  "/forgot-password",
  "/verify-code",
  "/reset-password",
];

function SearchBox({ onSearch }: { onSearch?: () => void }) {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  // go to the shop page with the search word in the url
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const text = keyword.trim();

    router.push(text ? `/shop?keyword=${encodeURIComponent(text)}` : "/shop");
    onSearch?.();
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex h-12 w-full items-center rounded-full border border-gray-200 bg-white ps-6 pe-1.5"
    >
      <input
        type="search"
        name="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search for products, brands and more..."
        aria-label="Search products"
        className="min-w-0 flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
      />
      <button
        type="submit"
        aria-label="Search"
        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-green-600 text-white transition hover:bg-green-700"
      >
        <LuSearch className="h-4 w-4" />
      </button>
    </form>
  );
}

function SupportInfo({ className = "" }: { className?: string }) {
  return (
    <div className={`items-center gap-3 ${className}`}>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
        <LuHeadset className="h-5 w-5" />
      </span>

      <div className="leading-tight">
        <p className="text-xs text-gray-500">Support</p>
        <p className="text-sm font-semibold text-gray-800">24/7 Help</p>
      </div>
    </div>
  );
}

export default function Navbar({
  categories,
}: {
  categories: CategoryType[];
}) {
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  const { data: session, status } = useSession();

  const { numberOfCartItems } = useContext(CartContext);
  const { numberOfWishlistItems } = useContext(WishlistContext);

  const pathname = usePathname();
  const isAuthPage = authPages.includes(pathname);

  // close the account menu when the user clicks outside it or presses Escape
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        accountRef.current &&
        !accountRef.current.contains(e.target as Node)
      ) {
        setAccountOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setAccountOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleLogOut() {
    setAccountOpen(false);
    setOpen(false);
    signOut({ redirect: true, callbackUrl: "/login" });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-4 lg:gap-6">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <LuShoppingCart className="h-8 w-8 text-green-600" />
          <span className="text-2xl font-bold text-gray-900">FreshCart</span>
        </Link>

        {/* Search */}
        <div className="hidden w-full max-w-xs lg:block">
          <SearchBox />
        </div>

        {/* Desktop Nav */}
        <nav className="ms-auto hidden items-center gap-8 lg:flex">
          {links.map((link) =>
            link.label === "Categories" ? (
              <CategoriesMenu key={link.label} categories={categories} />
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium text-gray-800 transition hover:text-green-600"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Support */}
        <SupportInfo className="hidden border-e border-gray-200 pe-5 xl:flex" />

        {/* Actions */}
        <div className="ms-auto flex items-center gap-3 sm:gap-4 lg:ms-0">
          {/* Wishlist */}
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative hidden text-gray-600 transition hover:text-green-600 sm:block"
          >
            <LuHeart className="h-6 w-6" />

            {numberOfWishlistItems > 0 && (
              <span className="absolute -end-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold text-white">
                {numberOfWishlistItems}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            aria-label="Shopping Cart"
            className="relative text-gray-600 transition hover:text-green-600"
          >
            <LuShoppingCart className="h-6 w-6" />

            {numberOfCartItems > 0 && (
              <span className="absolute -end-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-[11px] font-semibold text-white">
                {numberOfCartItems}
              </span>
            )}
          </Link>

          {/* Sign In / Sign Up */}
          {status === "unauthenticated" && isAuthPage && (
            <>
              <Link
                href="/login"
                className="hidden h-12 items-center gap-2 rounded-full bg-green-600 px-6 text-sm font-semibold text-white transition hover:bg-green-700 sm:flex"
              >
                <LuUser className="h-4 w-4" />
                Sign In
              </Link>

              <Link
                href="/register"
                className="hidden h-12 items-center gap-2 rounded-full border border-green-600 px-6 text-sm font-semibold text-green-600 transition hover:bg-green-50 sm:flex"
              >
                <LuUserPlus className="h-4 w-4" />
                Sign Up
              </Link>
            </>
          )}

          {/* Account Dropdown - Desktop */}
          {status === "authenticated" && (
            <div ref={accountRef} className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setAccountOpen((prev) => !prev)}
                className="flex h-11 items-center gap-2 rounded-full border border-gray-200 px-4 text-sm font-semibold text-gray-700 transition hover:border-green-600 hover:text-green-600"
                aria-expanded={accountOpen}
                aria-haspopup="menu"
              >
                <LuUser className="h-5 w-5" />
                <span>Account</span>
                <LuChevronDown
                  className={`h-4 w-4 transition ${
                    accountOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {accountOpen && (
                <div
                  role="menu"
                  className="absolute end-0 top-full z-50 mt-3 w-60 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-lg"
                >
                  <div className="border-b border-gray-100 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-gray-800">
                      {session?.user?.name ?? "My Account"}
                    </p>
                    <p className="mt-1 truncate text-xs text-gray-500">
                      {session?.user?.email}
                    </p>
                  </div>

                  {accountLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-600"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}

                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogOut}
                    className="flex w-full items-center gap-3 border-t border-gray-100 px-4 py-3 text-sm text-red-500 transition hover:bg-red-50"
                  >
                    <LuLogOut className="h-5 w-5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="text-gray-700 lg:hidden"
          >
            {open ? (
              <LuX className="h-7 w-7" />
            ) : (
              <LuMenu className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Panel */}
      {open && (
        <div className="border-t border-gray-100 bg-white px-4 pb-5 pt-4 lg:hidden">
          <SearchBox onSearch={() => setOpen(false)} />

          <nav className="mt-2 flex flex-col">
            {links.map((link) =>
              link.label === "Categories" ? (
                <MobileCategoriesMenu
                  key={link.label}
                  categories={categories}
                  onNavigate={() => setOpen(false)}
                />
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-gray-100 py-3 text-[15px] font-medium text-gray-800 hover:text-green-600"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <SupportInfo className="mt-4 flex" />

          {/* Mobile Auth Buttons */}
          {status === "unauthenticated" && isAuthPage && (
            <div className="mt-4 flex gap-3 sm:hidden">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-green-600 text-sm font-semibold text-white hover:bg-green-700"
              >
                <LuUser className="h-4 w-4" />
                Sign In
              </Link>

              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-green-600 text-sm font-semibold text-green-600 hover:bg-green-50"
              >
                <LuUserPlus className="h-4 w-4" />
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Account Links */}
          {status === "authenticated" && (
            <div className="mt-4 border-t border-gray-100 pt-3">
              <p className="mb-2 px-2 text-sm font-semibold text-gray-800">
                {session?.user?.name ?? "My Account"}
              </p>

              {accountLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}

              <Link
                href="/wishlist"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
              >
                <LuHeart className="h-5 w-5" />
                My Wishlist
              </Link>

              <button
                type="button"
                onClick={handleLogOut}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-500 hover:bg-red-50"
              >
                <LuLogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}