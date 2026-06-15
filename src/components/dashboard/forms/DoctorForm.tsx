import type { Doctor, Hospital } from "@prisma/client";
import { saveDoctor } from "@/app/actions/admin";
import { jsonToLines } from "@/lib/utils";
import { Field, TextArea, Checkbox, Select, FormActions } from "@/components/dashboard/ui";
import { ImageUpload } from "@/components/dashboard/ImageUpload";

export function DoctorForm({
  doctor,
  hospitals,
}: {
  doctor?: Doctor | null;
  hospitals: Hospital[];
}) {
  return (
    <form action={saveDoctor} className="card space-y-5 p-6">
      {doctor && <input type="hidden" name="id" value={doctor.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" name="name" required defaultValue={doctor?.name} placeholder="Dr. Rajesh Sharma" />
        <Field label="Title" name="title" defaultValue={doctor?.title} placeholder="Senior Consultant — General Surgery" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Primary Specialty" name="primarySpecialty" defaultValue={doctor?.primarySpecialty} placeholder="General Surgery" />
        <Select
          label="Hospital"
          name="hospitalId"
          defaultValue={doctor?.hospitalId ?? ""}
          placeholder="— None —"
          options={hospitals.map((h) => ({ value: h.id, label: h.name }))}
        />
      </div>

      <ImageUpload name="image" label="Photo" defaultValue={doctor?.image ?? ""} />

      <TextArea label="About" name="about" rows={4} defaultValue={doctor?.about} placeholder="A short professional bio…" />

      <div className="grid gap-5 sm:grid-cols-4">
        <Field label="Experience (yrs)" name="experienceYears" type="number" defaultValue={doctor?.experienceYears ?? 0} />
        <Field label="Rating" name="rating" type="number" defaultValue={doctor?.rating ?? 4.8} />
        <Field label="Surgeries Count" name="surgeriesCount" type="number" defaultValue={doctor?.surgeriesCount ?? 0} />
        <Field label="Consultation Fee (₹)" name="consultationFee" type="number" defaultValue={doctor?.consultationFee ?? 0} />
      </div>

      <TextArea
        label="Specialties"
        name="specialties"
        rows={4}
        defaultValue={jsonToLines(doctor?.specialties)}
        hint="One specialty per line."
      />
      <TextArea
        label="Qualifications & Experience"
        name="qualifications"
        rows={4}
        defaultValue={jsonToLines(doctor?.qualifications)}
        hint="One item per line."
      />

      <Checkbox label="Feature on homepage" name="featured" defaultChecked={doctor?.featured} />

      <FormActions cancelHref="/dashboard/doctors" />
    </form>
  );
}
