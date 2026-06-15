import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Media } from "@/components/Media";
import { CTABand } from "@/components/Sections";
import { BlogCard } from "@/components/Cards";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({ where: { slug } });
  return { title: blog ? blog.title : "Article", description: blog?.excerpt };
}

/** Render the simple markdown-ish content (## headings, lines) into HTML blocks. */
function renderContent(content: string) {
  const blocks = content.split("\n").filter((l) => l.trim() !== "");
  return blocks.map((line, i) => {
    if (line.startsWith("## ")) {
      return (
        <h2 key={i} className="mt-8 font-serif text-xl font-bold text-brand-dark">
          {line.replace(/^##\s+/, "")}
        </h2>
      );
    }
    if (/^\d+\.\s/.test(line)) {
      return (
        <p key={i} className="mt-2 text-slate-600">
          {line}
        </p>
      );
    }
    return (
      <p key={i} className="mt-4 leading-relaxed text-slate-600">
        {line}
      </p>
    );
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog) notFound();

  const related = await prisma.blog.findMany({
    where: { slug: { not: slug } },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return (
    <>
      <article className="py-12">
        <div className="container-page max-w-3xl">
          <span className="badge bg-brand-blue/10 text-brand-blue">{blog.category}</span>
          <h1 className="heading-display mt-4 text-3xl sm:text-4xl">{blog.title}</h1>
          <p className="mt-3 text-sm text-slate-400">
            By {blog.author} • {formatDate(blog.publishedAt)} • {blog.readTime}
          </p>
          <div className="relative mt-8 h-72 overflow-hidden rounded-2xl">
            <Media src={blog.coverImage} alt={blog.title} className="h-full w-full" />
          </div>
          <p className="mt-8 text-lg font-medium text-slate-700">{blog.excerpt}</p>
          <div className="mt-2">{renderContent(blog.content)}</div>

          <div className="mt-10 rounded-xl bg-amber-50 p-4 text-xs text-amber-800">
            <strong>Disclaimer:</strong> This article is for educational purposes and does not
            replace professional medical advice. Always consult a qualified surgeon for diagnosis
            and treatment.
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-slate-50 py-14">
          <div className="container-page">
            <h2 className="heading-display text-2xl">More Articles</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((b) => (
                <BlogCard key={b.id} blog={b} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand
        title="Ready to Get Expert Surgical Advice?"
        subtitle="Speak to our experts today. We'll help you find the right surgeon and hospital near you."
      />
    </>
  );
}
