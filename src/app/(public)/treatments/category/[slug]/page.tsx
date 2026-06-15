import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageHero, CTABand } from "@/components/Sections";
import { TreatmentCard } from "@/components/Cards";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.treatmentCategory.findUnique({ where: { slug } });
  return { title: category ? category.name : "Treatment Category" };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await prisma.treatmentCategory.findUnique({
    where: { slug },
    include: { treatments: { orderBy: [{ featured: "desc" }, { createdAt: "asc" }] } },
  });
  if (!category) notFound();

  return (
    <>
      <PageHero
        eyebrow="Treatment Category"
        title={category.name}
        subtitle={category.description}
      />

      <section className="bg-slate-50 py-16">
        <div className="container-page">
          {category.treatments.length === 0 ? (
            <p className="text-center text-slate-500">No treatments in this category yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.treatments.map((t) => (
                <TreatmentCard key={t.id} treatment={t} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABand
        title="Ready to take the next step?"
        subtitle="Book a free consultation and our team will recommend the right specialist for your treatment."
      />
    </>
  );
}
