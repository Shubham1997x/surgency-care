import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Media } from "@/components/Media";
import { CTABand } from "@/components/Sections";
import { formatDate } from "@/lib/utils";
import { Phone } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({ where: { slug } });
  return { title: blog ? blog.title : "Article", description: blog?.excerpt };
}

function parseInlineStyles(text: string) {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, idx) => {
    if (idx % 2 === 1) {
      return (
        <strong key={idx} className="font-bold text-slate-900">
          {part}
        </strong>
      );
    }
    return part;
  });
}

/** Render content into beautifully styled HTML blocks */
function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: { type: "ul" | "ol"; items: string[] } | null = null;

  let inBox = false;
  let boxTitle = "";
  let boxItems: string[] = [];

  const flushList = (key: number) => {
    if (!currentList) return null;
    const list = currentList;
    currentList = null;
    if (list.type === "ul") {
      return (
        <ul key={`ul-${key}`} className="my-5 list-disc pl-6 space-y-2 text-slate-600">
          {list.items.map((item, idx) => (
            <li key={idx}>{parseInlineStyles(item)}</li>
          ))}
        </ul>
      );
    } else {
      return (
        <ol key={`ol-${key}`} className="my-5 list-decimal pl-6 space-y-2 text-slate-600">
          {list.items.map((item, idx) => (
            <li key={idx} className="pl-1">
              {parseInlineStyles(item)}
            </li>
          ))}
        </ol>
      );
    }
  };

  const flushBox = (key: number) => {
    if (!inBox) return null;
    inBox = false;
    const title = boxTitle;
    const items = boxItems;
    boxItems = [];
    return (
      <div key={`box-${key}`} className="my-8 rounded-2xl bg-slate-50 p-6 border border-slate-100/80 shadow-sm">
        <h4 className="font-bold text-teal-900 text-base mb-3">{title}</h4>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
          {items.map((item, idx) => (
            <li key={idx}>{parseInlineStyles(item)}</li>
          ))}
        </ul>
      </div>
    );
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      if (currentList) {
        const el = flushList(i);
        if (el) elements.push(el);
      }
      continue;
    }

    // Detect box/cards (e.g. "Advantages of ...:", "Key benefits:")
    if (line.endsWith(":") && (line.toLowerCase().includes("advantages") || line.toLowerCase().includes("benefits") || line.toLowerCase().includes("choose") || line.toLowerCase().includes("why"))) {
      if (currentList) {
        const el = flushList(i);
        if (el) elements.push(el);
      }
      if (inBox) {
        const el = flushBox(i);
        if (el) elements.push(el);
      }
      inBox = true;
      boxTitle = line;
      continue;
    }

    if (inBox) {
      if (line.startsWith("- ") || line.startsWith("* ")) {
        boxItems.push(line.substring(2));
        continue;
      } else if (line.startsWith("##") || line.startsWith(">")) {
        const el = flushBox(i);
        if (el) elements.push(el);
      } else {
        inBox = false;
        const el = flushBox(i);
        if (el) elements.push(el);
      }
    }

    // Headings
    if (line.startsWith("### ")) {
      if (currentList) {
        const el = flushList(i);
        if (el) elements.push(el);
      }
      elements.push(
        <h3 key={i} className="mt-6 font-bold text-lg text-teal-800">
          {line.replace(/^###\s+/, "")}
        </h3>
      );
    } else if (line.startsWith("## ")) {
      if (currentList) {
        const el = flushList(i);
        if (el) elements.push(el);
      }
      elements.push(
        <h2 key={i} className="mt-8 font-bold text-xl sm:text-2xl text-teal-900">
          {line.replace(/^##\s+/, "")}
        </h2>
      );
    }
    // Blockquote (Callout quote)
    else if (line.startsWith("> ")) {
      if (currentList) {
        const el = flushList(i);
        if (el) elements.push(el);
      }
      const quoteText = line.substring(2);
      elements.push(
        <div key={i} className="my-8 rounded-2xl bg-orange-50/70 p-6 border border-orange-100 text-center text-slate-700 italic shadow-sm">
          <p className="text-base md:text-lg leading-relaxed text-teal-950">
            {parseInlineStyles(quoteText)}
          </p>
        </div>
      );
    }
    // Lists
    else if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!currentList || currentList.type !== "ul") {
        if (currentList) {
          const el = flushList(i);
          if (el) elements.push(el);
        }
        currentList = { type: "ul", items: [] };
      }
      currentList.items.push(line.substring(2));
    } else if (/^\d+\.\s/.test(line)) {
      if (!currentList || currentList.type !== "ol") {
        if (currentList) {
          const el = flushList(i);
          if (el) elements.push(el);
        }
        currentList = { type: "ol", items: [] };
      }
      currentList.items.push(line.replace(/^\d+\.\s+/, ""));
    }
    // Regular text
    else {
      if (currentList) {
        const el = flushList(i);
        if (el) elements.push(el);
      }
      elements.push(
        <p key={i} className="mt-4 leading-relaxed text-slate-600">
          {parseInlineStyles(line)}
        </p>
      );
    }
  }

  if (currentList) {
    const el = flushList(lines.length);
    if (el) elements.push(el);
  }
  if (inBox) {
    const el = flushBox(lines.length);
    if (el) elements.push(el);
  }

  return elements;
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog) notFound();

  // Try to find a doctor matching the author name to display their avatar & title
  const matchedDoctor = await prisma.doctor.findFirst({
    where: {
      name: {
        contains: blog.author.replace(/^(Dr\.\s*)/i, "").trim(),
      },
    },
  });

  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://surgencycare.com/blogs/${blog.slug}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(blog.title);

  return (
    <>
      <article className="py-12 bg-white">
        <div className="container-page max-w-3xl">
          {/* Category & Date Header */}
          <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
            <span>{blog.category}</span>
            <span>•</span>
            <span>{formatDate(blog.publishedAt)}</span>
            <span>•</span>
            <span>{blog.readTime}</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-3xl sm:text-4.5xl font-extrabold text-teal-950 mt-4 leading-tight">
            {blog.title}
          </h1>

          {/* Author Block */}
          <div className="flex items-center gap-3 mt-6 pb-6 border-b border-slate-100">
            {matchedDoctor?.image ? (
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-200">
                <img
                  src={matchedDoctor.image}
                  alt={blog.author}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal font-serif font-bold text-sm">
                {blog.author.replace(/^(Dr\.\s*)/i, "").slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800">{blog.author}</span>
              <span className="text-xs text-slate-400">
                {matchedDoctor ? `${matchedDoctor.title}` : "Surgency Care Specialist Panel"}
              </span>
            </div>
          </div>

          {/* Hero Featured Image */}
          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-3xl shadow-sm border border-slate-100">
            <Media src={blog.coverImage} alt={blog.title} className="h-full w-full object-cover" />
          </div>

          {/* Intro Excerpt */}
          <p className="mt-8 text-base md:text-lg font-medium text-slate-600 leading-relaxed">
            {blog.excerpt}
          </p>

          {/* Dynamic Content Body */}
          <div className="mt-2 text-slate-700 leading-relaxed">{renderContent(blog.content)}</div>

          {/* Disclaimer Block */}
          <div className="mt-10 rounded-2xl bg-slate-50 border border-slate-150 p-6 text-xs text-slate-400 leading-relaxed shadow-sm">
            <h4 className="font-bold text-slate-600 mb-2 uppercase tracking-wider text-[10px]">
              Important Disclaimer
            </h4>
            Results may vary from person to person. The information provided in this article is for educational purposes only and does not replace professional medical advice. Always consult a qualified surgeon for diagnosis and treatment recommendations.
          </div>

          {/* Social Share Buttons */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm"
            >
              <svg className="h-4 w-4 text-emerald-500 fill-current" viewBox="0 0 24 24">
                <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.459 3.479 1.332 5.006L2 22l5.178-1.358c1.472.803 3.125 1.226 4.823 1.226h.005c5.501 0 9.988-4.487 9.988-9.99 0-2.667-1.039-5.176-2.927-7.065A9.927 9.927 0 0012.012 2zm5.72 14.195c-.249.702-1.246 1.278-1.725 1.362-.43.076-.99.141-2.922-.622-2.47-1.02-4.048-3.535-4.17-3.702-.122-.164-1.002-1.332-1.002-2.54 0-1.208.632-1.802.857-2.046.225-.244.492-.305.656-.305.164 0 .328.005.47.01.146.009.342-.056.535.41.197.479.676 1.652.737 1.774.061.122.102.263.02.427-.082.164-.122.263-.246.41l-.371.442c-.122.131-.254.277-.108.527.146.25.648 1.07 1.39 1.733.957.854 1.761 1.118 2.012 1.241.25.122.394.103.54-.066.146-.17.625-.729.792-.979.167-.25.333-.211.56-.127.228.085 1.443.681 1.692.805.249.124.413.185.474.29.061.103.061.601-.188 1.303z" />
              </svg>
              Share on WhatsApp
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm"
            >
              <svg className="h-4 w-4 text-blue-600 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
              Share on Facebook
            </a>
          </div>

          {/* Bottom Free Consultation Callout */}
          <div className="mt-16 text-center border-t border-slate-100 pt-10">
            <h3 className="text-slate-500 font-semibold text-sm">
              Still have questions about {blog.category.toLowerCase()}?
            </h3>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-blue hover:bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white transition shadow-md shadow-blue-500/10"
            >
              <Phone className="h-4 w-4" /> Get Free Consultation
            </Link>
          </div>
        </div>
      </article>

      <CTABand
        title="Ready to Get Expert Surgical Advice?"
        subtitle="Speak to our experts today. We'll help you find the right surgeon and hospital near you."
      />
    </>
  );
}
