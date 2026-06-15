"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function HospitalSlideshow({
  imageString,
  alt,
  objectFit = "object-cover",
}: {
  imageString?: string | null;
  alt: string;
  objectFit?: string;
}) {
  const images = imageString
    ? imageString
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // changes every 4 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-brand-gradient text-white">
        <span className="font-serif text-2xl font-bold opacity-90">
          {alt.slice(0, 2).toUpperCase()}
        </span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <Image
        src={images[0]}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={objectFit}
        priority
      />
    );
  }

  return (
    <div className="relative h-full w-full group overflow-hidden">
      {images.map((img, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={idx}
            className="absolute inset-0"
            style={{
              opacity: isActive ? 1 : 0,
              transition: "opacity 1000ms ease-in-out",
              pointerEvents: isActive ? "auto" : "none",
            }}
          >
            <Image
              src={img}
              alt={`${alt} - View ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={objectFit}
              priority={idx === 0}
            />
          </div>
        );
      })}

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full bg-black/30 px-3 py-1.5 backdrop-blur-sm">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 w-2 rounded-full transition-all ${
              idx === currentIndex ? "w-4 bg-white" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
