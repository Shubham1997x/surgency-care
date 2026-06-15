import Link from "next/link";
import { prisma } from "@/lib/db";
import { Building2, Stethoscope, ShieldCheck, PhoneCall } from "lucide-react";

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
      <section className="relative flex min-h-[100vh] items-center overflow-hidden md:min-h-[85vh] lg:min-h-[100vh]">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 z-0 h-full w-full object-cover"
        >
          <source src="https://surgencycare.com/wp-content/uploads/2026/03/homehero.mp4" type="video/mp4" />
          {/* Fallback image */}
          <img
            src="https://via.placeholder.com/1920x1080/4E97FD/ffffff?text=Surgency+Care+Doctor"
            alt="Surgency Care - Trusted doctors in Delhi-NCR and Mumbai"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

        {/* Content Container */}
        <div className="container-page relative z-20 flex min-h-[100vh] flex-col justify-center py-16 text-center text-white md:min-h-[85vh] md:py-20">

          <h1 className="heading-display mx-auto mb-6 max-w-5xl text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
            Har Emergency Mein Ek Hi Choice.<br />
            <span className="text-brand-orange">Surgency Care is Always Right.</span>
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
            24/7 Emergency Service • Free Consultation • Insurance & EMI Options<br />
            Verified specialists for Gallbladder Stone Removal, Hernia Repair, Piles, Lipoma, Gynecomastia & more in Delhi-NCR & Mumbai
          </p>

          <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-3 rounded-full bg-brand-orange px-6 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-600 md:text-lg lg:text-xl"
            >
              <IconClock className="h-5 w-5" /> Book Free Consultation Now
            </Link>
            <a
              href="tel:+919780299802"
              className="flex items-center justify-center gap-3 rounded-full border-2 border-white px-6 py-4 text-sm font-semibold text-white transition hover:bg-white hover:text-brand-dark md:text-lg lg:text-xl"
            >
              <IconPhone className="h-5 w-5" /> Call 24/7: +91 97802 99802
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium sm:text-base">
            <div className="flex items-center gap-2">
              <IconCheck className="h-5 w-5 text-brand-teal" /> Highly Qualified Doctors
            </div>
            <div className="flex items-center gap-2">
              <IconCheck className="h-5 w-5 text-brand-teal" /> NABH Accredited Hospitals
            </div>
            <div className="flex items-center gap-2">
              <IconCheck className="h-5 w-5 text-brand-teal" /> Carebuddy Support
            </div>
          </div>

          <p className="mx-auto mt-16 max-w-md text-xs opacity-75">
            *Consultation does not guarantee any specific outcome. Final advice will be given by our specialist after evaluation.
          </p>
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
      {/* Service Icons Marquee */}
      <section className="overflow-hidden bg-white py-20">
        <div className="marquee-track">
          {[...Array(4)].map((_, setIdx) => (
            <div key={setIdx} className="flex shrink-0 items-center gap-16 px-8">
              {[
                { src: "https://surgencycare.com/wp-content/uploads/2026/05/Piles-e1778613479139.png", label: "Piles", href: "/treatments/piles-treatment" },
                { src: "https://surgencycare.com/wp-content/uploads/2026/05/Gall-Bladder-Stone.png", label: "Gall Bladder Stone", href: "/treatments/gallbladder-stone-removal" },
                { src: "https://surgencycare.com/wp-content/uploads/2026/05/Kidney-Stone.png", label: "Kidney Stone", href: "/treatments/kidney-stone-laser-treatment" },
                { src: "https://surgencycare.com/wp-content/uploads/2026/05/Gynecomastia.png", label: "Gynecomastia", href: "/treatments/gynecomastia-surgery" },
                { src: "https://surgencycare.com/wp-content/uploads/2026/05/Lipoma.png", label: "Lipoma", href: "/treatments/lipoma-removal-surgery" },
                { src: "https://surgencycare.com/wp-content/uploads/2026/05/Lasik-e1778614006333.png", label: "Lasik", href: "/treatments/lasik-eye-surgery" },
                { src: "https://surgencycare.com/wp-content/uploads/2026/05/Liposuction.png", label: "Liposuction", href: "/treatments/liposuction-body-contouring" },
                { src: "https://surgencycare.com/wp-content/uploads/2026/05/Hernia.png", label: "Hernia", href: "/treatments/hernia-repair-laparoscopic" },
              ].map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="flex flex-col items-center gap-3 group transition-all duration-300 hover:scale-105"
                >
                  <img src={s.src} alt={s.label} className="h-40 w-40 object-contain sm:h-40 sm:w-40 transition-filter duration-300 group-hover:brightness-105" />
                  <p className="whitespace-nowrap text-sm font-semibold text-brand-dark transition-colors duration-300 group-hover:text-brand-blue">{s.label}</p>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </section>
      {/* Specialties / categories */}
      {categories.length > 0 && (
        <section className="bg-slate-50 py-16">
          <div className="container-page">
            <SectionHeading
              eyebrow="Our Expertise"
              title="Advanced Surgical Treatments"
              subtitle="From routine procedure to advance laproscopic and aesthetic surgeries - all under one trusted platform"
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
      <section className="bg-slate-50/50 py-20">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left side */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="heading-display text-4xl lg:text-5xl text-brand-dark leading-tight">
                Why Patients Trust Surgency Care
              </h2>
              <p className="text-slate-600 leading-relaxed max-w-md">
                We understand that surgery can feel overwhelming. That's why we make the entire journey simple, safe, and supportive.
              </p>
            </div>

            {/* Right side 2x2 Grid */}
            <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
              <div className="card p-8 bg-white flex flex-col items-start gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-dark text-lg">NABH Accredited Hospitals</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                    Only partner with top-rated, government-recognized facilities across Delhi-NCR.
                  </p>
                </div>
              </div>

              <div className="card p-8 bg-white flex flex-col items-start gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-dark text-lg">Verified & Experienced Surgeons</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                    Every doctor is carefully verified with years of specialized experience.
                  </p>
                </div>
              </div>

              <div className="card p-8 bg-white flex flex-col items-start gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-dark text-lg">Affordable & Transparent Pricing</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                    Clear cost estimates. Insurance & EMI support available.
                  </p>
                </div>
              </div>

              <div className="card p-8 bg-white flex flex-col items-start gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal">
                  <PhoneCall className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-dark text-lg">24×7 Personal Support</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                    From first call to full recovery — we're with you at every step.
                  </p>
                </div>
              </div>
            </div>
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
