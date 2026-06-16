import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { IconStar } from "@/components/Icons";
import { ConsultationForm } from "@/components/ConsultationForm";

export const metadata: Metadata = {
  title: "Patient Reviews & Testimonials — Surgency Care",
  description: "Read real stories and feedback from patients who underwent surgery with Surgency Care. Verified Google Reviews from Delhi-NCR and Mumbai.",
};

const fallbackTestimonials = [
  {
    id: "fallback-1",
    name: "Gaurav Pandey",
    image: "https://surgencycare.com/wp-content/uploads/2026/05/ChIJNXeRgNIjDTkRes9ZRepU7mo_e07c9bb54f9432440fa86e61f71c3b6b.jpg",
    text: "I would like to express my heartfelt gratitude to Divyansh Chhabra ji and Shavi Arora ji for their incredible support during my surgery. They ensured that all the facilities were arranged exactly as promised. They are very supportive and wonderful people—truly great individuals.",
    time: "2 months ago",
    rating: 5,
  },
  {
    id: "fallback-2",
    name: "Rishabh Nigam",
    image: "https://surgencycare.com/wp-content/uploads/2026/05/ChIJNXeRgNIjDTkRes9ZRepU7mo_481f09e4afb0f1be77761b899f019225.jpg",
    text: "I like the healthcare facility provided by Surgency Care for my father piles treatment. Divyansh help me find the best doctor for the treatment at the top hospital of Delhi NCR. Totally recommended!",
    time: "5 months ago",
    rating: 5,
  },
  {
    id: "fallback-3",
    name: "nisha arora",
    image: "https://surgencycare.com/wp-content/uploads/2026/05/ChIJNXeRgNIjDTkRes9ZRepU7mo_1a12fce528930a69ad8566558da2c237.jpg",
    text: "Top-notch Ophthalmology at Surgency Care! Had LASIK and it's life-changing. Highly skilled surgeons and excellent facilities. Totally worth it and recommended. 💯",
    time: "5 months ago",
    rating: 5,
  },
  {
    id: "fallback-4",
    name: "Adil",
    image: "https://surgencycare.com/wp-content/uploads/2025/10/ChIJNXeRgNIjDTkRes9ZRepU7mo_d8a876e26b954e6a6f9fad6e858ea8a2.jpg",
    text: "Had a good experience. They recommended to an expert doctor and coordinated end to end during dad's surgery. Thanks a lott..✨✨",
    time: "8 months ago",
    rating: 5,
  },
  {
    id: "fallback-5",
    name: "Ankush Ahuja",
    image: "https://surgencycare.com/wp-content/uploads/2026/05/ChIJNXeRgNIjDTkRes9ZRepU7mo_89214131cd2272ad5c82f2cc4961be9d.jpg",
    text: "My surgery turned out to be an amazing experience — from the care of the doctors to the smooth recovery, it taught me gratitude, trust, and the true power of modern medicine.",
    time: "9 months ago",
    rating: 5,
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

  const testimonials = dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials;

  return (
    <>
      {/* Hero section */}
      <section className="hero-gradient">
        <div className="container-page py-16 text-center text-white">
          <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide">
            Patient Feedback
          </span>
          <h1 className="heading-display text-3xl text-white sm:text-4xl">
            Stories of Trust &amp; Recovery
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            Read first-hand accounts from patients who trusted Surgency Care for their treatments. 
            We are proud to maintain high satisfaction rates across Delhi-NCR and Mumbai.
          </p>
        </div>
      </section>

      {/* Ratings summary banner */}
      <section className="bg-slate-50 border-b border-slate-100 py-8">
        <div className="container-page flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange">
              <IconStar className="h-6 w-6 fill-current" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                4.9 / 5 <span className="text-brand-orange font-bold">★★★★★</span>
              </h2>
              <p className="text-sm text-slate-500">Based on Google Reviews and patient surveys</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://search.google.com/local/writereview?placeid=ChIJNXeRgNIjDTkRes9ZRepU7mo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-blue"
            >
              Review Us on Google
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container-page">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, idx) => (
              <div key={t.id ?? idx} className="card flex flex-col justify-between p-8 shadow-sm transition-all duration-300 hover:shadow-md">
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    {t.image ? (
                      <img src={t.image} alt={t.name} className="h-12 w-12 rounded-full object-cover border-2 border-slate-100" />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500 border-2 border-slate-100">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation form at the bottom */}
      <section className="bg-slate-50 py-16 border-t border-slate-100">
        <div className="container-page max-w-4xl">
          <div className="card p-8 md:p-12">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="text-2xl font-bold text-brand-dark">Start Your Recovery Journey</h2>
              <p className="mt-2 text-slate-500">
                Book a free consultation today. Speak with our experts to find the right surgeon and hospital.
              </p>
            </div>
            <ConsultationForm source="testimonials" compact treatments={treatments} />
          </div>
        </div>
      </section>
    </>
  );
}
