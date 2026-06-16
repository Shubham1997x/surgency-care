import type { Blog } from "@prisma/client";
import { saveBlog } from "@/app/actions/admin";
import { Field, TextArea, Checkbox, FormActions } from "@/components/dashboard/ui";
import { ImageUpload } from "@/components/dashboard/ImageUpload";

export function BlogForm({ blog }: { blog?: Blog | null }) {
  return (
    <form action={saveBlog} className="card space-y-5 p-6">
      {blog && <input type="hidden" name="id" value={blog.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Title" name="title" required defaultValue={blog?.title} placeholder="Gallbladder Stone Removal: What to Expect" />
        <Field label="Slug (URL)" name="slug" defaultValue={blog?.slug} placeholder="Leave empty to auto-generate" hint="Changing this will break existing links" />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Category" name="category" defaultValue={blog?.category ?? "General Surgery"} placeholder="General Surgery" />
        <Field label="Author" name="author" defaultValue={blog?.author ?? "Surgency Care Team"} />
        <Field label="Read Time" name="readTime" defaultValue={blog?.readTime ?? "5 min read"} placeholder="5 min read" />
      </div>

      <ImageUpload name="coverImage" label="Cover Image" defaultValue={blog?.coverImage ?? ""} />

      <TextArea label="Excerpt" name="excerpt" rows={2} defaultValue={blog?.excerpt} hint="Short summary shown on cards." />
      <TextArea
        label="Content"
        name="content"
        rows={14}
        defaultValue={blog?.content}
        hint="Use '## Heading' on its own line for section headings. Blank lines separate paragraphs."
      />

      <Checkbox label="Feature on homepage" name="featured" defaultChecked={blog?.featured} />

      <FormActions cancelHref="/dashboard/blogs" />
    </form>
  );
}
