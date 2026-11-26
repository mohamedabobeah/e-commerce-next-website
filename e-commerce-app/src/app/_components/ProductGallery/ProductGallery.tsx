"use client";

import { useState } from "react";

export default function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Main image */}
      <div className="flex aspect-square items-center justify-center rounded-xl border border-gray-200 bg-white p-4">
        <img
          src={images[active]}
          alt={title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === active}
              className={`size-20 shrink-0 cursor-pointer rounded-lg border-2 bg-white p-1 transition ${
                index === active
                  ? "border-green-600"
                  : "border-gray-200 hover:border-green-300"
              }`}
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}