import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageHero, SectionHeading, CTABand } from "@/components/Sections";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import {
  IconShield, IconHeart, IconStar, IconCheck,
  IconPhone, IconClock, IconUsers, IconAward,
} from "@/components/Icons";
import { ShieldCheck, CreditCard, Building2, Stethoscope } from "lucide-react";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { DoctorCard, HospitalCard } from "@/components/Cards";
import { ConsultationForm } from "@/components/ConsultationForm";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";

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
  { value: "1200+", label: "Surgeries Facilitated", colorClass: "text-[#0ED3B0]" },
  { value: "85+", label: "Expert Surgeons", colorClass: "text-[#4E97FD]" },
  { value: "25+", label: "Partner Hospitals", colorClass: "text-[#FF9700]" },
  { value: "4.9", label: "Average Rating", colorClass: "text-[#0E606E]" },
];

const team = [
  {
    name: "Shavi Arora",
    role: "Founder & CEO",
    bio: "Visionary leader with a mission to make surgical care accessible, transparent and stress-free for every Indian family.",
    image: "/Shavi-Arora-Surgency-Care-Founder-CEO-300x300.png",
  },
  {
    name: "Divyansh Chhabra",
    role: "Co-founder & CEO",
    bio: "Drives growth and partnerships, connecting patients with the best surgical specialists and accredited hospitals nationwide.",
    image: "/Divyansh-Chhabra-Surgency-Care-Co-founder-300x300.png",
  },
  {
    name: "Paras Chandna",
    role: "Co-founder, CTO & CMO",
    bio: "Leads technology and outreach to ensure patients get seamless, data-driven support at every step of their care journey.",
    image: "/Paras-Chandna-Surgency-Care-Co-founder-300x300.jpg",
  },
];

const benefits = [
  { icon: IconPhone, title: "24×7 Emergency Service", desc: "Round-the-clock availability so you're never alone in a medical emergency." },
  { icon: IconClock, title: "Free Consultation", desc: "Speak to our care advisors at no cost — ask anything, anytime." },
  { icon: IconAward, title: "Qualified Doctors", desc: "Every surgeon is verified for qualifications, experience and patient outcomes." },
  { icon: IconUsers, title: "Carebuddy Support", desc: "A dedicated coordinator guides you from first call to full recovery." },
  { icon: CreditCard, title: "EMI Facilities", desc: "Flexible, interest-friendly payment plans so cost is never a barrier." },
  { icon: ShieldCheck, title: "Insurance Support", desc: "We help you navigate insurance claims with zero hassle." },
];

const fallbackTestimonials = [
  {
    id: "f1", name: "Gaurav Pandey", image: "", time: "2 months ago", rating: 5,
    text: "Heartfelt gratitude to the Surgency Care team. They ensured all facilities were arranged exactly as promised and were very supportive throughout.",
  },
  {
    id: "f2", name: "Rishabh Nigam", image: "", time: "5 months ago", rating: 5,
    text: "Great healthcare facility. Divyansh helped me find the best doctor for my father's piles treatment at a top hospital in Delhi NCR. Totally recommended!",
  },
  {
    id: "f3", name: "Nisha Arora", image: "", time: "5 months ago", rating: 5,
    text: "Top-notch experience at Surgency Care! Had LASIK and it's life-changing. Highly skilled surgeons and excellent facilities. Totally worth it.",
  },
  {
    id: "f4", name: "Adil", image: "", time: "8 months ago", rating: 5,
    text: "Good experience. They recommended an expert doctor and coordinated end to end during my dad's surgery. Thanks a lot!",
  },
  {
    id: "f5", name: "Aman", image: "", time: "9 months ago", rating: 5,
    text: "Excellent experience! The team was professional and skilled. My lipoma removal surgery was smooth and successful. I felt supported at every step.",
  },
];

