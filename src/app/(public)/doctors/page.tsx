import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { PageHero, CTABand } from "@/components/Sections";
import { DoctorCard } from "@/components/Cards";

export const metadata: Metadata = {
  title: "Verified & Experienced Surgeons You Can Trust",
};

export default async function DoctorsPage() {
  const doctors = await prisma.doctor.findMany({
    include: { hospital: true },
    orderBy: [{ featured: "desc" }, { rating: "desc" }],
  });

  return (
    <>
      <PageHero
        eyebrow="Verified Experts"
        title="Verified & Experienced Surgeons You Can Trust"
        subtitle="Every doctor on our platform is carefully vetted for years of specialized surgical experience, safety and successful recovery outcomes."
      />

      <section className="bg-slate-50 py-16">
        <div className="container-page">
          <p className="mb-6 text-sm text-slate-500">
            Showing {doctors.length} verified surgeon{doctors.length === 1 ? "" : "s"}
          </p>
          {doctors.length === 0 ? (
            <p className="text-slate-500">No doctors available yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {doctors.map((d) => (
                <DoctorCard key={d.id} doctor={d} />
              ))}
            </div>
          )}
          <p className="mt-8 text-center text-xs text-slate-400">
            All doctors are verified with valid medical registration, minimum 10+ years experience and patient reviews.
          </p>
        </div>
      </section>

      <CTABand
        title="Not sure which doctor is right for you?"
        subtitle="Tell us about your condition and we'll recommend the best surgeon for your needs."
        buttonLabel="Get Personalized Recommendation"
      />
    </>
  );
}
