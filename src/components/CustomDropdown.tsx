"use client";

import { useState, useRef, useEffect } from "react";

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  className?: string;
}

export function CustomDropdown({
  value,
  onChange,
  options,
  placeholder,
  className = "",
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-full border border-slate-200 bg-white py-3.5 pl-6 pr-5 text-sm text-slate-800 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 cursor-pointer text-left"
      >
        <span className="truncate pr-2 font-medium">
          {value || placeholder}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-2xl border border-slate-100 bg-white p-2 shadow-lg scrollbar-thin">
          <button
            type="button"
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
            className={`w-full text-left rounded-xl px-4 py-2.5 text-sm transition-colors duration-150 ${
              value === ""
                ? "bg-brand-blue/10 text-brand-blue font-semibold"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            {placeholder}
          </button>
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className={`w-full text-left rounded-xl px-4 py-2.5 text-sm transition-colors duration-150 truncate ${
                value === opt
                  ? "bg-brand-blue/10 text-brand-blue font-semibold"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
              title={opt}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
