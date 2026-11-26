"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void; // tries to render the page again
}) {
  useEffect(() => {
    // the real error stays in the browser console for the developer
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-16">
      <div className="text-center">
        <div className="mx-auto mb-8 flex size-32 items-center justify-center rounded-3xl bg-white text-5xl text-orange-400 shadow-xl">
          <FaExclamationTriangle />
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900">
          Something went wrong
        </h1>

        <p className="mx-auto mt-4 max-w-md text-gray-500">
          We could not load this page. Please try again, and if the problem
          stays, come back in a few minutes.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-green-700"
          >
            <FaRedo />
            Try Again
          </button>

          <Link
            href="/"
            className="rounded-lg border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}