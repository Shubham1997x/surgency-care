"use client";

import { useState, useEffect } from "react";
import { Testimonial } from "@prisma/client";
import { IconStar } from "./Icons";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  const total = testimonials.length;
  const showCarousel = total > 3;

  useEffect(() => {
    if (!showCarousel) return;
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showCarousel]);

  // Adjust startIndex if window resized and startIndex is out of bounds
  const maxIndex = Math.max(0, total - itemsPerView);
  useEffect(() => {
    if (startIndex > maxIndex) {
      setStartIndex(maxIndex);
    }
  }, [itemsPerView, maxIndex, startIndex]);

  const handleNext = () => {
    setStartIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // If 3 or less, display them in a standard responsive grid
  if (!showCarousel) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, idx) => (
          <TestimonialCard key={t.id ?? idx} testimonial={t} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative px-4 md:px-12">
      {/* Testimonials Grid Slider */}
      <div className="overflow-hidden -mx-3">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${startIndex * (100 / itemsPerView)}%)` }}
        >
          {testimonials.map((t, idx) => (
            <div
              key={t.id ?? idx}
              className="w-full flex-shrink-0 md:w-1/2 lg:w-1/3 px-3"
            >
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-[-10px] md:left-0 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 shadow-md text-slate-600 hover:text-brand-blue hover:bg-slate-50 transition z-30"
        aria-label="Previous testimonials"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-[-10px] md:right-0 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 shadow-md text-slate-600 hover:text-brand-blue hover:bg-slate-50 transition z-30"
        aria-label="Next testimonials"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Indicators */}
      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setStartIndex(idx)}
            className={`h-2 w-2 rounded-full transition-all ${
              idx === startIndex ? "w-4 bg-brand-blue" : "bg-slate-200 hover:bg-slate-300"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="card flex flex-col justify-between p-8 bg-white shadow-sm transition-all duration-300 hover:shadow-md h-full min-h-[240px]">
      <div>
        <div className="mb-6 flex items-center gap-3">
          {testimonial.image ? (
            <img src={testimonial.image} alt={testimonial.name} className="h-12 w-12 rounded-full object-cover border-2 border-slate-100" />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500 border-2 border-slate-100">
              {testimonial.name.substring(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-brand-dark">{testimonial.name}</h3>
            <p className="text-xs text-slate-400">{testimonial.time}</p>
          </div>
        </div>
        <div className="mb-4 flex gap-1 text-brand-orange">
          {Array.from({ length: Math.round(testimonial.rating ?? 5) }).map((_, i) => (
            <IconStar key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <p className="text-sm leading-relaxed text-slate-600 italic">
          &ldquo;{testimonial.text}&rdquo;
        </p>
      </div>
    </div>
  );
}
