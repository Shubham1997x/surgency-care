import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageHeader, EmptyState } from "@/components/dashboard/ui";
import { DeleteButton } from "@/components/dashboard/DeleteButton";
import { deleteCategory } from "@/app/actions/admin";

export default async function CategoriesAdmin() {
  const categories = await prisma.treatmentCategory.findMany({
    orderBy: { createdAt: "asc" },
    include: { _count: { select: { treatments: true } } },
  });
  return (
    <div>
      <PageHeader
        title="Treatment Categories"
        subtitle="Group treatments into specialty categories."
        action={{ href: "/dashboard/categories/new", label: "+ Add Category" }}
      />
      {categories.length === 0 ? (
        <EmptyState message="No categories yet. Add your first category." />
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-400">
              <tr>
                <th className="px-5 py-3 font-medium">Color</th>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Treatments</th>
                <th className="px-5 py-3 font-medium">Featured</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} className="border-t border-slate-100">
                  <td className="px-5 py-3">
                    <span className="inline-block h-5 w-5 rounded-full" style={{ backgroundColor: c.color }} />
                  </td>
                  <td className="px-5 py-3 font-medium text-slate-700">{c.name}</td>
                  <td className="px-5 py-3 text-slate-600">{c._count.treatments}</td>
                  <td className="px-5 py-3">{c.featured ? "✓" : "—"}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/dashboard/categories/${c.id}/edit`} className="text-sm font-medium text-brand-blue hover:underline">
                        Edit
                      </Link>
                      <DeleteButton action={deleteCategory} id={c.id} label={c.name} />
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
