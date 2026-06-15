import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { CTABand } from "@/components/Sections";
import { parseList, formatRange } from "@/lib/utils";
import { IconCheck, IconArrow } from "@/components/Icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const treatment = await prisma.treatment.findUnique({ where: { slug } });
  return { title: treatment ? treatment.name : "Treatment" };
}

export default async function TreatmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const treatment = await prisma.treatment.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!treatment) notFound();

  const symptoms = parseList(treatment.symptoms);
  const steps = parseList(treatment.procedureSteps);
  const benefits = parseList(treatment.benefits);
  const aftercare = parseList(treatment.aftercare);

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient">
        <div className="container-page py-14 text-white">
          {treatment.category && (
            <Link
              href={`/treatments/category/${treatment.category.slug}`}
              className="badge mb-3 bg-white/20 text-white"
            >
              {treatment.category.name}
            </Link>
          )}
          <h1 className="heading-display max-w-3xl text-3xl text-white sm:text-4xl">
            {treatment.name}
          </h1>
          {treatment.tagline && (
            <p className="mt-2 text-brand-orange">{treatment.tagline}</p>
          )}
          <p className="mt-4 max-w-2xl text-white/85">{treatment.heroDesc || treatment.shortDesc}</p>
          <Link href="/contact" className="btn-primary mt-7">Book Free Consultation</Link>
        </div>
      </section>

      <section className="py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[1.7fr_1fr]">
          <div className="space-y-12">
            {symptoms.length > 0 && (
              <div>
                <h2 className="heading-display text-2xl">Common Symptoms</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {symptoms.map((s) => (
                    <div key={s} className="flex items-start gap-3 rounded-xl bg-amber-50 p-3 text-sm text-slate-700">
                      <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-orange" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {steps.length > 0 && (
              <div>
                <h2 className="heading-display text-2xl">How the Procedure Works</h2>
                <ol className="mt-4 space-y-4">
                  {steps.map((s, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-teal/10 text-sm font-bold text-brand-dark">
                        {i + 1}
                      </span>
                      <p className="text-sm text-slate-600">{s}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {benefits.length > 0 && (
              <div>
                <h2 className="heading-display text-2xl">Benefits of This Procedure</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {benefits.map((b) => (
                    <div key={b} className="flex items-start gap-3 text-sm text-slate-700">
                      <IconCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-teal" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {aftercare.length > 0 && (
              <div>
                <h2 className="heading-display text-2xl">Recovery & Aftercare</h2>
                <ul className="mt-4 space-y-3 rounded-xl bg-slate-50 p-5">
                  {aftercare.map((a) => (
                    <li key={a} className="flex items-start gap-3 text-sm text-slate-700">
                      <IconArrow className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-blue" />
                      {a}
                    </li>
                  ))}
                </ul>
                {treatment.recoveryNote && (
                  <p className="mt-3 text-sm text-slate-500">{treatment.recoveryNote}</p>
                )}
              </div>
            )}
          </div>

          {/* Cost sidebar */}
          <div className="space-y-5">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-brand-dark">Approximate Cost in Delhi-NCR</h3>
              <p className="mt-3 text-2xl font-bold text-brand-dark">
                {formatRange(treatment.costMin, treatment.costMax)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Final cost depends on hospital, surgeon and insurance coverage.
              </p>
              <Link href="/contact" className="btn-blue mt-5 w-full">Book Free Consultation</Link>
              <p className="mt-3 text-center text-xs text-slate-400">EMI & cashless insurance options available.</p>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title={`Suffering from symptoms related to ${treatment.name}?`}
        subtitle="Don't wait for complications. Get expert advice and a clear treatment plan today."
        buttonLabel="Book Your Free Consult Now"
      />
    </>
  );
}
