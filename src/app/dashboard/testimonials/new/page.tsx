import { PageHeader } from "@/components/dashboard/ui";
import { TestimonialForm } from "@/components/dashboard/forms/TestimonialForm";

import { prisma } from "@/lib/db";

export default async function NewTestimonialPage() {
  const treatments = await prisma.treatment.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <PageHeader title="Add Testimonial" subtitle="Create a new patient review." />
      <TestimonialForm treatments={treatments} />
    </div>
  );
}
