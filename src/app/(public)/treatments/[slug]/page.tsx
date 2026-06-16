import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { CTABand } from "@/components/Sections";
import { parseList, formatRange } from "@/lib/utils";
import { IconCheck, IconArrow, IconStar } from "@/components/Icons";
import { Media } from "@/components/Media";
import { getImageSettings } from "@/lib/settings";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";

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
    include: { category: true, testimonials: true },
  });
  if (!treatment) notFound();

  const symptoms = parseList(treatment.symptoms);
  const steps = parseList(treatment.procedureSteps);
  const benefits = parseList(treatment.benefits);
  const aftercare = parseList(treatment.aftercare);

  const conditionName = treatment.conditionName || treatment.name;

  const settings = getImageSettings();
  const treatSetting = settings.treatment;

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden py-16 md:py-24">
        <div className={`container-page grid items-center gap-10 text-white ${treatment.image ? "lg:grid-cols-[1.2fr_1fr]" : ""}`}>
          <div className="flex flex-col items-start">
            {treatment.category && (
              <Link
                href={`/treatments/category/${treatment.category.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-md transition-all hover:bg-white/25 mb-6"
              >
                {treatment.category.name} Procedure
              </Link>
            )}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-serif">
              {treatment.name}
              {treatment.tagline && (
                <span className="block mt-4 text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-orange leading-tight">
                  {treatment.tagline.split(" ").map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </span>
              )}
            </h1>
            <p className="mt-6 max-w-xl text-base sm:text-lg text-white/90 leading-relaxed">
              {treatment.heroDesc || treatment.shortDesc}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-brand-orange px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-600 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10"
              >
                Book Free Consultation
              </Link>
              <Link
                href="#cost-card"
                className="inline-flex items-center justify-center rounded-full border border-white px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
              >
                Know Approximate Cost
              </Link>
            </div>
          </div>
          {treatment.image && treatment.image.trim() !== "" && (
            <div className="flex justify-center lg:justify-end">
              <div className={`relative w-full max-w-lg overflow-hidden rounded-[2rem] shadow-2xl shadow-teal-950/45 ring-4 ring-white/10 transition-transform duration-300 hover:scale-[1.01] ${treatSetting.aspectRatio}`}>
                <Media src={treatment.image} alt={treatment.name} className={`h-full w-full ${treatSetting.objectFit}`} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Quick Info Strip */}
      {(treatment.duration || treatment.hospitalStay || treatment.recoveryTime || treatment.successRate) && (
        <section className="bg-white border-b border-slate-100 py-6 shadow-sm">
          <div className="container-page">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 md:divide-x md:divide-slate-100 text-center">
              {treatment.duration ? (
                <div className="flex flex-col items-center justify-center">
                  <span className="text-xs sm:text-sm font-semibold tracking-wider text-brand-teal mb-1">
                    Duration
                  </span>
                  <span className="text-sm sm:text-base font-bold text-brand-dark">
                    {treatment.duration}
                  </span>
                </div>
              ) : (
                <div className="hidden md:block"></div>
              )}
              {treatment.hospitalStay ? (
                <div className="flex flex-col items-center justify-center">
                  <span className="text-xs sm:text-sm font-semibold tracking-wider text-brand-teal mb-1">
                    Hospital Stay
                  </span>
                  <span className="text-sm sm:text-base font-bold text-brand-dark">
                    {treatment.hospitalStay}
                  </span>
                </div>
              ) : (
                <div className="hidden md:block"></div>
              )}
              {treatment.recoveryTime ? (
                <div className="flex flex-col items-center justify-center">
                  <span className="text-xs sm:text-sm font-semibold tracking-wider text-brand-teal mb-1">
                    Recovery Time
                  </span>
                  <span className="text-sm sm:text-base font-bold text-brand-dark">
                    {treatment.recoveryTime}
                  </span>
                </div>
              ) : (
                <div className="hidden md:block"></div>
              )}
              {treatment.successRate ? (
                <div className="flex flex-col items-center justify-center">
                  <span className="text-xs sm:text-sm font-semibold tracking-wider text-brand-teal mb-1">
                    Success Rate
                  </span>
                  <span className="text-sm sm:text-base font-bold text-brand-dark">
                    {treatment.successRate}
                  </span>
                </div>
              ) : (
                <div className="hidden md:block"></div>
              )}
            </div>
          </div>
        </section>
      )}

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
            <div id="cost-card" className="card p-8 bg-white border border-slate-100 shadow-sm rounded-3xl scroll-mt-24">
              <h3 className="text-xl font-bold font-serif text-brand-dark leading-tight mb-6">
                Approximate Cost in Delhi-NCR
              </h3>

              <div className="space-y-4 text-sm mb-8">
                <div className="flex justify-between items-start py-3 border-b border-slate-100">
                  <span className="text-slate-500 font-medium max-w-[150px] leading-tight">
                    Hospital Charges + Surgeon Fee
                  </span>
                  <span className="font-bold text-brand-dark text-right min-w-[100px] leading-tight">
                    {formatRange(treatment.costMin, treatment.costMax)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">
                    With Insurance (Cashless)
                  </span>
                  <span className="font-bold text-emerald-600 text-right">
                    Covered in most policies
                  </span>
                </div>

                <div className="flex justify-between items-center py-3">
                  <span className="text-slate-500 font-medium">
                    EMI Options
                  </span>
                  <span className="font-bold text-brand-orange text-right">
                    Available (3–12 months)
                  </span>
                </div>
              </div>

              <Link
                href="/contact"
                className="relative flex items-center justify-center w-full rounded-full bg-brand-blue py-3.5 text-sm font-semibold text-white transition hover:brightness-105 shadow-sm"
              >
                Speak to Our Care Team Now
              </Link>

              <div className="text-[10px] text-slate-500 leading-relaxed mt-6 space-y-2 text-center">
                <p>Cost varies by hospital, surgeon experience, and patient condition.</p>
                <p className="font-semibold text-slate-700">
                  Results may vary. Consult a qualified doctor for personalized advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {treatment.testimonials && treatment.testimonials.length > 0 && (
        <section className="bg-slate-50 py-16 border-t border-slate-100">
          <div className="container-page">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-2xl font-bold font-serif text-brand-dark">
                Patient Stories & Reviews
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Read real experiences from patients who underwent this treatment with us.
              </p>
            </div>
            <TestimonialCarousel testimonials={treatment.testimonials} />
          </div>
        </section>
      )}
      <CTABand
        title={`Suffering from ${conditionName}?`}
        subtitle="Don't wait for complications. Get expert advice and a clear treatment plan today."
        buttonLabel="Book Your Free Consult Now"
      />
    </>
  );
}
