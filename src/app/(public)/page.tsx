import Link from "next/link";
import { prisma } from "@/lib/db";

// Home aggregates featured content from every entity, so always render fresh
// to reflect dashboard edits immediately.
export const dynamic = "force-dynamic";
import { SectionHeading, CTABand } from "@/components/Sections";
import { DoctorCard, HospitalCard, CategoryCard, BlogCard } from "@/components/Cards";
import {
  IconPhone,
  IconSearch,
  IconCheck,
  IconShield,
  IconClock,
  IconStar,
  IconUsers,
} from "@/components/Icons";

const stats = [
  { value: "36+", label: "Surgical Specialties" },
  { value: "382+", label: "Verified Surgeons" },
  { value: "54+", label: "Partner Hospitals" },
  { value: "24/7", label: "Care Support" },
];

const steps = [
  {
    n: "01",
    title: "Connect with Us",
    desc: "Share your condition and we'll understand your needs in a free, no-obligation consultation.",
  },
  {
    n: "02",
    title: "Meet the Specialist",
    desc: "We match you with verified surgeons and accredited hospitals best suited to your treatment.",
  },
  {
    n: "03",
    title: "Smooth Surgery Journey",
    desc: "From appointment to recovery, our care team supports you at every single step.",
  },
];

const whyUs = [
  {
    icon: IconShield,
    title: "Verified & Experienced",
    desc: "Every surgeon is carefully vetted for qualifications, experience and patient outcomes.",
  },
  {
    icon: IconUsers,
    title: "Dedicated Care Team",
    desc: "A personal care coordinator guides you through every step of your surgical journey.",
  },
  {
    icon: IconStar,
    title: "Transparent Pricing",
    desc: "Upfront, honest cost estimates with EMI support and no hidden charges.",
  },
];

const testimonials = [
  {
    name: "Anjali Mehta",
    text: "From my first call to recovery, the team was with me. The surgeon they recommended was excellent and the pricing was completely transparent.",
    city: "Delhi",
  },
  {
    name: "Rohit Sharma",
    text: "I was nervous about my gallbladder surgery. Surgency Care found me a great hospital nearby and handled everything smoothly.",
    city: "Ghaziabad",
  },
  {
    name: "Pooja Verma",
    text: "Genuinely caring people. They answered all my questions patiently and never pushed me. Highly recommend their service.",
    city: "Noida",
  },
];

export default async function HomePage() {
  const [categories, doctors, hospitals, blogs] = await Promise.all([
    prisma.treatmentCategory.findMany({ orderBy: { createdAt: "asc" }, take: 8 }),
    prisma.doctor.findMany({
      where: { featured: true },
      include: { hospital: true },
      take: 3,
      orderBy: { createdAt: "asc" },
    }),
    prisma.hospital.findMany({ orderBy: { rating: "desc" }, take: 3 }),
    prisma.blog.findMany({ orderBy: { publishedAt: "desc" }, take: 3 }),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_60%,white,transparent_35%)]" />
        <div className="container-page relative py-20 text-center text-white sm:py-28">
          <span className="mb-5 inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide">
            Trusted Surgical Care
          </span>
          <h1 className="heading-display mx-auto max-w-3xl text-4xl text-white sm:text-5xl">
            Har Emergency Mein Ek Hi Choice.
            <span className="block text-brand-orange">Surgency Care is Always Right.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/85">
            We connect patients with verified surgeons and NABH-accredited hospitals
            for safe, affordable and compassionate surgical care across India.
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-lg sm:flex-row">
            <div className="flex flex-1 items-center gap-2 px-3">
              <IconSearch className="h-5 w-5 text-slate-400" />
              <input
                placeholder="Search by doctor, hospital or treatment…"
                className="h-11 w-full bg-transparent text-sm text-slate-700 outline-none"
              />
            </div>
            <Link href="/doctors" className="btn-blue h-11">
              Search
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary">
              <IconPhone className="h-4 w-4" /> Book Free Consultation
            </Link>
            <Link href="/treatments" className="btn-outline">
              Explore Treatments
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-100 bg-white">
        <div className="container-page grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-3xl font-bold text-brand-dark">{s.value}</p>
              <p className="mt-1 text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Specialties / categories */}
      {categories.length > 0 && (
        <section className="bg-slate-50 py-16">
          <div className="container-page">
            <SectionHeading
              eyebrow="Specialties"
              title="Surgical Care, Every Specialty"
              subtitle="Browse our most-requested surgical categories and find the right care."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categories.slice(0, 6).map((c) => (
                <CategoryCard key={c.id} category={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Simple Process"
            title="How Surgency Care Works"
            subtitle="A guided, stress-free path from your first question to a full recovery."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="card p-7">
                <span className="font-serif text-4xl font-bold text-brand-teal/30">{s.n}</span>
                <h3 className="mt-3 text-lg font-semibold text-brand-dark">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured doctors */}
      {doctors.length > 0 && (
        <section className="bg-slate-50 py-16">
          <div className="container-page">
            <div className="flex items-end justify-between">
              <SectionHeading
                center={false}
                eyebrow="Our Experts"
                title="Meet Verified Surgeons"
              />
              <Link href="/doctors" className="hidden text-sm font-semibold text-brand-blue sm:inline">
                View all doctors →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {doctors.map((d) => (
                <DoctorCard key={d.id} doctor={d} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured hospitals */}
      {hospitals.length > 0 && (
        <section className="py-16">
          <div className="container-page">
            <div className="flex items-end justify-between">
              <SectionHeading
                center={false}
                eyebrow="Our Network"
                title="Accredited Hospitals"
              />
              <Link href="/hospitals" className="hidden text-sm font-semibold text-brand-blue sm:inline">
                View all hospitals →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {hospitals.map((h) => (
                <HospitalCard key={h.id} hospital={h} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why choose us */}
      <section className="bg-slate-50 py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why Surgency Care"
            title="Why Patients Choose Us"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {whyUs.map((w) => (
              <div key={w.title} className="card p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-dark">
                  <w.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-brand-dark">{w.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container-page">
          <SectionHeading eyebrow="Our Patients" title="Stories of Trust & Recovery" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="card p-7">
                <div className="mb-3 flex gap-1 text-brand-orange">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} className="h-4 w-4" />
                  ))}
                </div>
                <p className="text-sm text-slate-600">“{t.text}”</p>
                <p className="mt-4 text-sm font-semibold text-brand-dark">
                  {t.name} <span className="font-normal text-slate-400">• {t.city}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest blogs */}
      {blogs.length > 0 && (
        <section className="bg-slate-50 py-16">
          <div className="container-page">
            <div className="flex items-end justify-between">
              <SectionHeading center={false} eyebrow="Health Insights" title="From Our Blog" />
              <Link href="/blogs" className="hidden text-sm font-semibold text-brand-blue sm:inline">
                Read all articles →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {blogs.map((b) => (
                <BlogCard key={b.id} blog={b} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand
        title="Not sure where to start?"
        subtitle="Tell us about your condition and our care team will recommend the right surgeon and hospital for you — completely free."
      />
    </>
  );
}
