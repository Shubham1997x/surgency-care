import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/dashboard/ui";
import { TreatmentForm } from "@/components/dashboard/forms/TreatmentForm";

export default async function NewTreatmentPage() {
  const categories = await prisma.treatmentCategory.findMany({ orderBy: { name: "asc" } });
  return (
    <div>
      <PageHeader title="Add Treatment" subtitle="Create a new surgical procedure." />
      <TreatmentForm categories={categories} />
    </div>
  );
}
