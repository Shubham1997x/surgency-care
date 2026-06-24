import { prisma } from "@/lib/db";
import { PageHeader, EmptyState } from "@/components/dashboard/ui";
import { DeleteButton } from "@/components/dashboard/DeleteButton";
import { deleteLead } from "@/app/actions/admin";
import { formatDate } from "@/lib/utils";
import { LeadsFilter } from "@/components/dashboard/LeadsFilter";

export default async function LeadsAdmin(props: {
  searchParams: Promise<{
    range?: string;
    startDate?: string;
    endDate?: string;
    condition?: string;
    city?: string;
    source?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { range, startDate, endDate, condition, city, source } = searchParams;

  const where: any = {};

  if (range && range !== "all") {
    const now = new Date();
    const start = new Date();

    if (range === "today") {
      start.setHours(0, 0, 0, 0);
      where.createdAt = { gte: start };
    } else if (range === "7d") {
      start.setDate(now.getDate() - 7);
      where.createdAt = { gte: start };
    } else if (range === "30d") {
      start.setDate(now.getDate() - 30);
      where.createdAt = { gte: start };
    } else if (range === "thisMonth") {
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      where.createdAt = { gte: start };
    } else if (range === "custom") {
      if (startDate || endDate) {
        where.createdAt = {};
        if (startDate) where.createdAt.gte = new Date(startDate);
        if (endDate) {
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          where.createdAt.lte = end;
        }
      }
    }
  }

  if (condition) where.condition = condition;
  if (city) where.city = city;
  if (source) where.source = source;

  const [leads, allConditions, allCities, allSources] = await Promise.all([
    prisma.lead.findMany({ where, orderBy: { createdAt: "desc" } }),
    prisma.lead.findMany({ select: { condition: true }, distinct: ["condition"], orderBy: { condition: "asc" } }),
    prisma.lead.findMany({ select: { city: true }, distinct: ["city"], orderBy: { city: "asc" } }),
    prisma.lead.findMany({ select: { source: true }, distinct: ["source"], orderBy: { source: "asc" } }),
  ]);

  const uniqueConditions = allConditions.map((l) => l.condition).filter(Boolean);
  const uniqueCities = allCities.map((l) => l.city).filter(Boolean);
  const uniqueSources = allSources.map((l) => l.source).filter(Boolean);

  return (
    <div>
      <PageHeader
        title="Consultation Leads"
        subtitle="Enquiries submitted through consultation and contact forms."
      />

      <LeadsFilter
        leads={leads}
        uniqueConditions={uniqueConditions}
        uniqueCities={uniqueCities}
        uniqueSources={uniqueSources}
      />

      {leads.length === 0 ? (
        <EmptyState message="No leads match your criteria." />
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-400">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Phone</th>
                <th className="px-5 py-3 font-medium">City</th>
                <th className="px-5 py-3 font-medium">Condition</th>
                <th className="px-5 py-3 font-medium">Source</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-t border-slate-100 align-top">
                  <td className="px-5 py-3 font-medium text-slate-700">
                    {l.name}
                    {l.message && (
                      <p className="mt-1 max-w-xs text-xs font-normal text-slate-400">{l.message}</p>
                    )}
                  </td>
                  <td className="px-5 py-3 text-slate-600">{l.phone}</td>
                  <td className="px-5 py-3 text-slate-600">{l.city || "—"}</td>
                  <td className="px-5 py-3 text-slate-600">{l.condition || "—"}</td>
                  <td className="px-5 py-3">
                    <span className="badge bg-slate-100 text-slate-500">{l.source}</span>
                  </td>
                  <td className="px-5 py-3 text-slate-400">{formatDate(l.createdAt)}</td>
                  <td className="px-5 py-3 text-right">
                    <DeleteButton action={deleteLead} id={l.id} label={`lead from ${l.name}`} />
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
