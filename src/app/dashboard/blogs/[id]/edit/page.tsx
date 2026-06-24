import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/dashboard/ui";
import { BlogForm } from "@/components/dashboard/forms/BlogForm";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [blog, doctors, hospitals] = await Promise.all([
    prisma.blog.findUnique({ where: { id } }),
    prisma.doctor.findMany({ select: { id: true, name: true, primarySpecialty: true }, orderBy: { name: "asc" } }),
    prisma.hospital.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
  ]);
  if (!blog) notFound();

  return (
    <div>
      <PageHeader title="Edit Blog" subtitle={blog.title} />
      <BlogForm blog={blog} doctors={doctors} hospitals={hospitals} />
    </div>
  );
}
