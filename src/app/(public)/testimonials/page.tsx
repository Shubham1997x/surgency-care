import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { IconStar } from "@/components/Icons";
import { ConsultationForm } from "@/components/ConsultationForm";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { ShieldCheck, Play } from "lucide-react";

export const metadata: Metadata = {
  title: "Patient Reviews & Testimonials — Surgency Care",
  description:
    "Read and watch real stories from patients who underwent surgery with Surgency Care. Verified patient testimonials from Delhi-NCR and Mumbai.",
};

function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      return v ? `https://www.youtube.com/embed/${v}` : null;
    }
    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed${u.pathname}`;
    }
    return url;
  } catch {
    return null;
  }
}

const fallbackTestimonials = [
  {
    id: "fallback-1",
    name: "Gaurav Pandey",
    image: null as string | null,
    videoUrl: null as string | null,
    text: "I would like to express my heartfelt gratitude to Divyansh Chhabra ji and Shavi Arora ji for their incredible support during my surgery. They ensured that all the facilities were arranged exactly as promised. They are very supportive and wonderful people — truly great individuals.",
    time: "2 months ago",
    rating: 5,
    treatmentId: null,
  },
  {
    id: "fallback-2",
    name: "Rishabh Nigam",
    image: null as string | null,
    videoUrl: null as string | null,
    text: "I liked the healthcare facility provided by Surgency Care for my father's piles treatment. Divyansh helped me find the best doctor at the top hospital of Delhi NCR. Totally recommended!",
    time: "5 months ago",
    rating: 5,
    treatmentId: null,
  },
  {
    id: "fallback-3",
    name: "Nisha Arora",
    image: null as string | null,
    videoUrl: null as string | null,
    text: "Top-notch Ophthalmology at Surgency Care! Had LASIK and it's life-changing. Highly skilled surgeons and excellent facilities. Totally worth it and recommended.",
    time: "5 months ago",
    rating: 5,
    treatmentId: null,
  },
  {
    id: "fallback-4",
    name: "Adil",
    image: null as string | null,
    videoUrl: null as string | null,
    text: "Had a good experience. They recommended an expert doctor and coordinated end-to-end during my dad's surgery. Thanks a lot!",
    time: "8 months ago",
    rating: 5,
    treatmentId: null,
  },
  {
    id: "fallback-5",
    name: "Ankush Ahuja",
    image: null as string | null,
    videoUrl: null as string | null,
    text: "My surgery turned out to be an amazing experience — from the care of the doctors to the smooth recovery, it taught me gratitude, trust, and the true power of modern medicine.",
    time: "9 months ago",
    rating: 5,
    treatmentId: null,
  },
];

export default async function TestimonialsPage() {
  const dbTestimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  const treatments = await prisma.treatment.findMany({
    select: { name: true, slug: true },
    orderBy: { name: "asc" },
  });

  const allTestimonials = dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials;

  const videoTestimonials = allTestimonials.filter((t) => t.videoUrl);
  const textTestimonials = allTestimonials.filter((t) => !t.videoUrl);

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient">
        <div className="container-page py-16 text-center text-white">
          <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide">
            Patient Stories
          </span>
          <h1 className="heading-display text-3xl text-white sm:text-4xl">
            Stories of Trust &amp; Recovery
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            Hear directly from patients who trusted Surgency Care for their treatments. Real stories,
            real recoveries — from Delhi-NCR and Mumbai.
          </p>
        </div>
      </section>

      {/* Stats banner */}
      <section className="border-b border-slate-100 bg-slate-50 py-8">
        <div className="container-page flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange">
              <IconStar className="h-6 w-6 fill-current" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                4.9 / 5 <span className="font-bold text-brand-orange">★★★★★</span>
              </h2>
              <p className="text-sm text-slate-500">Based on verified patient feedback</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified Patients
            </div>
            <a
              href="https://search.google.com/local/writereview?placeid=ChIJNXeRgNIjDTkRes9ZRepU7mo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-blue"
            >
              Share Your Experience
            </a>
          </div>
        </div>
      </section>

      {/* Video Testimonials — only shown when videos exist */}
      {videoTestimonials.length > 0 && (
        <section className="py-16">
          <div className="container-page">
            <div className="mb-10 text-center">
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-blue">
                <Play className="h-3.5 w-3.5 fill-current" />
                Video Testimonials
              </span>
              <h2 className="text-2xl font-bold text-brand-dark sm:text-3xl">
                Watch Patient Stories
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-slate-500">
                Hear directly from our patients in their own words about their experience with
                Surgency Care.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {videoTestimonials.map((t, idx) => {
                const embedUrl = toEmbedUrl(t.videoUrl!);
                return (
                  <div key={t.id ?? idx} className="card overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
                    {embedUrl ? (
                      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                        <iframe
                          src={embedUrl}
                          title={`Testimonial by ${t.name}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 h-full w-full"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="flex h-44 items-center justify-center bg-slate-100 text-slate-400 text-sm">
                        Video unavailable
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-center gap-3">
                        {t.image ? (
                          <img
                            src={t.image}
                            alt={t.name}
                            className="h-10 w-10 rounded-full object-cover border-2 border-slate-100"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10 text-sm font-bold text-brand-blue">
                            {t.name.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-brand-dark">{t.name}</p>
                          <p className="text-xs text-slate-400">{t.time}</p>
                        </div>
                      </div>
                      {t.text && (
                        <p className="mt-3 text-sm leading-relaxed text-slate-600 italic line-clamp-3">
                          &ldquo;{t.text}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Text Testimonials */}
      {textTestimonials.length > 0 && (
        <section className={`py-16 ${videoTestimonials.length > 0 ? "border-t border-slate-100 bg-slate-50" : ""}`}>
          <div className="container-page">
            <div className="mb-10 text-center">
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                Patient Reviews
              </span>
              <h2 className="text-2xl font-bold text-brand-dark sm:text-3xl">
                What Our Patients Say
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-slate-500">
                Verified experiences shared by patients after their treatment at Surgency Care.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {textTestimonials.map((t, idx) => (
                <div
                  key={t.id ?? idx}
                  className="card flex flex-col justify-between p-8 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <div>
                    <div className="mb-5 flex items-center gap-3">
                      {t.image ? (
                        <img
                          src={t.image}
                          alt={t.name}
                          className="h-12 w-12 rounded-full object-cover border-2 border-slate-100"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/10 text-sm font-bold text-brand-blue">
                          {t.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h3 className="text-sm font-semibold text-brand-dark">{t.name}</h3>
                        <p className="text-xs text-slate-400">{t.time}</p>
                      </div>
                    </div>

                    <div className="mb-4 flex gap-1 text-brand-orange">
                      {Array.from({ length: Math.round(t.rating ?? 5) }).map((_, i) => (
                        <IconStar key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>

                    <p className="text-sm leading-relaxed text-slate-600 italic">
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 text-xs font-medium text-green-600">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified Patient
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <MedicalDisclaimer />

      {/* Consultation CTA */}
      <section className="border-t border-slate-100 bg-white py-16">
        <div className="container-page max-w-4xl">
          <div className="card p-8 md:p-12">
            <div className="mx-auto mb-8 max-w-xl text-center">
              <h2 className="text-2xl font-bold text-brand-dark">Start Your Recovery Journey</h2>
              <p className="mt-2 text-slate-500">
                Book a free consultation today. Speak with our experts to find the right surgeon and
                hospital.
              </p>
            </div>
            <ConsultationForm source="testimonials" compact treatments={treatments} />
          </div>
        </div>
      </section>
    </>
  );
}
