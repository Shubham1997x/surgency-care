import type { Metadata } from "next";
import { PageHero } from "@/components/Sections";
import { Accordion } from "@/components/Accordion";
import { Phone } from "lucide-react";

export const metadata: Metadata = { title: "Frequently Asked Questions" };

const faqs = [
  {
    q: "How does Surgency Care work?",
    a: "We connect you with verified surgeons and NABH-accredited hospitals. You speak to our care coordinator, share your medical details, and we recommend the best doctor and hospital based on your condition, location, and budget. We then help you book the appointment and support you throughout the journey.",
  },
  {
    q: "Is the first consultation really free?",
    a: "Yes, your first consultation with our care team is completely free. There is no charge for speaking to our experts, getting treatment guidance, or understanding approximate costs. You only pay if you decide to proceed with surgery.",
  },
  {
    q: "Do you accept insurance?",
    a: "Yes. We work with all major insurance providers for cashless treatment at our partner hospitals. Our team will help you with pre-authorization and documentation so the process is smooth.",
  },
  {
    q: "What is the approximate cost of surgery?",
    a: "Costs vary depending on the procedure, hospital, and surgeon. For example:\n• Gallbladder Stone Removal: ₹45,000 – ₹85,000\n• Hernia Repair: ₹55,000 – ₹95,000\n• Gynecomastia Correction: ₹65,000 – ₹1,20,000\n\nWe provide transparent estimates before you decide.",
  },
  {
    q: "How long does recovery take?",
    a: "Recovery time depends on the procedure. Most laparoscopic surgeries allow you to return to light work within 3–7 days. We provide detailed post-surgery care instructions and follow-up support until you fully recover.",
  },
  {
    q: "Are the doctors and hospitals verified?",
    a: "Yes. Every doctor on our platform has valid medical registration and minimum 10+ years of experience. All partner hospitals are NABH accredited and regularly audited for patient safety and quality standards.",
  },
  {
    q: "Can I choose my own doctor or hospital?",
    a: "Absolutely. You can choose any doctor or hospital from our network, or we can recommend the best option based on your medical condition, location, and budget.",
  },
];

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="Have Questions?"
        title="Frequently Asked Questions"
        subtitle="Clear answers to the most common questions patients ask about surgery, costs, insurance and the process."
      />
      <section className="py-16 bg-slate-50/50">
        <div className="container-page max-w-3xl">
          <Accordion items={faqs} />
        </div>
      </section>

      {/* Care Team Banner */}
      <section className="bg-slate-50/50 pb-20 text-center">
        <div className="container-page max-w-2xl">
          <p className="text-sm font-semibold text-slate-500 mb-4">Still have questions?</p>
          <div className="relative inline-block mb-14">
            <a
              href="tel:+919780299802"
              className="inline-flex items-center gap-2 rounded-full bg-[#3b82f6] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-blue-500/10"
            >
              <Phone className="h-4 w-4 shrink-0 fill-current" />
              Speak to Our Care Team
            </a>

          </div>

          <div className="space-y-2 text-sm text-slate-500 font-medium leading-relaxed max-w-lg mx-auto">
            <p>
              We are committed to making your surgical journey simple, transparent, and stress-free.
            </p>
            <p>
              Your health and peace of mind are our top priorities.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
