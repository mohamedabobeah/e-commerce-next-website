"use client";

import { PulseLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
      <PulseLoader color="#16A34A" />
    </div>
  );
}
