import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/dashboard/ui";
import { BlogForm } from "@/components/dashboard/forms/BlogForm";

export default async function NewBlogPage() {
  const [doctors, hospitals] = await Promise.all([
    prisma.doctor.findMany({ select: { id: true, name: true, primarySpecialty: true }, orderBy: { name: "asc" } }),
    prisma.hospital.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <PageHeader title="Add Blog" subtitle="Write a new health article." />
      <BlogForm doctors={doctors} hospitals={hospitals} />
    </div>
  );
}
