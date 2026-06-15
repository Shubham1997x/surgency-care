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
  const blog = await prisma.blog.findUnique({ where: { id } });
  if (!blog) notFound();
  return (
    <div>
      <PageHeader title="Edit Blog" subtitle={blog.title} />
      <BlogForm blog={blog} />
    </div>
  );
}
