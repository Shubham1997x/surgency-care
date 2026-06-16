import type { Metadata } from "next";
import { ConsultationForm } from "@/components/ConsultationForm";
import { IconPhone, IconChat, IconMapPin } from "@/components/Icons";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "Contact Us — Book a Free Consultation" };

export default async function ContactPage() {
  const treatments = await prisma.treatment.findMany({
    select: { name: true, slug: true },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <section className="hero-gradient">
        <div className="container-page py-16 text-center text-white">
          <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide">
            We&apos;re Here For You
          </span>
          <h1 className="heading-display text-4xl text-white sm:text-5xl">
            Talk to Us. We&apos;ll Guide You.
            <span className="block text-brand-orange">Completely Free.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            Whether you have questions about surgery, need help choosing a hospital, or want to book
            an appointment — our care team is ready to support you 24×7.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="card p-7">
            <h2 className="text-xl font-semibold text-brand-dark">Book Your Free Consultation</h2>
            <p className="mt-1 text-sm text-slate-500">
              Fill the form below and our team will call you within 15 minutes.
            </p>
            <div className="mt-6">
              <ConsultationForm source="contact" compact treatments={treatments} />
            </div>
          </div>

          <div className="space-y-5">
            <div className="card flex items-start gap-4 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-dark">
                <IconPhone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Call Us Anytime</p>
                <a href="tel:+919780299802" className="text-xl font-bold text-brand-blue">
                  +91 97802 99802
                </a>
                <p className="text-xs text-slate-400">24×7 free helpline & emergency support</p>
              </div>
            </div>
            <div className="card flex items-start gap-4 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-dark">
                <IconChat className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-500">Chat on WhatsApp</p>
                <p className="font-semibold text-brand-dark">Instant Response</p>
                <a
                  href="https://wa.me/911234567890"
                  className="mt-2 inline-flex rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold text-white"
                >
                  Message us on WhatsApp
                </a>
              </div>
            </div>
            <div className="card flex items-start gap-4 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-dark">
                <IconMapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Our Office</p>
                <p className="font-semibold text-brand-dark">Ghaziabad, Uttar Pradesh</p>
                <p className="text-xs text-slate-400">
                  Plot No. 10, Sector 9, Vaishali, Ghaziabad 201010
                </p>
                <p className="text-xs text-slate-400">Mon–Sun: 8:00 AM – 9:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hero-gradient-dark">
        <div className="container-page py-12 text-center text-white">
          <h2 className="heading-display text-xl text-white sm:text-2xl">
            🚑 Need Emergency Surgical Help?
          </h2>
          <p className="mt-2 text-white/80">
            Our team coordinates emergency surgical admissions at partner hospitals 24 hours a day.
          </p>
          <a href="tel:+919780299802" className="btn-primary mt-6">
            <IconPhone className="h-4 w-4" /> Call Emergency Support: +91 97802 99802
          </a>
        </div>
      </section>
    </>
  );
}
