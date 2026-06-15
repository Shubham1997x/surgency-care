import type { TreatmentCategory } from "@prisma/client";
import { saveCategory } from "@/app/actions/admin";
import { Field, TextArea, Checkbox, Select, FormActions } from "@/components/dashboard/ui";

const ICONS = [
  { value: "stethoscope", label: "Stethoscope" },
  { value: "scalpel", label: "Scalpel" },
  { value: "heart", label: "Heart" },
  { value: "eye", label: "Eye" },
  { value: "shield", label: "Shield" },
  { value: "hospital", label: "Hospital" },
];

export function CategoryForm({ category }: { category?: TreatmentCategory | null }) {
  return (
    <form action={saveCategory} className="card space-y-5 p-6">
      {category && <input type="hidden" name="id" value={category.id} />}

      <Field label="Name" name="name" required defaultValue={category?.name} placeholder="General & Laparoscopic Surgery" />
      <TextArea label="Description" name="description" rows={3} defaultValue={category?.description} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Select label="Icon" name="icon" defaultValue={category?.icon ?? "stethoscope"} options={ICONS} />
        <Field label="Accent Color (hex)" name="color" type="color" defaultValue={category?.color ?? "#4E97FD"} />
      </div>

      <Checkbox label="Feature on homepage" name="featured" defaultChecked={category?.featured} />

      <FormActions cancelHref="/dashboard/categories" />
    </form>
  );
}
