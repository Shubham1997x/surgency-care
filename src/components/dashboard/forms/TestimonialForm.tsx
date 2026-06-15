import type { Testimonial } from "@prisma/client";
import { saveTestimonial } from "@/app/actions/admin";
import { Field, TextArea, Checkbox, Select, FormActions } from "@/components/dashboard/ui";
import { ImageUpload } from "@/components/dashboard/ImageUpload";

export function TestimonialForm({
  testimonial,
  treatments = [],
}: {
  testimonial?: Testimonial | null;
  treatments?: { id: string; name: string }[];
}) {
  const ratingOptions = [
    { value: "5", label: "5 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "3", label: "3 Stars" },
    { value: "2", label: "2 Stars" },
    { value: "1", label: "1 Star" },
  ];

  return (
    <form action={saveTestimonial} className="card space-y-5 p-6">
      {testimonial && <input type="hidden" name="id" value={testimonial.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Reviewer Name"
          name="name"
          required
          defaultValue={testimonial?.name}
          placeholder="e.g. Gaurav Pandey"
        />
        <Field
          label="Time Ago"
          name="time"
          defaultValue={testimonial?.time ?? "1 day ago"}
          placeholder="e.g. 2 months ago"
          hint="Relative time format (e.g. '2 weeks ago', '5 months ago')"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          label="Rating"
          name="rating"
          defaultValue={testimonial?.rating ? String(Math.round(testimonial.rating)) : "5"}
          options={ratingOptions}
        />
        <Select
          label="Associated Treatment"
          name="treatmentId"
          defaultValue={testimonial?.treatmentId || ""}
          options={[
            { value: "", label: "General (Not specific to a treatment)" },
            ...treatments.map((t) => ({ value: t.id, label: t.name })),
          ]}
        />
      </div>

      <ImageUpload name="image" label="Reviewer Photo" defaultValue={testimonial?.image ?? ""} />

      <TextArea
        label="Review Text"
        name="text"
        rows={6}
        defaultValue={testimonial?.text}
        placeholder="Type the review content here..."
      />

      <Checkbox label="Feature on homepage" name="featured" defaultChecked={testimonial?.featured ?? true} />

      <FormActions cancelHref="/dashboard/testimonials" />
    </form>
  );
}
