import { PageHeader } from "@/components/dashboard/ui";
import { HospitalForm } from "@/components/dashboard/forms/HospitalForm";

export default function NewHospitalPage() {
  return (
    <div>
      <PageHeader title="Add Hospital" subtitle="Create a new hospital listing." />
      <HospitalForm />
    </div>
  );
}
