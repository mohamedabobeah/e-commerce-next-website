"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { LuX } from "react-icons/lu";

export default function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  // close with the Escape key
  useEffect(() => {
    if (!open) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
          >
            <LuX size={22} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}