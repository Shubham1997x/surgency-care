import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { PageHero, SectionHeading, CTABand } from "@/components/Sections";
import { CategoryCard, TreatmentCard } from "@/components/Cards";

export const metadata: Metadata = {
  title: "Advanced Surgical Treatments with Compassionate Care",
};

export default async function TreatmentsPage() {
  const [categories, treatments] = await Promise.all([
    prisma.treatmentCategory.findMany({
      orderBy: { createdAt: "asc" },
      include: { _count: { select: { treatments: true } } },
    }),
    prisma.treatment.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "asc" }],
    }),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Treatments"
        title="Advanced Surgical Treatments with Compassionate Care"
        subtitle="From routine general surgeries to advanced laparoscopic and aesthetic procedures — we help you find the right specialist and transparent pricing."
      />

      {categories.length > 0 && (
        <section className="py-16">
          <div className="container-page">
            <SectionHeading
              eyebrow="Categories"
              title="Browse by Specialty"
              subtitle="Choose a category to explore patient-friendly surgical options performed by experienced specialists."
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((c) => (
                <CategoryCard key={c.id} category={c} count={c._count.treatments} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-slate-50 py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Procedures"
            title="Our Most Common Procedures"
            subtitle="Click any treatment to see procedure details, recovery timelines and approximate costs."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.map((t) => (
              <TreatmentCard key={t.id} treatment={t} />
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Confused about which treatment is right for you?"
        subtitle="Speak to our care team for free. We'll guide you to the best specialist and hospital based on your symptoms and budget."
        buttonLabel="Get Free Treatment Guidance"
      />
    </>
  );
}
