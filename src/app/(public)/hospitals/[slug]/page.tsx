import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Media } from "@/components/Media";
import { CTABand } from "@/components/Sections";
import { DoctorCard } from "@/components/Cards";
import { parseList } from "@/lib/utils";
import { IconCheck, IconBed, IconHospital, IconClock, IconStar } from "@/components/Icons";

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

  const whyChoose = parseList<{ title: string; description: string }>(hospital.whyChoose);
  const specialties = parseList(hospital.specialties);

  const facts = [
    { icon: IconBed, value: `${hospital.beds}+`, label: "Beds" },
    { icon: IconHospital, value: hospital.modularOTs, label: "Modular OTs" },
    { icon: IconClock, value: "24×7", label: "Emergency & ICU" },
    { icon: IconStar, value: hospital.rating, label: "Patient Rating" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient">
        <div className="container-page grid items-center gap-8 py-14 text-white md:grid-cols-2">
          <div>
            <span className="badge mb-3 bg-white/20 text-white">{hospital.accreditation}</span>
            <h1 className="heading-display text-3xl text-white sm:text-4xl">{hospital.name}</h1>
            <p className="mt-2 text-brand-orange">{hospital.location}</p>
            <p className="mt-4 max-w-md text-white/85">
              A trusted multi-specialty hospital equipped with advanced modular operation
              theatres and experienced surgical teams for general, laparoscopic and aesthetic procedures.
            </p>
          </div>
          <div className="relative h-56 overflow-hidden rounded-2xl ring-4 ring-white/20 md:h-64">
            <Media src={hospital.image} alt={hospital.name} className="h-full w-full" />
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="border-b border-slate-100 bg-white">
        <div className="container-page grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-dark">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-brand-dark">{f.value}</p>
                <p className="text-xs text-slate-500">{f.label}</p>
              </div>
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
        <section className="bg-slate-50 py-14">
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

      <CTABand
        title={`Ready for treatment at ${hospital.name}?`}
        subtitle="Our team will help you book an appointment with the right surgeon and guide you through the process."
        buttonLabel="Book Free Consultation Today"
      />
    </>
  );
}
