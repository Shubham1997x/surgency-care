import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/dashboard/ui";
import { DoctorForm } from "@/components/dashboard/forms/DoctorForm";

export default async function EditDoctorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [doctor, hospitals] = await Promise.all([
    prisma.doctor.findUnique({ where: { id } }),
    prisma.hospital.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!doctor) notFound();

  return (
    <div>
      <PageHeader title="Edit Doctor" subtitle={doctor.name} />
      <DoctorForm doctor={doctor} hospitals={hospitals} />
    </div>
  );
}
