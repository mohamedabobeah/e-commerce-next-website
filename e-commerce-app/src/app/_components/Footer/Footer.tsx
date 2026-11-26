import Link from "next/link";
import {
  LuCreditCard,
  LuMail,
  LuMapPin,
  LuPhone,
  LuShoppingCart,
} from "react-icons/lu";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { getAllCategories } from "@/api/services/categories.service";

const contacts = [
  { icon: LuPhone, text: "+1 (800) 123-4567", href: "tel:+18001234567" },
  { icon: LuMail, text: "support@freshcart.com", href: "mailto:support@freshcart.com" },
  { icon: LuMapPin, text: "123 Commerce Street, New York, NY 10001" },
];

const socials = [
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaTwitter, label: "Twitter", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaYoutube, label: "YouTube", href: "#" },
];

const payments = ["Visa", "Mastercard", "PayPal"];

export default async function Footer() {
  const categories = await getAllCategories();

  // Electronics, Men's Fashion and Women's Fashion open their own category page
  function categoryLink(word: string) {
    const category = (categories ?? []).find((item) =>
      item.name.toLowerCase().includes(word)
    );

    return category ? `/categories/${category._id}` : "/categories";
  }

  const columns = [
    {
      title: "Shop",
      links: [
        { label: "All Products", href: "/shop" },
        { label: "Categories", href: "/categories" },
        { label: "Brands", href: "/brands" },
        { label: "Electronics", href: categoryLink("electronics") },
        { label: "Men's Fashion", href: categoryLink("men") },
        { label: "Women's Fashion", href: categoryLink("women") },
      ],
    },
    {
      title: "Account",
      links: [
        { label: "My Account", href: "/profile" },
        { label: "Order History", href: "/allorders" },
        { label: "Wishlist", href: "/wishlist" },
        { label: "Shopping Cart", href: "/cart" },
        { label: "Sign In", href: "/login" },
        { label: "Create Account", href: "/register" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", href: "/contact-us" },
        { label: "Help Center", href: "/not-found" },
        { label: "Shipping Info", href: "/not-found" },
        { label: "Returns & Refunds", href: "/not-found" },
        { label: "Track Order", href: "/not-found" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-of-service" },
        { label: "Cookie Policy", href: "/not-found" },
      ],
    },
  ];

  return (
    <footer className="mt-auto bg-slate-900 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 pt-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2"
            >
              <LuShoppingCart className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold text-gray-900">FreshCart</span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            <ul className="mt-5 space-y-3 text-sm">
              {contacts.map((item) => (
                <li key={item.text} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 shrink-0 text-green-500" />

                  {item.href ? (
                    <a
                      href={item.href}
                      className="transition hover:text-green-500"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-3">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-gray-400 transition hover:bg-green-600 hover:text-white"
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-5 text-base font-semibold text-white">
                {column.title}
              </h3>

              <ul className="space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition hover:text-green-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-800 py-6 text-sm sm:flex-row">
          <p>© {new Date().getFullYear()} FreshCart. All rights reserved.</p>

          <div className="flex items-center gap-5">
            {payments.map((name) => (
              <span key={name} className="flex items-center gap-2">
                <LuCreditCard className="h-4 w-4" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}