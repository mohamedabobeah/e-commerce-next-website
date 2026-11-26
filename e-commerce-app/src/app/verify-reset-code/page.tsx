

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LuArrowLeft } from "react-icons/lu";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { VerifyCodeSchema, VerifyCodeType } from "@/Schemas/auth.schema";
import { forgotPassword, verifyResetCode } from "@/actions/password.actions";
import ResetFlowLayout from "@/app/_components/ResetFlowLayout/ResetFlowLayout";

export default function VerifyCodePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [resending, setResending] = useState(false);

  // this page needs the email from the first step
  useEffect(() => {
    const savedEmail = sessionStorage.getItem("resetEmail");

    if (!savedEmail) {
      router.replace("/forgot-password");
      return;
    }

    setEmail(savedEmail);
  }, [router]);

  const form = useForm<VerifyCodeType>({
    defaultValues: { resetCode: "" },
    resolver: zodResolver(VerifyCodeSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function mySubmit(data: VerifyCodeType) {
    const result = await verifyResetCode(data.resetCode.trim());

    if (result.success) {
      sessionStorage.setItem("resetVerified", "true");

      toast.success(result.message, { position: "top-center", duration: 2000 });
      router.push("/reset-password");
    } else {
      toast.error(result.message, { position: "top-center", duration: 3000 });
    }
  }

  async function handleResend() {
    if (!email) return;

    setResending(true);
    const result = await forgotPassword(email);
    setResending(false);

    if (result.success) {
      toast.success("A new code was sent to your email", {
        position: "top-center",
        duration: 2000,
      });
    } else {
      toast.error(result.message, { position: "top-center", duration: 3000 });
    }
  }

  return (
    <ResetFlowLayout
      step={2}
      title="Check Your Email"
      subtitle={
        <>
          Enter the 6-digit code sent to{" "}
          <span className="font-medium text-gray-800">{email}</span>
        </>
      }
    >
      <form onSubmit={handleSubmit(mySubmit)} className="flex flex-col gap-4">
        <Controller
          name="resetCode"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="resetCodeInput" className="text-[#16A34A]!">
                Verification Code
              </FieldLabel>

              <Input
                {...field}
                type="text"
                id="resetCodeInput"
                inputMode="numeric"
                maxLength={6}
                aria-invalid={fieldState.invalid}
                placeholder="------"
                autoComplete="one-time-code"
                className="text-center text-lg tracking-[0.5em]"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <p className="text-center text-sm text-gray-500">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="cursor-pointer font-medium text-green-600 hover:text-green-700 disabled:opacity-60"
          >
            {resending ? "Sending..." : "Resend Code"}
          </button>
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer rounded-md bg-[#16A34A] p-3 font-bold text-white transition hover:bg-[#15803D] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Verifying..." : "Verify Code"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <Link
          href="/forgot-password"
          className="flex items-center justify-center gap-2 font-medium text-green-600 hover:text-green-700"
        >
          <LuArrowLeft />
          Change email address
        </Link>
      </div>
    </ResetFlowLayout>
  );
}