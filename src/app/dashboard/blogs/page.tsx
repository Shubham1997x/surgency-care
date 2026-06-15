import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageHeader, EmptyState } from "@/components/dashboard/ui";
import { DeleteButton } from "@/components/dashboard/DeleteButton";
import { deleteBlog } from "@/app/actions/admin";
import { formatDate } from "@/lib/utils";

export default async function BlogsAdmin() {
  const blogs = await prisma.blog.findMany({ orderBy: { publishedAt: "desc" } });
  return (
    <div>
      <PageHeader
        title="Blogs"
        subtitle="Write and manage health articles."
        action={{ href: "/dashboard/blogs/new", label: "+ Add Blog" }}
      />
      {blogs.length === 0 ? (
        <EmptyState message="No blog posts yet. Write your first article." />
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-400">
              <tr>
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Published</th>
                <th className="px-5 py-3 font-medium">Featured</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b) => (
                <tr key={b.id} className="border-t border-slate-100">
                  <td className="px-5 py-3 font-medium text-slate-700">{b.title}</td>
                  <td className="px-5 py-3 text-slate-600">{b.category}</td>
                  <td className="px-5 py-3 text-slate-400">{formatDate(b.publishedAt)}</td>
                  <td className="px-5 py-3">{b.featured ? "✓" : "—"}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/dashboard/blogs/${b.id}/edit`} className="text-sm font-medium text-brand-blue hover:underline">
                        Edit
                      </Link>
                      <DeleteButton action={deleteBlog} id={b.id} label={b.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
