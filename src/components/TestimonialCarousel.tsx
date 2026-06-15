"use client";

import { useState, useEffect } from "react";
import { Media } from "./Media";
import { IconStethoscope } from "./Icons";

interface Testimonial {
  id: string;
  name: string;
  image: string | null;
  text: string;
  time: string;
  rating: number;
}

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3); // Default to 3 for desktop SSR

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    // Initialize on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (testimonials.length === 0) return null;

  // If items are fewer than or equal to what we can display, render a static grid
  if (testimonials.length <= itemsPerPage) {
    return (
      <div className={`grid gap-6 ${
        itemsPerPage === 1 ? "grid-cols-1" : itemsPerPage === 2 ? "grid-cols-2" : "grid-cols-3"
      }`}>
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </div>
    );
  }

  // Calculate sliding bounds (limit index so we don't slide into empty space)
  const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

  // Auto-adjust index if itemsPerPage changes and index is out of bounds
  if (currentIndex > maxIndex) {
    setCurrentIndex(maxIndex);
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <div className="relative px-4 sm:px-12">
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition hover:bg-slate-50 hover:text-brand-dark z-20"
        aria-label="Previous testimonials"
      >
        ‹
      </button>

      {/* Sliding Track Viewport */}
      <div className="overflow-hidden px-1 -mx-3">
        <div
          className="flex transition-transform duration-500 ease-in-out [--slide-width:100%] sm:[--slide-width:50%] lg:[--slide-width:33.333333%]"
          style={{
            transform: `translate3d(calc(-1 * var(--slide-width) * ${currentIndex}), 0, 0)`,
          } as React.CSSProperties}
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3"
            >
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition hover:bg-slate-50 hover:text-brand-dark z-20"
        aria-label="Next testimonials"
      >
        ›
      </button>

      {/* Indicators */}
      <div className="mt-8 flex justify-center gap-1.5 flex-wrap">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx ? "w-6 bg-brand-teal" : "w-2 bg-slate-200"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <div className="card p-6 flex flex-col justify-between h-full min-h-[220px] shadow-sm border border-slate-100/50">
      <div>
        <div className="flex gap-1 mb-3">
          {Array.from({ length: Math.round(t.rating) }).map((_, i) => (
            <span key={i} className="text-brand-orange text-sm">★</span>
          ))}
        </div>
        <p className="text-sm italic text-slate-600 leading-relaxed line-clamp-4">&ldquo;{t.text}&rdquo;</p>
      </div>
      <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
        {t.image && t.image.trim() !== "" ? (
          <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-slate-100">
            <Media src={t.image} alt={t.name} className="h-full w-full object-cover" />
          </div>
        ) : (
          <div className="h-10 w-10 bg-brand-teal/10 flex items-center justify-center rounded-full text-brand-dark font-bold text-sm">
            {t.name[0]}
          </div>
        )}
        <div>
          <h4 className="font-semibold text-sm text-brand-dark">{t.name}</h4>
          <p className="text-xs text-slate-400">{t.time}</p>
        </div>
      </div>
    </div>
  );
}
