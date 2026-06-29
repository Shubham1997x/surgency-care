import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Media } from "@/components/Media";
import { HospitalSlideshow } from "@/components/HospitalSlideshow";
import { CTABand } from "@/components/Sections";
import { getImageSettings } from "@/lib/settings";
import { DoctorCard, TreatmentCard, BlogCard } from "@/components/Cards";
import { parseList } from "@/lib/utils";
import { IconCheck, IconBed, IconHospital, IconClock, IconStar, IconPhone } from "@/components/Icons";
import { AnimatedNumber } from "@/components/AnimatedNumber";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hospital = await prisma.hospital.findUnique({ where: { slug } });
  return { title: hospital ? hospital.name : "Hospital" };
}

export default async function HospitalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hospital = await prisma.hospital.findUnique({
    where: { slug },
    include: { doctors: { include: { hospital: true } } },
  });
  if (!hospital) notFound();

  // Tagged blogs + related treatments
  const [hospitalBlogs, allTreatments, allBlogs] = await Promise.all([
    prisma.blog.findMany({
      where: { hospitalId: hospital.id },
      orderBy: { publishedAt: "desc" },
    }),
    prisma.treatment.findMany({ include: { category: true } }),
    prisma.blog.findMany({ orderBy: { publishedAt: "desc" }, take: 50 }),
  ]);

  const whyChoose = parseList<{ title: string; description: string }>(hospital.whyChoose);
  const specialties = parseList(hospital.specialties);

  const hospKeywords = specialties.map((s) => s.toLowerCase().trim()).filter(Boolean);
  const relatedTreatments = allTreatments
    .filter((t) =>
      hospKeywords.some(
        (k) =>
          t.name.toLowerCase().includes(k) ||
          (t.category?.name ?? "").toLowerCase().includes(k) ||
          k.includes((t.category?.name ?? "").toLowerCase())
      )
    )
    .slice(0, 6);

  // Use directly-tagged blogs first; fall back to specialty-keyword matched blogs
  const displayBlogs =
    hospitalBlogs.length > 0
      ? hospitalBlogs
      : allBlogs
          .filter((b) =>
            hospKeywords.some(
              (k) =>
                b.category.toLowerCase().includes(k) ||
                b.title.toLowerCase().includes(k) ||
                k.includes(b.category.toLowerCase())
            )
          )
          .slice(0, 3);

  const facts = [
    { value: `${hospital.beds}+`, label: "Beds", colorClass: "text-[#0ED3B0]" },
    { value: hospital.modularOTs, label: "Modular OTs", colorClass: "text-[#4E97FD]" },
    { value: "24×7", label: "Emergency & ICU", colorClass: "text-[#FF9700]" },
    { value: hospital.rating, label: "Patient Rating", colorClass: "text-[#0E606E]" },
  ];

  const settings = getImageSettings();
  const hospSetting = settings.hospital;

  return (
    <>
      {/* Breadcrumbs */}
      <div className="container-page py-4 text-xs font-semibold text-slate-500">
        <Link href="/hospitals" className="hover:text-brand-dark transition-colors">
          Hospitals
        </Link>
        <span className="mx-2 text-slate-400">›</span>
        <span className="text-slate-700">
          {hospital.name}, {hospital.location}
        </span>
      </div>

      {/* Hero */}
      <section className="hero-gradient">
        <div className="container-page grid items-center gap-10 py-14 text-white md:grid-cols-2">
          <div className="flex flex-col items-start">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm border border-white/10 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orange"></span>
              {hospital.accreditation} • Since 2012
            </span>
            <h1 className="font-serif text-5xl font-bold leading-tight text-white sm:text-6xl">
              {hospital.name}
              <span className="block text-brand-orange mt-1 font-sans font-extrabold">{hospital.location}</span>
            </h1>
            <p className="mt-6 max-w-md text-white/85 text-base leading-relaxed">
              A trusted multi-speciality hospital equipped with
              advanced modular operation theatres and
              experienced surgical teams for general, laparoscopic,
              and aesthetic procedures.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#cta-booking"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#0E606E] shadow-lg transition hover:bg-white/95 hover:scale-[1.02]"
              >
                <IconPhone className="h-4 w-4 text-[#0E606E] stroke-[3px]" />
                Book Appointment at This Hospital
              </a>
              <a
                href="#expert-surgeons"
                className="inline-flex items-center gap-2 rounded-full border border-white px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10 hover:scale-[1.02]"
              >
                View All Doctors
              </a>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl ring-4 ring-white/10 transition-transform duration-300 hover:scale-[1.01]">
            <div className={`relative w-full overflow-hidden ${hospSetting.aspectRatio}`}>
              <HospitalSlideshow imageString={hospital.image} alt={hospital.name} objectFit={hospSetting.objectFit} />
            </div>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="border-b border-slate-100 bg-white py-8">
        <div className="container-page grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col items-center justify-center">
              <span className={`font-serif text-4xl font-bold ${f.colorClass}`}>
                <AnimatedNumber value={f.value} />
              </span>
              <span className="mt-2 text-sm font-semibold text-slate-500">
                {f.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="heading-display text-2xl">About {hospital.name}</h2>
            <p className="mt-4 whitespace-pre-line text-slate-600">{hospital.about}</p>

            {specialties.length > 0 && (
              <>
                <h3 className="mt-10 text-lg font-semibold text-brand-dark">Specialties Available</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {specialties.map((s) => (
                    <span key={s} className="badge bg-slate-100 text-slate-700">{s}</span>
                  ))}
                </div>
              </>
            )}
          </div>

          {whyChoose.length > 0 && (
            <div className="card h-fit p-6">
              <h3 className="text-lg font-semibold text-brand-dark">Why Patients Choose This Hospital</h3>
              <ul className="mt-4 space-y-4">
                {whyChoose.map((w) => (
                  <li key={w.title} className="flex items-start gap-3">
                    <IconCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-teal" />
                    <div>
                      <p className="text-sm font-semibold text-brand-dark">{w.title}</p>
                      <p className="text-sm text-slate-500">{w.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Doctors at this hospital */}
      {hospital.doctors.length > 0 && (
        <section id="expert-surgeons" className="bg-slate-50 py-14 scroll-mt-6">
          <div className="container-page">
            <h2 className="heading-display text-2xl">Our Expert Surgeons Here</h2>
            <p className="mt-2 text-slate-500">
              Highly experienced doctors who regularly operate at this hospital.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {hospital.doctors.map((d) => (
                <DoctorCard key={d.id} doctor={d} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related treatments */}
      {relatedTreatments.length > 0 && (
        <section className="py-14 bg-white border-t border-slate-100">
          <div className="container-page">
            <h2 className="heading-display text-2xl">Treatments Available at This Hospital</h2>
            <p className="mt-2 text-slate-500">
              Surgical procedures our team specialises in at {hospital.name}.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTreatments.map((t) => (
                <TreatmentCard key={t.id} treatment={t} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/treatments" className="text-sm font-semibold text-brand-blue hover:underline">
                View all treatments →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Blogs */}
      {displayBlogs.length > 0 && (
        <section className="py-14 bg-slate-50">
          <div className="container-page">
            <h2 className="heading-display text-2xl">
              {hospitalBlogs.length > 0
                ? `Articles from ${hospital.name}`
                : "Related Health Articles"}
            </h2>
            <p className="mt-2 text-slate-500">
              {hospitalBlogs.length > 0
                ? "Health insights and updates from our team at this hospital."
                : `Useful reading on treatments and procedures available at ${hospital.name}.`}
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayBlogs.map((b) => (
                <BlogCard key={b.id} blog={b} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/blogs" className="text-sm font-semibold text-brand-blue hover:underline">
                Browse all articles →
              </Link>
            </div>
          </div>
        </section>
      )}

      <div id="cta-booking" className="scroll-mt-6">
        <CTABand
          title={`Ready for treatment at ${hospital.name}?`}
          subtitle="Our team will help you book an appointment with the right surgeon and guide you through the process."
          buttonLabel="Book Free Consultation Today"
        />
      </div>
    </>
  );
}
