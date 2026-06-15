import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/dashboard/ui";
import { DoctorForm } from "@/components/dashboard/forms/DoctorForm";

export default async function NewDoctorPage() {
  const hospitals = await prisma.hospital.findMany({ orderBy: { name: "asc" } });
  return (
    <div>
      <PageHeader title="Add Doctor" subtitle="Create a new surgeon profile." />
      <DoctorForm hospitals={hospitals} />
    </div>
  );
}
