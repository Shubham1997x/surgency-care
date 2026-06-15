import Link from "next/link";
import { LogoWhite } from "./Logo";

const cols = [
  {
    title: "Explore",
    links: [
      { href: "/treatments", label: "Treatments" },
      { href: "/doctors", label: "Doctors" },
      { href: "/hospitals", label: "Hospitals" },
      { href: "/blogs", label: "Blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact Us" },
      { href: "/faqs", label: "FAQs" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <LogoWhite />
          <p className="mt-4 max-w-xs text-sm text-white/70">
            Connecting patients with verified surgeons, accredited hospitals and
            affordable surgical care across India.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/90">
              {c.title}
            </h4>
            <ul className="space-y-2.5">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 transition hover:text-brand-teal"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Surgency Care. All rights reserved.</p>
          <p>Making quality surgical care accessible and stress-free across India.</p>
        </div>
      </div>
    </footer>
  );
}
