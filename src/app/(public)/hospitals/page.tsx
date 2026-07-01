import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { PageHero, CTABand } from "@/components/Sections";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { HospitalFilterList } from "@/components/HospitalFilterList";
import { getImageSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "NABH Accredited Hospitals Across Delhi-NCR",
};

export default async function HospitalsPage() {
  const hospitals = await prisma.hospital.findMany({
    orderBy: [{ featured: "desc" }, { rating: "desc" }],
  });
  const hospitalSetting = getImageSettings().hospital;

  return (
    <>
      <PageHero
        eyebrow="Our Network"
        title="NABH Accredited Hospitals Across Delhi-NCR"
        subtitle="We partner only with trusted, state-of-the-art hospitals equipped with advanced operation theatres and experienced surgical teams."
      />

      <section className="bg-slate-50 py-16">
        <div className="container-page">
          <HospitalFilterList initialHospitals={hospitals} setting={hospitalSetting} />
          <p className="mt-8 text-center text-xs text-slate-400">
            All our partner hospitals are NABH accredited and regularly audited for patient safety and quality standards.
          </p>
        </div>
      </section>

      <MedicalDisclaimer />

      <CTABand
        title="Not sure which hospital is right for you?"
        subtitle="Our care team will recommend the best hospital based on your condition, location and budget."
        buttonLabel="Get Personalized Recommendation"
      />
    </>
  );
}
