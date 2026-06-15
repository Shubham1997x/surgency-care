import type { Metadata } from "next";
import { PageHero, CTABand } from "@/components/Sections";
import { Accordion } from "@/components/Accordion";

export const metadata: Metadata = { title: "Frequently Asked Questions" };

const faqs = [
  {
    q: "How does Surgency Care work?",
    a: "We connect you with verified surgeons and NABH-accredited hospitals. You speak to our care coordinators, share your medical needs, and we recommend the best doctor and hospital for your condition. We then help you book the appointment and support you throughout the journey — completely free.",
  },
  {
    q: "Is the first consultation really free?",
    a: "Yes, your first consultation with our care team is completely free. There is no charge for guidance, getting treatment estimates, or recommending appropriate specialists. You only pay the hospital or doctor for the actual procedure.",
  },
  {
    q: "Do you accept insurance?",
    a: "Yes. We work with all major insurance providers for cashless treatment at our partner hospitals. Our team will help you understand your coverage and complete the documentation so the process is smooth.",
  },
  {
    q: "What is the approximate cost of surgery?",
    a: "Costs vary depending on the procedure, hospital and surgeon. For example, gallbladder stone removal typically ranges from ₹45,000–₹75,000 in Delhi-NCR. We always provide a transparent estimate before you proceed, with no hidden charges.",
  },
  {
    q: "How long does recovery take?",
    a: "Recovery depends on the procedure. Most minimally invasive laparoscopic surgeries allow same-day or next-day discharge, with a return to normal activities within a week. Your surgeon will give you a personalised recovery plan.",
  },
  {
    q: "Are the doctors and hospitals verified?",
    a: "Absolutely. Every doctor on our platform has valid medical registration and a minimum of 10+ years experience. All partner hospitals are NABH-accredited and regularly audited for patient safety and quality standards.",
  },
  {
    q: "Can I choose my own doctor or hospital?",
    a: "Of course. You can choose any doctor or hospital from our network, or we can recommend the best option based on your condition, location and budget. The final choice is always yours.",
  },
];

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="Got Questions?"
        title="Frequently Asked Questions"
        subtitle="Clear answers to the most common questions patients ask about surgery, costs, insurance and the process."
      />
      <section className="py-16">
        <div className="container-page max-w-3xl">
          <Accordion items={faqs} />
        </div>
      </section>
      <CTABand
        title="Have more questions?"
        subtitle="Our team is just a call away and happy to help you anytime."
      />
    </>
  );
}
