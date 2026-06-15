import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageHeader, EmptyState } from "@/components/dashboard/ui";
import { DeleteButton } from "@/components/dashboard/DeleteButton";
import { deleteTestimonial } from "@/app/actions/admin";

export default async function TestimonialsAdmin() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <PageHeader
        title="Testimonials"
        subtitle="Manage the patient reviews and Google Reviews shown on the website."
        action={{ href: "/dashboard/testimonials/new", label: "+ Add Testimonial" }}
      />
      {testimonials.length === 0 ? (
        <EmptyState message="No testimonials yet. Add your first patient review." />
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-400">
              <tr>
                <th className="px-5 py-3 font-medium">Reviewer</th>
                <th className="px-5 py-3 font-medium">Rating</th>
                <th className="px-5 py-3 font-medium">Time Ago</th>
                <th className="px-5 py-3 font-medium">Featured</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t.id} className="border-t border-slate-100">
                  <td className="px-5 py-3 font-medium text-slate-700">
                    <div className="flex items-center gap-3">
                      {t.image ? (
                        <img src={t.image} alt={t.name} className="h-8 w-8 rounded-full object-cover" />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
                          {t.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <span>{t.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-brand-orange font-bold">
                    {"★".repeat(Math.round(t.rating))}
                    {"☆".repeat(5 - Math.round(t.rating))}
                  </td>
                  <td className="px-5 py-3 text-slate-600">{t.time}</td>
                  <td className="px-5 py-3">{t.featured ? "✓ Yes" : "—"}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/dashboard/testimonials/${t.id}/edit`} className="text-sm font-medium text-brand-blue hover:underline">
                        Edit
                      </Link>
                      <DeleteButton action={deleteTestimonial} id={t.id} label={t.name} />
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
