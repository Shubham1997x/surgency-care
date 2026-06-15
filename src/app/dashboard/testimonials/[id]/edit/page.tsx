import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/dashboard/ui";
import { TestimonialForm } from "@/components/dashboard/forms/TestimonialForm";

interface EditTestimonialProps {
  params: Promise<{ id: string }>;
}

export default async function EditTestimonialPage({ params }: EditTestimonialProps) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({
    where: { id },
  });

  if (!testimonial) {
    notFound();
  }

  const treatments = await prisma.treatment.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <PageHeader title="Edit Testimonial" subtitle={`Modify review by ${testimonial.name}`} />
      <TestimonialForm testimonial={testimonial} treatments={treatments} />
    </div>
  );
}
