import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Media } from "@/components/Media";
import { CTABand } from "@/components/Sections";
import { getImageSettings } from "@/lib/settings";
import { parseList, formatINR } from "@/lib/utils";
import { ConsultationForm } from "@/components/ConsultationForm";
import { TreatmentCard, BlogCard } from "@/components/Cards";
import {
  IconStar,
  IconCheck,
  IconHospital,
  IconScalpel,
  IconCalendar,
} from "@/components/Icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doctor = await prisma.doctor.findUnique({ where: { slug } });
  return { title: doctor ? doctor.name : "Doctor" };
}

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = await prisma.doctor.findUnique({
    where: { slug },
    include: { hospital: true },
  });
  if (!doctor) notFound();

  const treatments = await prisma.treatment.findMany({
    select: { name: true, slug: true },
    orderBy: { name: "asc" },
  });

  // Tagged blogs + related treatments
  const [doctorBlogs, allTreatments] = await Promise.all([
    prisma.blog.findMany({
      where: { doctorId: doctor.id },
      orderBy: { publishedAt: "desc" },
    }),
    prisma.treatment.findMany({ include: { category: true } }),
  ]);

  const specialties = parseList(doctor.specialties);
  const qualifications = parseList(doctor.qualifications);

  const keywords = [doctor.primarySpecialty, ...specialties]
    .map((s) => s.toLowerCase().trim())
    .filter(Boolean);

  const relatedTreatments = allTreatments
    .filter((t) =>
      keywords.some(
        (k) =>
          t.name.toLowerCase().includes(k) ||
          (t.category?.name ?? "").toLowerCase().includes(k) ||
          k.includes((t.category?.name ?? "").toLowerCase())
      )
    )
    .slice(0, 3);

  const settings = getImageSettings();
  const docSetting = settings.doctor;

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient py-16 md:py-20 relative overflow-hidden">
        <div className="container-page grid gap-10 text-white md:grid-cols-[auto_1fr] items-center">
          <div className="flex justify-center md:justify-start">
            <div className="relative w-72 overflow-hidden rounded-[2rem] shadow-2xl shadow-teal-950/45 ring-4 ring-white/10 transition-transform duration-300 hover:scale-[1.01]">
              <div className={`relative w-full ${docSetting.aspectRatio} overflow-hidden`}>
                <Media src={doctor.image} alt={doctor.name} className={`h-full w-full ${docSetting.aspectRatio}`} />
              </div>
              {/* Verified Badge */}
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-800 shadow-md">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Verified
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <div className="mb-4 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-1 text-xs font-semibold text-white backdrop-blur-md">
                {qualifications[0] || doctor.primarySpecialty}
              </span>
              <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-1 text-xs font-semibold text-white backdrop-blur-md">
                {doctor.experienceYears}+ Years Experience
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight font-serif">
              {doctor.name}
            </h1>
            <p className="mt-2 text-lg text-white/90 font-medium">
              {doctor.title}
            </p>

            <div className="mt-6 flex flex-wrap gap-8 items-center border-t border-b border-white/10 py-5 w-full max-w-lg">
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-white">{doctor.rating}</span>
                <span className="text-xs text-white/70 mt-1">Patient Rating ({100 + Math.round(doctor.rating * 5)} reviews)</span>
              </div>
              <div className="hidden sm:block h-10 w-[1px] bg-white/20" />
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-white">{doctor.surgeriesCount.toLocaleString("en-IN")}+</span>
                <span className="text-xs text-white/70 mt-1">Surgeries Performed</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#appointment-form"
                className="inline-flex items-center justify-center rounded-full bg-brand-orange px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-600 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10"
              >
                <IconCalendar className="mr-2 h-4.5 w-4.5" /> Book Appointment
              </Link>
              {doctor.hospital && (
                <Link
                  href={`/hospitals/${doctor.hospital.slug}`}
                  className="inline-flex items-center justify-center rounded-full border border-white px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
                >
                  View at {doctor.hospital.name}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[1.7fr_1fr]">
          <div>
            <h2 className="heading-display text-2xl">About {doctor.name}</h2>
            <p className="mt-4 whitespace-pre-line text-slate-600">{doctor.about}</p>

            {specialties.length > 0 && (
              <>
                <h3 className="mt-10 text-lg font-semibold text-brand-dark">Specialties</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {specialties.map((s) => (
                    <div key={s} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                      <IconScalpel className="h-5 w-5 text-brand-teal" />
                      <span className="text-sm text-slate-700">{s}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {qualifications.length > 0 && (
              <>
                <h3 className="mt-10 text-lg font-semibold text-brand-dark">Qualifications & Experience</h3>
                <ul className="mt-4 space-y-3">
                  {qualifications.map((q) => (
                    <li key={q} className="flex items-start gap-3 text-sm text-slate-700">
                      <IconCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-teal" />
                      {q}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Quick Facts */}
            <div className="mt-10 rounded-xl bg-slate-50 p-5 border border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Quick Facts</h3>
              <dl className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                <div className="flex justify-between border-b border-slate-200/50 pb-2 sm:border-0 sm:pb-0"><dt className="text-slate-500">Experience</dt><dd className="font-semibold text-brand-dark">{doctor.experienceYears}+ years</dd></div>
                <div className="flex justify-between border-b border-slate-200/50 pb-2 sm:border-0 sm:pb-0"><dt className="text-slate-500">Consultation Fee</dt><dd className="font-semibold text-brand-dark">{formatINR(doctor.consultationFee)}</dd></div>
                <div className="flex justify-between border-b border-slate-200/50 pb-2 sm:border-0 sm:pb-0"><dt className="text-slate-500">Specialty</dt><dd className="font-semibold text-brand-dark">{doctor.primarySpecialty}</dd></div>
                {doctor.hospital && (
                  <div className="flex justify-between"><dt className="text-slate-500">Hospital</dt><dd className="font-semibold text-brand-dark text-right">{doctor.hospital.name}</dd></div>
                )}
              </dl>
            </div>

          </div>

          {/* Booking sidebar */}
          <div className="space-y-5">
            <div id="appointment-form" className="card p-6 scroll-mt-24">
              <h3 className="text-lg font-semibold text-brand-dark">Book an Appointment</h3>
              <p className="mt-1 text-sm text-slate-500">
                Consultation from{" "}
                <span className="font-semibold text-brand-dark">{formatINR(doctor.consultationFee)}</span>
              </p>
              <div className="mt-4">
                <ConsultationForm
                  source={`doctor:${doctor.slug}`}
                  conditionDefault={`Appointment with ${doctor.name}`}
                  treatments={treatments}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related treatments */}
      {relatedTreatments.length > 0 && (
        <section className="py-14 bg-white border-t border-slate-100">
          <div className="container-page">
            <h2 className="heading-display text-2xl">Treatments by This Specialist</h2>
            <p className="mt-2 text-slate-500">
              Surgical procedures {doctor.name} specialises in.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTreatments.map((t) => (
                <TreatmentCard key={t.id} treatment={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tagged blogs */}
      {doctorBlogs.length > 0 && (
        <section className="py-14 bg-slate-50">
          <div className="container-page">
            <h2 className="heading-display text-2xl">Articles by {doctor.name}</h2>
            <p className="mt-2 text-slate-500">
              Health insights and guidance authored by this specialist.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {doctorBlogs.map((b) => (
                <BlogCard key={b.id} blog={b} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand
        title={`Ready to meet ${doctor.name}?`}
        subtitle="Our team will help you schedule a convenient appointment and guide you through every step."
        buttonLabel="Book Consultation Now"
      />
    </>
  );
}
