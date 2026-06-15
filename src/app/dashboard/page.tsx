import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default async function DashboardHome() {
  const [doctors, hospitals, categories, treatments, blogs, leads, recentLeads] =
    await Promise.all([
      prisma.doctor.count(),
      prisma.hospital.count(),
      prisma.treatmentCategory.count(),
      prisma.treatment.count(),
      prisma.blog.count(),
      prisma.lead.count(),
      prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  const cards = [
    { label: "Doctors", count: doctors, href: "/dashboard/doctors" },
    { label: "Hospitals", count: hospitals, href: "/dashboard/hospitals" },
    { label: "Categories", count: categories, href: "/dashboard/categories" },
    { label: "Treatments", count: treatments, href: "/dashboard/treatments" },
    { label: "Blogs", count: blogs, href: "/dashboard/blogs" },
    { label: "Leads", count: leads, href: "/dashboard/leads" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">
        Manage your website content from one place.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="card card-hover p-5">
            <p className="text-3xl font-bold text-brand-dark">{c.count}</p>
            <p className="mt-1 text-sm text-slate-500">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-brand-dark">Recent Consultation Leads</h2>
          <Link href="/dashboard/leads" className="text-sm font-medium text-brand-blue">
            View all →
          </Link>
        </div>
        {recentLeads.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">No leads yet.</p>
        ) : (
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs uppercase text-slate-400">
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Phone</th>
                <th className="pb-2 font-medium">Condition</th>
                <th className="pb-2 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((l) => (
                <tr key={l.id} className="border-b border-slate-50">
                  <td className="py-2.5 font-medium text-slate-700">{l.name}</td>
                  <td className="py-2.5 text-slate-600">{l.phone}</td>
                  <td className="py-2.5 text-slate-600">{l.condition || "—"}</td>
                  <td className="py-2.5 text-slate-400">{formatDate(l.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
