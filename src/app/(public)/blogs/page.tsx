import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { PageHero, CTABand } from "@/components/Sections";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { BlogList } from "@/components/BlogList";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Latest Health Insights, Surgery Guides & Recovery Tips",
};

export default async function BlogsPage() {
  const blogs = await prisma.blog.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <>
      <PageHero
        eyebrow="Knowledge & Care"
        title="Latest Health Insights, Surgery Guides & Recovery Tips"
        subtitle="Expert-written articles to help you understand procedures, prepare better and recover faster."
      />

      <section className="bg-slate-50 py-16">
        <div className="container-page">
          {blogs.length === 0 ? (
            <p className="text-center text-slate-500">No articles published yet.</p>
          ) : (
            <BlogList initialBlogs={blogs} />
          )}
        </div>
      </section>

      <MedicalDisclaimer />

      <CTABand
        title="Need Personalized Guidance?"
        subtitle="Our care team is ready to answer your questions and help you choose the right treatment."
      />
    </>
  );
}
