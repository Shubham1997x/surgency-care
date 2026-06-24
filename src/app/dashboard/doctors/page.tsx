import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageHeader, EmptyState } from "@/components/dashboard/ui";
import { DeleteButton } from "@/components/dashboard/DeleteButton";
import { deleteDoctor } from "@/app/actions/admin";
import { importDoctorsCSV } from "@/app/actions/csv";
import { CsvActions } from "@/components/dashboard/CsvActions";

export default async function DoctorsAdmin() {
  const doctors = await prisma.doctor.findMany({
    include: { hospital: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <PageHeader
        title="Doctors"
        subtitle="Add, edit and manage the surgeons listed on your website."
        action={{ href: "/dashboard/doctors/new", label: "+ Add Doctor" }}
      />
      <div className="mb-4">
        <CsvActions entityType="doctors" data={doctors} importAction={importDoctorsCSV} />
      </div>
      {doctors.length === 0 ? (
        <EmptyState message="No doctors yet. Add your first surgeon." />
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-400">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Specialty</th>
                <th className="px-5 py-3 font-medium">Hospital</th>
                <th className="px-5 py-3 font-medium">Featured</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d) => (
                <tr key={d.id} className="border-t border-slate-100">
                  <td className="px-5 py-3 font-medium text-slate-700">{d.name}</td>
                  <td className="px-5 py-3 text-slate-600">{d.primarySpecialty || "—"}</td>
                  <td className="px-5 py-3 text-slate-600">{d.hospital?.name || "—"}</td>
                  <td className="px-5 py-3">{d.featured ? "✓" : "—"}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/dashboard/doctors/${d.id}/edit`} className="text-sm font-medium text-brand-blue hover:underline">
                        Edit
                      </Link>
                      <DeleteButton action={deleteDoctor} id={d.id} label={d.name} />
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
