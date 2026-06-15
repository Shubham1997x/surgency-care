import { PageHeader } from "@/components/dashboard/ui";
import { BlogForm } from "@/components/dashboard/forms/BlogForm";

export default function NewBlogPage() {
  return (
    <div>
      <PageHeader title="Add Blog" subtitle="Write a new health article." />
      <BlogForm />
    </div>
  );
}
