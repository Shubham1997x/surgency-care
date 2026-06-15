import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/dashboard/ui";
import { TreatmentForm } from "@/components/dashboard/forms/TreatmentForm";

export default async function EditTreatmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [treatment, categories] = await Promise.all([
    prisma.treatment.findUnique({ where: { id } }),
    prisma.treatmentCategory.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!treatment) notFound();
  return (
    <div>
      <PageHeader title="Edit Treatment" subtitle={treatment.name} />
      <TreatmentForm treatment={treatment} categories={categories} />
    </div>
  );
}
