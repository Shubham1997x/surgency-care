import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { PageHero, CTABand } from "@/components/Sections";
import { DoctorFilterList } from "@/components/DoctorFilterList";

export const dynamic = "force-dynamic";

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
        subtitle="Every doctor on our platform is carefully verified with years of specialized surgical experience. Your saftey and successful recovery are our priority."
      />

      <section className="bg-slate-50 py-16">
        <div className="container-page">
          <DoctorFilterList initialDoctors={doctors} />
          <p className="mt-8 text-center text-xs text-slate-400">
            All doctors are verified with valid medical registration, minimum 10+ years experience and patient reviews.
          </p>
        </div>
      </section>

      <CTABand
        title="Not sure which doctor is right for you?"
        subtitle="Tell us about your condition and we'll recommend the best surgeon for your needs."
        buttonLabel="Get Personalized Doctor Recommendation"
      />
    </>
  );
}
