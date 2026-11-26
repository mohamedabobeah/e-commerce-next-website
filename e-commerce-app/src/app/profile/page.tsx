

"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { LuHeart, LuMapPin, LuPackage, LuUser } from "react-icons/lu";
import EditProfileDialog from "@/app/_components/EditProfileDialog/EditProfileDialog";

const cards = [
  {
    href: "/allorders",
    icon: LuPackage,
    title: "My Orders",
    description: "View and track your orders.",
  },
  {
    href: "/addresses",
    icon: LuMapPin,
    title: "My Addresses",
    description: "Manage your saved addresses.",
  },
  {
    href: "/wishlist",
    icon: LuHeart,
    title: "My Wishlist",
    description: "View your favorite products.",
  },
];

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <main className="mx-auto w-[90%] max-w-6xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Account</h1>

        <p className="mt-2 text-gray-500">
          {session?.user?.name
            ? `Welcome back, ${session.user.name}. `
            : ""}
          Manage your account and track your activity.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-xl border bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <card.icon className="mb-4 text-3xl text-green-600" />
            <h2 className="font-semibold text-gray-800">{card.title}</h2>
            <p className="mt-2 text-sm text-gray-500">{card.description}</p>
          </Link>
        ))}

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="cursor-pointer rounded-xl border bg-white p-6 text-start transition hover:-translate-y-1 hover:shadow-lg"
        >
          <LuUser className="mb-4 text-3xl text-green-600" />
          <h2 className="font-semibold text-gray-800">Personal Information</h2>
          <p className="mt-2 text-sm text-gray-500">
            Edit your name, email and phone number.
          </p>
          <span className="mt-4 inline-block text-sm font-semibold text-green-600">
            Edit Information
          </span>
        </button>
      </div>

      <EditProfileDialog open={isOpen} onClose={() => setIsOpen(false)} />
    </main>
  );
}