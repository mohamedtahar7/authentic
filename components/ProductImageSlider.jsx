"use client";

import { useState } from "react";

export default function ProductImageSlider({ images, name }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
        <img
          src={images[activeIndex]}
          alt={name}
          className="w-full h-full object-cover transition-all duration-300"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`aspect-square w-20 rounded-xl overflow-hidden border transition
                ${
                  activeIndex === i
                    ? "border-black"
                    : "border-transparent opacity-70 hover:opacity-100"
                }
              `}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
