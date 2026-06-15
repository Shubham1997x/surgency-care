import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/dashboard/ui";
import { HospitalForm } from "@/components/dashboard/forms/HospitalForm";

export default async function EditHospitalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hospital = await prisma.hospital.findUnique({ where: { id } });
  if (!hospital) notFound();
  return (
    <div>
      <PageHeader title="Edit Hospital" subtitle={hospital.name} />
      <HospitalForm hospital={hospital} />
    </div>
  );
}
