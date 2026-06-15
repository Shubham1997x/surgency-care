import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/dashboard/ui";
import { CategoryForm } from "@/components/dashboard/forms/CategoryForm";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await prisma.treatmentCategory.findUnique({ where: { id } });
  if (!category) notFound();
  return (
    <div>
      <PageHeader title="Edit Category" subtitle={category.name} />
      <CategoryForm category={category} />
    </div>
  );
}
