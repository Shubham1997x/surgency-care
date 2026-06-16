"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function Accordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  // Allow multiple panels to be open simultaneously
  const [openStates, setOpenStates] = useState<Record<number, boolean>>({
    0: true, // open the first one by default
  });

  const toggle = (i: number) => {
    setOpenStates((prev) => ({
      ...prev,
      [i]: !prev[i],
    }));
  };

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const isOpen = !!openStates[i];
        return (
          <div
            key={i}
            className="bg-white border border-slate-100/80 rounded-2xl md:rounded-3xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            <button
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 md:px-8 md:py-6 text-left"
            >
              <span className="font-bold text-brand-dark text-sm sm:text-base md:text-lg transition-colors hover:text-brand-teal">
                {item.q}
              </span>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-brand-teal transition-colors hover:bg-brand-teal/10">
                {isOpen ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[500px] border-t border-slate-50/50" : "max-h-0 overflow-hidden"
              }`}
            >
              <div className="px-6 pb-6 pt-2 md:px-8 md:pb-8 text-xs sm:text-sm leading-relaxed text-slate-600 whitespace-pre-line">
                {item.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
