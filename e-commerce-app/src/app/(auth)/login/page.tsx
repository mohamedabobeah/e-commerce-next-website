"use client";

import Link from "next/link";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LoginSchema, LoginType } from "@/Schemas/auth.schema";
import AuthSplitLayout from "@/app/_components/AuthSplitLayout/AuthSplitLayout";

const fields: {
  name: keyof LoginType;
  label: string;
  type: string;
  placeholder: string;
}[] = [
  { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email" },
  { name: "password", label: "Password", type: "password", placeholder: "Enter your password" },
];

export default function Login() {
  const router = useRouter();

  const form = useForm<LoginType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function mySubmit(data: LoginType) {
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/",
    });

    if (response?.ok) {
      toast.success("Welcome Back ❤", { duration: 3000, position: "top-center" });
      router.push("/");
      router.refresh();
    } else {
      toast.error("Invalid email or password", {
        duration: 3000,
        position: "top-center",
      });
    }
  }

  return (
    <AuthSplitLayout
      title="Welcome Back!"
      subtitle="Sign in to continue your fresh shopping experience"
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
          className="my-2 w-full cursor-pointer rounded-md bg-[#16A34A] p-4 text-lg font-bold text-white transition hover:bg-[#15803D] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* forgot password */}
      <p className="text-center text-sm">
        <Link
          href="/forgot-password"
          className="font-medium text-green-600 hover:text-green-700"
        >
          Forgot your password?
        </Link>
      </p>

      <div className="mt-6 border-t border-gray-100 pt-6 text-center text-sm text-gray-600">
        New to FreshCart?{" "}
        <Link
          href="/register"
          className="font-semibold text-green-600 hover:text-green-700"
        >
          Create an account
        </Link>
      </div>
    </AuthSplitLayout>
  );
}