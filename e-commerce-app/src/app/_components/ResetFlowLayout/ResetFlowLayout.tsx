import type { ReactNode } from "react";
import { LuLock, LuMail, LuShieldCheck, LuShoppingCart } from "react-icons/lu";
import AuthStepper from "../AuthStepper/AuthStepper";

export default function ResetFlowLayout({
  step,
  title,
  subtitle,
  children,
}: {
  step: 1 | 2 | 3;
  title: string;
  subtitle: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="grid w-full max-w-5xl items-center gap-8 lg:grid-cols-2">
        {/* Left panel (desktop only) */}
        <div className="hidden rounded-2xl bg-green-50 p-10 text-center shadow-sm lg:block">
          <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-3xl bg-white text-5xl text-green-600 shadow">
            <LuLock />
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Reset Your Password
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Don&apos;t worry, it happens to the best of us. We&apos;ll help you
            get back into your account in no time.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <LuMail className="text-green-600" />
              Email Verification
            </span>

            <span className="flex items-center gap-1">
              <LuShieldCheck className="text-green-600" />
              Secure Reset
            </span>

            <span className="flex items-center gap-1">
              <LuLock className="text-green-600" />
              Encrypted
            </span>
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <p className="mb-4 flex items-center justify-center gap-2 text-2xl font-bold text-gray-900">
              <LuShoppingCart className="text-green-600" />
              FreshCart
            </p>

            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          </div>

          <AuthStepper step={step} />

          <div className="mt-6">{children}</div>
        </div>
      </div>
    </main>
  );
}