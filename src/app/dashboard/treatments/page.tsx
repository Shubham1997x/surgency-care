import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageHeader, EmptyState } from "@/components/dashboard/ui";
import { DeleteButton } from "@/components/dashboard/DeleteButton";
import { deleteTreatment } from "@/app/actions/admin";
import { importTreatmentsCSV } from "@/app/actions/csv";
import { formatRange } from "@/lib/utils";
import { CsvActions } from "@/components/dashboard/CsvActions";

export default async function TreatmentsAdmin() {
  const treatments = await prisma.treatment.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div>
      <PageHeader
        title="Treatments"
        subtitle="Manage surgical procedures and their details."
        action={{ href: "/dashboard/treatments/new", label: "+ Add Treatment" }}
      />
      <div className="mb-4">
        <CsvActions entityType="treatments" data={treatments} importAction={importTreatmentsCSV} />
      </div>
      {treatments.length === 0 ? (
        <EmptyState message="No treatments yet. Add your first procedure." />
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-400">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Cost</th>
                <th className="px-5 py-3 font-medium">Featured</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {treatments.map((t) => (
                <tr key={t.id} className="border-t border-slate-100">
                  <td className="px-5 py-3 font-medium text-slate-700">{t.name}</td>
                  <td className="px-5 py-3 text-slate-600">{t.category?.name || "—"}</td>
                  <td className="px-5 py-3 text-slate-600">{formatRange(t.costMin, t.costMax)}</td>
                  <td className="px-5 py-3">{t.featured ? "✓" : "—"}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/dashboard/treatments/${t.id}/edit`} className="text-sm font-medium text-brand-blue hover:underline">
                        Edit
                      </Link>
                      <DeleteButton action={deleteTreatment} id={t.id} label={t.name} />
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
