"use client";

import Link from "next/link";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { myRegisterSchema, RegisterSchemaType } from "@/Schemas/auth.schema";
import { UserRegister } from "@/actions/auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AuthSplitLayout from "@/app/_components/AuthSplitLayout/AuthSplitLayout";

const fields: {
  name: keyof RegisterSchemaType;
  label: string;
  type: string;
  placeholder: string;
}[] = [
  { name: "name", label: "Name", type: "text", placeholder: "Enter your name" },
  { name: "email", label: "Email", type: "email", placeholder: "Enter your email" },
  { name: "phone", label: "Phone", type: "tel", placeholder: "Enter your phone" },
  { name: "password", label: "Password", type: "password", placeholder: "Enter your password" },
  { name: "rePassword", label: "Confirm Password", type: "password", placeholder: "Confirm your password" },
];

export default function Register() {
  const router = useRouter();

  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(myRegisterSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function mySubmit(data: RegisterSchemaType) {
    const isRegisteredSuccessfully = await UserRegister(data);

    if (isRegisteredSuccessfully) {
      toast.success("You Registered Successfully ❤ ", {
        duration: 3000,
        position: "top-center",
      });

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      toast.error("We Cannot Register Now! 🔴 ", {
        duration: 3000,
        position: "top-center",
      });
    }
  }

  return (
    <AuthSplitLayout
      title="Create Your Account"
      subtitle="Join FreshCart and start your fresh shopping journey"
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
          {isSubmitting ? "Creating account..." : "Register Now"}
        </button>
      </form>

      <div className="mt-6 border-t border-gray-100 pt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-green-600 hover:text-green-700"
        >
          Sign In
        </Link>
      </div>
    </AuthSplitLayout>
  );
}