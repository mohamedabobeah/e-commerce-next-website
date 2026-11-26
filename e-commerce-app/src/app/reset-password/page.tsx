
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LuArrowLeft, LuEye, LuEyeOff } from "react-icons/lu";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ResetPasswordSchema, ResetPasswordType } from "@/Schemas/auth.schema";
import { resetPassword } from "@/actions/password.actions";
import ResetFlowLayout from "@/app/_components/ResetFlowLayout/ResetFlowLayout";

const fields: {
  name: keyof ResetPasswordType;
  label: string;
  placeholder: string;
}[] = [
  { name: "newPassword", label: "New Password", placeholder: "Enter new password" },
  { name: "rePassword", label: "Confirm New Password", placeholder: "Confirm new password" },
];

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // this page needs the email and a verified code
  useEffect(() => {
    const savedEmail = sessionStorage.getItem("resetEmail");
    const verified = sessionStorage.getItem("resetVerified");

    if (!savedEmail || !verified) {
      router.replace("/forgot-password");
      return;
    }

    setEmail(savedEmail);
  }, [router]);

  const form = useForm<ResetPasswordType>({
    defaultValues: { newPassword: "", rePassword: "" },
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function mySubmit(data: ResetPasswordType) {
    const result = await resetPassword(email, data.newPassword);

    if (result.success) {
      sessionStorage.removeItem("resetEmail");
      sessionStorage.removeItem("resetVerified");

      toast.success("Password changed successfully, please login", {
        position: "top-center",
        duration: 3000,
      });
      router.push("/login");
    } else {
      toast.error(result.message, { position: "top-center", duration: 3000 });
    }
  }

  return (
    <ResetFlowLayout
      step={3}
      title="Create New Password"
      subtitle="Make sure it's strong and easy for you to remember"
    >
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

                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    id={`${item.name}Input`}
                    aria-invalid={fieldState.invalid}
                    placeholder={item.placeholder}
                    autoComplete="new-password"
                    className="pe-10"
                  />

                  {item.name === "newPassword" && (
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute end-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-700"
                    >
                      {showPassword ? <LuEyeOff /> : <LuEye />}
                    </button>
                  )}
                </div>

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
          className="w-full cursor-pointer rounded-md bg-[#16A34A] p-3 font-bold text-white transition hover:bg-[#15803D] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Reset Password"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 font-medium text-green-600 hover:text-green-700"
        >
          <LuArrowLeft />
          Back to Sign In
        </Link>
      </div>
    </ResetFlowLayout>
  );
}