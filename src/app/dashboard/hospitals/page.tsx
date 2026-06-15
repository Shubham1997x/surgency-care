import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageHeader, EmptyState } from "@/components/dashboard/ui";
import { DeleteButton } from "@/components/dashboard/DeleteButton";
import { deleteHospital } from "@/app/actions/admin";
import { formatINR } from "@/lib/utils";

export default async function HospitalsAdmin() {
  const hospitals = await prisma.hospital.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <PageHeader
        title="Hospitals"
        subtitle="Manage the hospitals in your network."
        action={{ href: "/dashboard/hospitals/new", label: "+ Add Hospital" }}
      />
      {hospitals.length === 0 ? (
        <EmptyState message="No hospitals yet. Add your first hospital." />
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-400">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Location</th>
                <th className="px-5 py-3 font-medium">Starting</th>
                <th className="px-5 py-3 font-medium">Featured</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((h) => (
                <tr key={h.id} className="border-t border-slate-100">
                  <td className="px-5 py-3 font-medium text-slate-700">{h.name}</td>
                  <td className="px-5 py-3 text-slate-600">{h.location}</td>
                  <td className="px-5 py-3 text-slate-600">{formatINR(h.startingPrice)}</td>
                  <td className="px-5 py-3">{h.featured ? "✓" : "—"}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/dashboard/hospitals/${h.id}/edit`} className="text-sm font-medium text-brand-blue hover:underline">
                        Edit
                      </Link>
                      <DeleteButton action={deleteHospital} id={h.id} label={h.name} />
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
