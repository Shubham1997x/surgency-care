import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Media } from "@/components/Media";
import { CTABand } from "@/components/Sections";
import { parseList, formatINR } from "@/lib/utils";
import { ConsultationForm } from "@/components/ConsultationForm";
import {
  IconStar,
  IconCheck,
  IconHospital,
  IconScalpel,
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

  const specialties = parseList(doctor.specialties);
  const qualifications = parseList(doctor.qualifications);

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient">
        <div className="container-page grid items-center gap-8 py-14 text-white md:grid-cols-[auto_1fr]">
          <div className="relative h-44 w-44 overflow-hidden rounded-2xl ring-4 ring-white/30">
            <Media src={doctor.image} alt={doctor.name} className="h-full w-full" />
          </div>
          <div>
            <div className="mb-2 flex flex-wrap gap-2">
              <span className="badge bg-white/20 text-white">{doctor.primarySpecialty}</span>
              <span className="badge bg-white/20 text-white">{doctor.experienceYears}+ Years Experience</span>
            </div>
            <h1 className="heading-display text-3xl text-white sm:text-4xl">{doctor.name}</h1>
            <p className="mt-1 text-white/85">{doctor.title}</p>
            <div className="mt-4 flex flex-wrap gap-8">
              <div>
                <p className="flex items-center gap-1 text-2xl font-bold">
                  <IconStar className="h-5 w-5 text-brand-orange" /> {doctor.rating}
                </p>
                <p className="text-xs text-white/70">Patient Rating</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{doctor.surgeriesCount.toLocaleString("en-IN")}+</p>
                <p className="text-xs text-white/70">Surgeries Performed</p>
              </div>
              {doctor.hospital && (
                <div>
                  <p className="flex items-center gap-1 text-lg font-semibold">
                    <IconHospital className="h-5 w-5" />
                    <Link href={`/hospitals/${doctor.hospital.slug}`} className="underline-offset-2 hover:underline">
                      {doctor.hospital.name}
                    </Link>
                  </p>
                  <p className="text-xs text-white/70">Practising at</p>
                </div>
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

            <p className="mt-10 rounded-xl bg-amber-50 p-4 text-xs text-amber-800">
              <strong>Important:</strong> Results may vary. Consult a qualified doctor for
              personalised advice. The information provided here is for educational purposes
              only and does not replace professional medical consultation.
            </p>
          </div>

          {/* Booking sidebar */}
          <div className="space-y-5">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-brand-dark">Book an Appointment</h3>
              <p className="mt-1 text-sm text-slate-500">
                Consultation from{" "}
                <span className="font-semibold text-brand-dark">{formatINR(doctor.consultationFee)}</span>
              </p>
              <div className="mt-4">
                <ConsultationForm
                  source={`doctor:${doctor.slug}`}
                  conditionDefault={`Appointment with ${doctor.name}`}
                />
              </div>
            </div>
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-brand-dark">Quick Facts</h3>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-slate-500">Experience</dt><dd className="font-medium">{doctor.experienceYears}+ years</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">Consultation Fee</dt><dd className="font-medium">{formatINR(doctor.consultationFee)}</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">Specialty</dt><dd className="font-medium">{doctor.primarySpecialty}</dd></div>
                {doctor.hospital && (
                  <div className="flex justify-between"><dt className="text-slate-500">Hospital</dt><dd className="font-medium text-right">{doctor.hospital.name}</dd></div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title={`Ready to meet ${doctor.name}?`}
        subtitle="Our team will help you schedule a convenient appointment and guide you through every step."
        buttonLabel="Book Consultation Now"
      />
    </>
  );
}
