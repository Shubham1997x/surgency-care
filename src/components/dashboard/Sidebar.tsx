"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";

const links = [
  { href: "/dashboard", label: "Overview", exact: true },
  { href: "/dashboard/doctors", label: "Doctors" },
  { href: "/dashboard/hospitals", label: "Hospitals" },
  { href: "/dashboard/categories", label: "Treatment Categories" },
  { href: "/dashboard/treatments", label: "Treatments" },
  { href: "/dashboard/blogs", label: "Blogs" },
  { href: "/dashboard/leads", label: "Leads" },
  { href: "/dashboard/testimonials", label: "Testimonials" },
  { href: "/dashboard/settings", label: "Image Settings" },
];

export function Sidebar({ email }: { email: string }) {
  const pathname = usePathname();
  return (
    <aside className="flex w-60 flex-shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-5 py-5">
        <Link href="/dashboard" className="font-serif text-lg font-bold text-brand-dark">
          Surgency <span className="text-brand-orange">Admin</span>
        </Link>
        <p className="mt-1 truncate text-xs text-slate-400">{email}</p>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {links.map((l) => {
          const active = l.exact ? pathname === l.href : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-brand-teal/10 text-brand-dark"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-slate-100 p-3">
        <Link href="/" className="block rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50">
          ← View website
        </Link>
        <form action={logout}>
          <button className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
