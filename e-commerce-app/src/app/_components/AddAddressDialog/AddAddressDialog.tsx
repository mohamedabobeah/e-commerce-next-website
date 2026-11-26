"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AddressSchema, AddressType } from "@/Schemas/auth.schema";
import { addUserAddress } from "@/actions/address.actions";
import Modal from "../Modal/Modal";

const fields: {
  name: keyof AddressType;
  label: string;
  type: string;
  placeholder: string;
}[] = [
  { name: "name", label: "Full Name:", type: "text", placeholder: "Enter your name..." },
  { name: "phone", label: "Phone Number:", type: "tel", placeholder: "01XXXXXXXXX" },
  { name: "city", label: "City:", type: "text", placeholder: "Enter your city..." },
  { name: "details", label: "Address Details:", type: "text", placeholder: "Street, Building, Apartment..." },
];

export default function AddAddressDialog({
  open,
  onClose,
  onAdded,
}: {
  open: boolean;
  onClose: () => void;
  onAdded: () => Promise<void>;
}) {
  const form = useForm<AddressType>({
    defaultValues: { name: "", phone: "", city: "", details: "" },
    resolver: zodResolver(AddressSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  // start with an empty form every time the dialog opens
  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  async function mySubmit(data: AddressType) {
    const result = await addUserAddress(data);

    if (result.success) {
      toast.success("Address added successfully", {
        position: "top-center",
        duration: 2000,
      });

      await onAdded();
      onClose();
    } else {
      toast.error(result.message || "Failed to add address", {
        position: "top-center",
        duration: 3000,
      });
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Add New Address">
      <form onSubmit={handleSubmit(mySubmit)} className="flex flex-col gap-4">
        {fields.map((item) => (
          <Controller
            key={item.name}
            name={item.name}
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={`${item.name}Input`}
                  className="text-[#16A34A]!"
                >
                  {item.label}
                </FieldLabel>

                <Input
                  {...field}
                  type={item.type}
                  id={`${item.name}Input`}
                  aria-invalid={fieldState.invalid}
                  placeholder={item.placeholder}
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        ))}

        <div className="mt-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-gray-300 px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Save Address"}
          </button>
        </div>
      </form>
    </Modal>
  );
}