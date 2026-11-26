"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { toast } from "sonner";
import { LuArrowRight, LuLock } from "react-icons/lu";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email", {
        position: "top-center",
        duration: 2000,
      });
      return;
    }

    // there is no newsletter api in this project, so we only show the message
    toast.success("Thanks for subscribing!", {
      position: "top-center",
      duration: 2000,
    });

    setEmail("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          className="h-14 flex-1 rounded-xl border border-gray-200 bg-white px-5 text-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
        />

        <button
          type="submit"
          className="flex h-14 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-8 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Subscribe
          <LuArrowRight />
        </button>
      </form>

      <p className="mt-3 flex items-center gap-2 text-xs text-gray-500">
        <LuLock />
        Unsubscribe anytime. No spam, ever.
      </p>
    </div>
  );
}