import type { Treatment, TreatmentCategory } from "@prisma/client";
import { saveTreatment } from "@/app/actions/admin";
import { jsonToLines } from "@/lib/utils";
import { Field, TextArea, Checkbox, Select, FormActions } from "@/components/dashboard/ui";
import { ImageUpload } from "@/components/dashboard/ImageUpload";

export function TreatmentForm({
  treatment,
  categories,
}: {
  treatment?: Treatment | null;
  categories: TreatmentCategory[];
}) {
  return (
    <form action={saveTreatment} className="card space-y-5 p-6">
      {treatment && <input type="hidden" name="id" value={treatment.id} />}

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Name" name="name" required defaultValue={treatment?.name} placeholder="Gallbladder Stone Removal" />
        <Field label="Condition Name" name="conditionName" defaultValue={treatment?.conditionName} placeholder="Gallbladder Stones" />
        <Field label="Tagline" name="tagline" defaultValue={treatment?.tagline} placeholder="Laparoscopic Cholecystectomy" />
      </div>

      <Select
        label="Category"
        name="categoryId"
        defaultValue={treatment?.categoryId ?? ""}
        placeholder="— None —"
        options={categories.map((c) => ({ value: c.id, label: c.name }))}
      />

      <ImageUpload name="image" label="Image" defaultValue={treatment?.image ?? ""} />

      <TextArea label="Short Description" name="shortDesc" rows={2} defaultValue={treatment?.shortDesc} hint="Shown on listing cards." />
      <TextArea label="Hero Description" name="heroDesc" rows={3} defaultValue={treatment?.heroDesc} hint="Shown in the page header." />

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Cost Min (₹)" name="costMin" type="number" defaultValue={treatment?.costMin ?? 0} />
        <Field label="Cost Max (₹)" name="costMax" type="number" defaultValue={treatment?.costMax ?? 0} />
        <Field label="Recovery Note" name="recoveryNote" defaultValue={treatment?.recoveryNote} placeholder="Resume work in a week" />
      </div>

      <TextArea label="Common Symptoms" name="symptoms" rows={4} defaultValue={jsonToLines(treatment?.symptoms)} hint="One per line." />
      <TextArea label="Procedure Steps" name="procedureSteps" rows={4} defaultValue={jsonToLines(treatment?.procedureSteps)} hint="One step per line." />
      <TextArea label="Benefits" name="benefits" rows={4} defaultValue={jsonToLines(treatment?.benefits)} hint="One per line." />
      <TextArea label="Recovery & Aftercare" name="aftercare" rows={4} defaultValue={jsonToLines(treatment?.aftercare)} hint="One per line." />

      <Checkbox label="Feature on treatments page" name="featured" defaultChecked={treatment?.featured} />

      <FormActions cancelHref="/dashboard/treatments" />
    </form>
  );
}
