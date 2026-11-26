

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { LuMapPin, LuPlus } from "react-icons/lu";
import {
  deleteUserAddress,
  getUserAddresses,
  type AddressApi,
} from "@/actions/address.actions";
import AddressCard from "@/app/_components/AddressCard/AddressCard";
import AddAddressDialog from "@/app/_components/AddAddressDialog/AddAddressDialog";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<AddressApi[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadAddresses() {
    const result = await getUserAddresses();

    if (result.success) {
      setAddresses(result.data);
    } else {
      setAddresses([]);
      toast.error(result.message || "Failed to load addresses", {
        position: "top-center",
        duration: 3000,
      });
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadAddresses();
  }, []);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmed) return;

    setDeletingId(id);
    const result = await deleteUserAddress(id);
    setDeletingId(null);

    if (result.success) {
      toast.success("Address deleted successfully", {
        position: "top-center",
        duration: 2000,
      });

      // remove it from the screen now
      setAddresses((current) => current.filter((item) => item._id !== id));
    } else {
      toast.error(result.message || "Failed to delete address", {
        position: "top-center",
        duration: 3000,
      });
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto w-[90%] max-w-5xl py-8">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/profile" className="hover:text-green-600">
            My Account
          </Link>
          <span>/</span>
          <span className="text-gray-800">My Addresses</span>
        </nav>

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-green-600 text-xl text-white">
              <LuMapPin />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Addresses</h1>
              <p className="text-sm text-gray-500">
                Manage your saved delivery addresses
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            <LuPlus />
            Add Address
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid gap-5 md:grid-cols-2">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-28 animate-pulse rounded-xl border border-gray-200 bg-white"
              />
            ))}
          </div>
        ) : addresses.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {addresses.map((address) => (
              <AddressCard
                key={address._id}
                address={address}
                deleting={deletingId === address._id}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-green-50 text-2xl text-green-600">
              <LuMapPin />
            </div>

            <h2 className="text-lg font-semibold text-gray-800">
              No addresses found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Add your first delivery address.
            </p>
          </div>
        )}
      </div>

      <AddAddressDialog
        open={showModal}
        onClose={() => setShowModal(false)}
        onAdded={loadAddresses}
      />
    </main>
  );
}