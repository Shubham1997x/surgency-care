import type { Metadata } from "next";
import { PageHero } from "@/components/Sections";
import Link from "next/link";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" subtitle="Last updated: June 2026" />
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl text-slate-700 leading-relaxed space-y-8">

          <p className="text-base">
            Welcome to{" "}
            <Link href="/" className="text-brand-blue hover:underline font-semibold">
              Surgency Care
            </Link>
            . By accessing or using our website and services, you agree to be bound by these Terms & Conditions. Please read them carefully.
          </p>

          {/* Section 1 */}
          <div>
            <h2 className="text-lg font-bold text-teal-950 font-serif">1. Acceptance of Terms</h2>
            <p className="mt-2 text-slate-600">
              These Terms & Conditions constitute a legally binding agreement between you and Surgency Care. If you do not agree with any part of these terms, you must not use our website or services.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-lg font-bold text-teal-950 font-serif">2. Our Services</h2>
            <p className="mt-2 text-slate-600">
              Surgency Care is a platform that connects patients with verified surgeons and NABH-accredited hospitals for general, laparoscopic, plastic & aesthetic, urology, and weight-loss surgeries. We provide consultation support, appointment coordination, and guidance throughout your surgical journey. We do not provide medical treatment ourselves.
            </p>
          </div>

          {/* Section 3 (Red Callout) */}
          <div>
            <h2 className="text-lg font-bold text-teal-950 font-serif">3. No Medical Guarantee</h2>
            <div className="mt-3 rounded-2xl bg-red-50/70 p-6 border border-red-100  text-sm leading-relaxed shadow-sm">
              <p className="font-semibold text-red-900">
                Surgency Care does not guarantee any medical outcome, cure, or result from any surgery or treatment.
              </p>
              <p className="mt-2 text-red-800">
                All medical decisions, diagnoses, and treatments are solely between you and the qualified doctor/hospital. Results may vary. Always consult a qualified doctor for personalized medical advice.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-lg font-bold text-teal-950 font-serif">4. User Responsibilities</h2>
            <p className="mt-2 text-slate-600">
              You agree to provide accurate and complete information when using our services. You are responsible for:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-600">
              <li>Providing truthful medical and personal details</li>
              <li>Following the advice and instructions given by your chosen doctor</li>
              <li>Attending scheduled appointments and follow-ups</li>
              <li>Complying with all hospital policies and payment terms</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-lg font-bold text-teal-950 font-serif">5. Consultation and Booking</h2>
            <p className="mt-2 text-slate-600">
              Our free consultation service is for guidance only. The final decision to undergo any surgery rests entirely with you and your doctor. We facilitate the connection but are not a party to the doctor-patient relationship.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-lg font-bold text-teal-950 font-serif">6. Pricing and Payment</h2>
            <p className="mt-2 text-slate-600">
              Approximate costs shown on our website are indicative only and may vary based on the hospital, surgeon, patient condition, and any additional procedures required. Final billing is handled directly by the partner hospital. Insurance and EMI options are subject to the hospital's and insurer's terms.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-lg font-bold text-teal-950 font-serif">7. Intellectual Property</h2>
            <p className="mt-2 text-slate-600">
              All content on this website, including text, images, logos, and design, is the property of Surgency Care and protected by copyright laws. You may not copy, modify, or distribute any content without our prior written permission.
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-lg font-bold text-teal-950 font-serif">8. Limitation of Liability</h2>
            <p className="mt-2 text-slate-600">
              To the fullest extent permitted by law, Surgency Care shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of our website or services, including but not limited to any medical outcomes or decisions made after using our platform.
            </p>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-lg font-bold text-teal-950 font-serif">9. Termination</h2>
            <p className="mt-2 text-slate-600">
              We reserve the right to suspend or terminate your access to our services at any time, without notice, if you breach these Terms & Conditions.
            </p>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-lg font-bold text-teal-950 font-serif">10. Governing Law</h2>
            <p className="mt-2 text-slate-600">
              These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Ghaziabad/Delhi, India.
            </p>
          </div>

          {/* Section 11 */}
          <div>
            <h2 className="text-lg font-bold text-teal-950 font-serif">11. Changes to Terms</h2>
            <p className="mt-2 text-slate-600">
              We may update these Terms & Conditions from time to time. Continued use of our website after any changes constitutes your acceptance of the new terms.
            </p>
          </div>

          {/* Section 12 */}
          <div>
            <h2 className="text-lg font-bold text-teal-950 font-serif">12. Contact Us</h2>
            <div className="mt-3 rounded-2xl bg-slate-50 p-6 border border-slate-100 shadow-sm space-y-2 text-sm text-slate-600">
              <p>
                <strong className="text-slate-800">Email:</strong> legal@surgencycare.com
              </p>
              <p>
                <strong className="text-slate-800">Phone:</strong> +91 97802 99802
              </p>
              <p>
                <strong className="text-slate-800">Address:</strong> Plot No. 12, Sector 10, Vaishali, Ghaziabad, Uttar Pradesh 201010
              </p>
            </div>
          </div>

          {/* Legal Footer Notice */}
          <div className="mt-12 rounded-2xl border border-slate-200 p-6 text-xs text-slate-500 leading-relaxed shadow-sm">
            <strong>Important:</strong> By using Surgency Care's website and services, you acknowledge that you have read, understood, and agreed to these Terms & Conditions. This document is designed to be transparent and compliant with Indian laws. For any clarification, please contact us before proceeding with any consultation or booking.
          </div>

        </div>
      </section>
    </>
  );
}
