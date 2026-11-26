import { LuMapPin, LuPhone, LuTrash2 } from "react-icons/lu";
import type { AddressApi } from "@/actions/address.actions";

export default function AddressCard({
  address,
  deleting,
  onDelete,
}: {
  address: AddressApi;
  deleting: boolean;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
        <LuMapPin />
      </span>

      <div className="min-w-0 flex-1">
        <h2 className="font-semibold text-gray-800">{address.name}</h2>

        <p className="mt-1 text-sm text-gray-500">
          {address.city} - {address.details}
        </p>

        <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <LuPhone />
          {address.phone}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onDelete(address._id)}
        disabled={deleting}
        aria-label="Delete address"
        className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-gray-200 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <LuTrash2 />
      </button>
    </div>
  );
}