export default async function AboutPage() {
  const [doctors, hospitals, dbTestimonials] = await Promise.all([
    prisma.doctor.findMany({
      where: { featured: true },
      include: { hospital: true },
      take: 3,
      orderBy: { createdAt: "asc" },
    }),
    prisma.hospital.findMany({
      orderBy: [{ featured: "desc" }, { rating: "desc" }],
      take: 6,
    }),
    prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  const testimonials = dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials as any;

  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Compassionate Surgical Care That You Can Truly Trust"
        subtitle="We are a team of healthcare professionals dedicated to making advanced surgery simple, affordable and stress-free for families across Delhi-NCR and India."
      />

      {/* Mission */}
      <section className="py-16">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading center={false} title="Our Mission" />
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

      {/* Team — 3rd section */}
      <section className="bg-slate-50 py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Team"
            title="The People Behind Surgency Care"
            subtitle="A passionate team that built this platform to ensure no patient ever feels lost navigating surgery."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="card p-7 flex flex-col items-center text-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-brand-teal/20">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-brand-dark">{member.name}</h3>
                <span className="mt-1 inline-block rounded-full bg-brand-teal/10 px-3 py-0.5 text-xs font-semibold text-brand-dark">
                  {member.role}
                </span>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
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

      {/* Stats */}
      <section className="bg-slate-50 py-16">
        <div className="container-page">
          <SectionHeading title="Helping Families Across India" />
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className={`font-serif text-4xl font-bold ${s.colorClass}`}>
                  <AnimatedNumber value={s.value} />
                </p>
                <p className="mt-1 text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Surgency Care */}
      <section className="py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Why Choose Surgency Care"
            subtitle="From the moment you reach out to the day you recover — we have you covered at every step."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="card p-7 flex items-start gap-5">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-dark">
                  <b.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-dark">{b.title}</h3>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      {doctors.length > 0 && (
        <section className="bg-slate-50 py-16">
          <div className="container-page">
            <div className="flex items-end justify-between">
              <SectionHeading
                center={false}
                eyebrow="Our Experts"
                title="Meet Our Verified Surgeons"
              />
              <Link href="/doctors" className="hidden text-sm font-semibold text-brand-blue sm:inline">
                View all doctors →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {doctors.map((d) => (
                <DoctorCard key={d.id} doctor={d} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hospitals */}
      {hospitals.length > 0 && (
        <section className="py-16">
          <div className="container-page">
            <div className="flex items-end justify-between">
              <SectionHeading
                center={false}
                eyebrow="Our Network"
                title="Our Accredited Hospital Partners"
              />
              <Link href="/hospitals" className="hidden text-sm font-semibold text-brand-blue sm:inline">
                View all hospitals →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {hospitals.map((h) => (
                <HospitalCard key={h.id} hospital={h} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Patient Testimonials Carousel */}
      <section className="bg-slate-50 py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Patient Stories"
            title="Hear It From Our Patients"
            subtitle="Real stories from patients who trusted Surgency Care for their surgical journey."
          />
          <div className="mt-10">
            <TestimonialCarousel testimonials={testimonials} />
          </div>
          <div className="mt-8 text-center">
            <Link href="/testimonials" className="text-sm font-semibold text-brand-blue hover:underline">
              Read all patient reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionHeading
                center={false}
                eyebrow="Get In Touch"
                title="Book Your Free Consultation"
                subtitle="Tell us about your condition and our care team will reach out with the right guidance — completely free."
              />
              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-dark">
                    <IconPhone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark">Call Us</p>
                    <a href="tel:+919780299802" className="text-sm text-slate-500 hover:text-brand-blue">
                      +91 97802 99802
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-dark">
                    <IconClock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark">Available 24×7</p>
                    <p className="text-sm text-slate-500">Our team is here whenever you need us</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-dark">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark">100% Confidential</p>
                    <p className="text-sm text-slate-500">Your information is safe and private</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card p-8">
              <ConsultationForm source="about" />
            </div>
          </div>
        </div>
      </section>

      <MedicalDisclaimer />

      <CTABand
        title="Ready to experience care that truly cares?"
        subtitle="Our team is here to answer your questions — with patience and empathy."
      />
    </>
  );
}
