"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { LuSave } from "react-icons/lu";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UpdateProfileSchema, UpdateProfileType } from "@/Schemas/auth.schema";
import { updateUserData } from "@/actions/user.actions";
import Modal from "../Modal/Modal";

const fields: {
  name: keyof UpdateProfileType;
  label: string;
  type: string;
  placeholder: string;
}[] = [
  { name: "name", label: "Full Name:", type: "text", placeholder: "Enter your name..." },
  { name: "email", label: "Email Address:", type: "email", placeholder: "Enter your email..." },
  { name: "phone", label: "Phone Number:", type: "tel", placeholder: "01XXXXXXXXX (optional)" },
];

export default function EditProfileDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { data: session, update } = useSession();

  const currentName = session?.user?.name ?? "";
  const currentEmail = session?.user?.email ?? "";

  const form = useForm<UpdateProfileType>({
    defaultValues: { name: "", email: "", phone: "" },
    resolver: zodResolver(UpdateProfileSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  // fill the form with the logged user data every time the dialog opens
  useEffect(() => {
    if (open) {
      reset({ name: currentName, email: currentEmail, phone: "" });
    }
  }, [open, currentName, currentEmail, reset]);

  async function mySubmit(data: UpdateProfileType) {
    // send only what changed (the api rejects an email that did not change)
    const changes: { name?: string; email?: string; phone?: string } = {};

    if (data.name !== currentName) changes.name = data.name;
    if (data.email !== currentEmail) changes.email = data.email;
    if (data.phone) changes.phone = data.phone;

    if (Object.keys(changes).length === 0) {
      toast.info("No changes to save", {
        position: "top-center",
        duration: 2000,
      });
      return;
    }

    const res = await updateUserData(changes);

    if (res.success) {
      toast.success(res.message, { position: "top-center", duration: 2000 });

      // refresh the name / email shown in the navbar
      await update({ name: data.name, email: data.email });
      onClose();
    } else {
      toast.error(res.message, { position: "top-center", duration: 3000 });
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Personal Information">
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LuSave size={18} />
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </Modal>
  );
}