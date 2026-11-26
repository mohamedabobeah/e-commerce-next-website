import { LuMail, LuPhone, LuSparkles, LuTruck } from "react-icons/lu";

export default function TopBar() {
  return (
    <div className="hidden border-b border-gray-100 bg-white text-xs text-gray-600 md:block">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4">
        {/* Offers */}
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <LuTruck className="text-green-600" />
            Free Shipping on Orders 500 EGP
          </span>

          <span className="flex items-center gap-2">
            <LuSparkles className="text-green-600" />
            New Arrivals Daily
          </span>
        </div>

        {/* Contact */}
        <div className="hidden items-center gap-6 lg:flex">
          <a
            href="tel:+18001234567"
            className="flex items-center gap-2 transition hover:text-green-600"
          >
            <LuPhone />
            +1 (800) 123-4567
          </a>

          <a
            href="mailto:support@freshcart.com"
            className="flex items-center gap-2 transition hover:text-green-600"
          >
            <LuMail />
            support@freshcart.com
          </a>
        </div>
      </div>
    </div>
  );
}