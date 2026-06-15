import type { Hospital } from "@prisma/client";
import { saveHospital } from "@/app/actions/admin";
import { jsonToLines, parseList } from "@/lib/utils";
import { Field, TextArea, Checkbox, FormActions } from "@/components/dashboard/ui";
import { ImageUpload } from "@/components/dashboard/ImageUpload";

function whyChooseToText(value?: string | null): string {
  return parseList<{ title: string; description: string }>(value)
    .map((w) => `${w.title} :: ${w.description}`)
    .join("\n");
}

export function HospitalForm({ hospital }: { hospital?: Hospital | null }) {
  return (
    <form action={saveHospital} className="card space-y-5 p-6">
      {hospital && <input type="hidden" name="id" value={hospital.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required defaultValue={hospital?.name} placeholder="Shri Ram Hospital" />
        <Field label="Location" name="location" defaultValue={hospital?.location} placeholder="Ghaziabad, Uttar Pradesh" />
      </div>

      <ImageUpload name="image" label="Hospital Image" defaultValue={hospital?.image ?? ""} />

      <Field label="Accreditation" name="accreditation" defaultValue={hospital?.accreditation ?? "NABH Accredited"} />

      <TextArea label="About" name="about" rows={4} defaultValue={hospital?.about} />

      <div className="grid gap-5 sm:grid-cols-4">
        <Field label="Beds" name="beds" type="number" defaultValue={hospital?.beds ?? 0} />
        <Field label="Modular OTs" name="modularOTs" type="number" defaultValue={hospital?.modularOTs ?? 0} />
        <Field label="Rating" name="rating" type="number" defaultValue={hospital?.rating ?? 4.5} />
        <Field label="Starting Price (₹)" name="startingPrice" type="number" defaultValue={hospital?.startingPrice ?? 0} />
      </div>

      <TextArea
        label="Specialties"
        name="specialties"
        rows={3}
        defaultValue={jsonToLines(hospital?.specialties)}
        hint="One specialty per line."
      />
      <TextArea
        label="Why Patients Choose This Hospital"
        name="whyChoose"
        rows={4}
        defaultValue={whyChooseToText(hospital?.whyChoose)}
        hint="One per line, formatted as: Title :: Description"
      />

      <Checkbox label="Feature on homepage" name="featured" defaultChecked={hospital?.featured} />

      <FormActions cancelHref="/dashboard/hospitals" />
    </form>
  );
}
