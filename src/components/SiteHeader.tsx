"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { IconPhone } from "@/components/Icons";

const nav = [
  { href: "/", label: "Home" },
  { href: "/doctors", label: "Doctors" },
  { href: "/hospitals", label: "Hospitals" },
  { href: "/about", label: "About" },
  { href: "/treatments", label: "Treatments" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-slate-600 transition hover:text-brand-dark"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="tel:+919780299802" className="hidden xl:flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-dark transition-colors mr-2">
            <IconPhone className="h-5 w-5 text-brand-blue" fill="currentColor" stroke="none" />
            +91 97802 99802
          </a>
          <Link href="/contact" className="btn-blue hidden sm:inline-flex">
            Book Free Consultation
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-brand-dark md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M6 18 18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <nav className="container-page flex flex-col py-3">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-slate-700"
              >
                {n.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-blue mt-2 w-full">
              Book Free Consultation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
