

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LuArrowLeft, LuMail } from "react-icons/lu";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ForgotPasswordSchema, ForgotPasswordType } from "@/Schemas/auth.schema";
import { forgotPassword } from "@/actions/password.actions";
import ResetFlowLayout from "@/app/_components/ResetFlowLayout/ResetFlowLayout";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const form = useForm<ForgotPasswordType>({
    defaultValues: { email: "" },
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function mySubmit(data: ForgotPasswordType) {
    const result = await forgotPassword(data.email);

    if (result.success) {
      // the next pages need the email
      sessionStorage.setItem("resetEmail", data.email);
      sessionStorage.removeItem("resetVerified");

      toast.success(result.message, { position: "top-center", duration: 2000 });
      router.push("/verify-code");
    } else {
      toast.error(result.message, { position: "top-center", duration: 3000 });
    }
  }

  return (
    <ResetFlowLayout
      step={1}
      title="Forgot Password?"
      subtitle="No worries, we'll send you a reset code"
    >
      <form onSubmit={handleSubmit(mySubmit)} className="flex flex-col gap-4">
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="emailInput" className="text-[#16A34A]!">
                Email Address
              </FieldLabel>

              <div className="relative">
                <LuMail className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <Input
                  {...field}
                  type="email"
                  id="emailInput"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email address"
                  autoComplete="off"
                  className="ps-10"
                />
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer rounded-md bg-[#16A34A] p-3 font-bold text-white transition hover:bg-[#15803D] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send Reset Code"}
        </button>
      </form>

      <div className="mt-6 space-y-3 text-center text-sm">
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 font-medium text-green-600 hover:text-green-700"
        >
          <LuArrowLeft />
          Back to Sign In
        </Link>

        <p className="text-gray-500">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-medium text-green-600 hover:text-green-700"
          >
            Sign In
          </Link>
        </p>
      </div>
    </ResetFlowLayout>
  );
}