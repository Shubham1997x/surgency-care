import type { Metadata } from "next";
import { PageHero, SectionHeading, CTABand } from "@/components/Sections";
import { IconShield, IconHeart, IconStar, IconCheck } from "@/components/Icons";

export const metadata: Metadata = { title: "About Us" };

const drives = [
  { icon: IconShield, title: "Trust & Safety", desc: "Every doctor and hospital is verified. Your safety is our top priority." },
  { icon: IconHeart, title: "Empathy & Care", desc: "We treat every patient like family. Care, communication and empathy matter to us." },
  { icon: IconStar, title: "Affordability", desc: "Quality surgery shouldn't be a burden. We help you access the best care at fair prices." },
];

const promises = [
  "Free consultation with experienced care advisors",
  "Only NABH-accredited partner hospitals",
  "Transparent pricing with insurance & EMI support",
  "24×7 personal support before, during & after surgery",
];

const stats = [
  { value: "1200+", label: "Surgeries Facilitated" },
  { value: "85+", label: "Expert Surgeons" },
  { value: "25+", label: "Partner Hospitals" },
  { value: "4.9", label: "Average Rating" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="Compassionate Surgical Care That You Can Truly Trust"
        subtitle="We are a team of healthcare professionals dedicated to making advanced surgery simple, affordable and stress-free for families across Delhi-NCR and India."
      />

      <section className="py-16">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading center={false} eyebrow="Our Mission" title="Care Without Compromise" />
            <p className="mt-4 text-slate-600">
              At Surgency Care, we believe no one should face the anxiety of surgery alone. We
              connect patients with verified specialists and NABH-accredited hospitals so you receive
              the highest quality care at transparent prices.
            </p>
            <p className="mt-4 text-slate-600">
              From your first call to complete recovery, our care coordinators stay with you at every
              step — 24 hours a day, 7 days a week.
            </p>
          </div>
          <div className="card p-7">
            <span className="badge bg-brand-teal/10 text-brand-dark">Patient-First Approach</span>
            <ul className="mt-5 space-y-4">
              {promises.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-slate-700">
                  <IconCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-teal" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container-page">
          <SectionHeading eyebrow="Our Values" title="What Drives Us" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {drives.map((d) => (
              <div key={d.title} className="card p-7 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-dark">
                  <d.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-brand-dark">{d.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <SectionHeading title="Helping Families Across India" />
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-serif text-4xl font-bold text-brand-teal">{s.value}</p>
                <p className="mt-1 text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to experience care that truly cares?"
        subtitle="Our team is here to answer your questions — with patience and empathy."
      />
    </>
  );
}
