import type { Metadata } from "next";
import { PageHero } from "@/components/Sections";

export const metadata: Metadata = { title: "Terms & Conditions" };

const sections = [
  { h: "1. Acceptance of Terms", p: "By accessing and using the Surgency Care website, you accept and agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services." },
  { h: "2. Nature of Our Service", p: "Surgency Care is a healthcare facilitation platform that connects patients with verified surgeons and accredited hospitals. We do not provide medical treatment ourselves and are not a substitute for professional medical advice, diagnosis or treatment." },
  { h: "3. No Medical Advice", p: "Information on this website, including treatment guides and blog articles, is for educational purposes only. Always consult a qualified doctor before making any healthcare decision." },
  { h: "4. Pricing & Estimates", p: "Cost estimates shown are approximate and may vary based on the hospital, surgeon, your medical condition and insurance coverage. Final pricing is confirmed by the hospital." },
  { h: "5. Third-Party Providers", p: "Doctors and hospitals listed are independent third parties. Surgency Care is not liable for the medical outcomes, conduct or services provided by these third parties." },
  { h: "6. User Responsibilities", p: "You agree to provide accurate information and to use the platform lawfully. You are responsible for verifying details directly with the doctor or hospital before treatment." },
  { h: "7. Changes to Terms", p: "We may update these Terms from time to time. Continued use of the platform after changes constitutes acceptance of the revised Terms." },
];

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" subtitle="Last updated: June 2026" />
      <section className="py-16">
        <div className="container-page max-w-3xl space-y-8">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-lg font-semibold text-brand-dark">{s.h}</h2>
              <p className="mt-2 leading-relaxed text-slate-600">{s.p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
