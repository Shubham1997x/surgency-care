import Link from "next/link";
import { IconPhone } from "./Icons";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden hero-gradient">
      <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_15%_20%,white,transparent_40%),radial-gradient(circle_at_85%_70%,white,transparent_35%)]" />
      <div className="container-page relative py-16 text-center text-white sm:py-20">
        {eyebrow && (
          <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide">
            {eyebrow}
          </span>
        )}
        <h1 className="heading-display mx-auto max-w-3xl text-4xl text-white sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-white/85">{subtitle}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className={center ? "section-eyebrow" : "mb-3 inline-block rounded-full bg-brand-teal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-dark"}>
          {eyebrow}
        </span>
      )}
      <h2 className="heading-display text-3xl sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-slate-500">{subtitle}</p>}
    </div>
  );
}

export function CTABand({
  title,
  subtitle,
  buttonLabel = "Book Free Consultation",
  href = "/contact",
}: {
  title: string;
  subtitle?: string;
  buttonLabel?: string;
  href?: string;
}) {
  return (
    <section className="hero-gradient-dark">
      <div className="container-page py-16 text-center text-white">
        <h2 className="heading-display text-2xl text-white sm:text-3xl">{title}</h2>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-xl text-white/80">{subtitle}</p>
        )}
        <Link href={href} className="btn-primary mt-7">
          <IconPhone className="h-4 w-4" />
          {buttonLabel}
        </Link>
        <p className="mt-4 text-xs text-white/50">
          100% free • No obligation • Your information stays private.
        </p>
      </div>
    </section>
  );
}
