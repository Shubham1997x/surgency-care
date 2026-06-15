import type { Metadata } from "next";
import { PageHero } from "@/components/Sections";

export const metadata: Metadata = { title: "Privacy Policy" };

const sections = [
  { h: "1. Information We Collect", p: "We collect information you provide directly, such as your name, phone number, city and details about your medical condition when you request a consultation or contact us." },
  { h: "2. How We Use Your Information", p: "Your information is used solely to provide our facilitation services — recommending doctors and hospitals, scheduling appointments and supporting you through your treatment journey." },
  { h: "3. Information Sharing", p: "We share your details only with the doctors and hospitals you choose, and only to the extent necessary to arrange your care. We never sell your personal data to third parties." },
  { h: "4. Data Security", p: "We use appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration or disclosure." },
  { h: "5. Your Rights", p: "You may request access to, correction of, or deletion of your personal data at any time by contacting us. You may also opt out of marketing communications." },
  { h: "6. Cookies", p: "Our website may use cookies to improve your browsing experience and understand how visitors use the site. You can control cookies through your browser settings." },
  { h: "7. Contact Us", p: "If you have any questions about this Privacy Policy or how we handle your data, please contact our team via the Contact page." },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="Last updated: June 2026" />
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
