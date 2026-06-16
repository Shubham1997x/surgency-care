import type { Metadata } from "next";
import { PageHero } from "@/components/Sections";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="Last updated: June 2026" />
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl text-slate-700 leading-relaxed space-y-8">
          
          <p className="text-base">
            At Surgency Care, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or use our services.
          </p>

          {/* Section 1 */}
          <div>
            <h2 className="text-lg font-bold text-teal-950 font-serif">1. Information We Collect</h2>
            <p className="mt-2 text-slate-600">
              We may collect the following types of information:
            </p>
            <ul className="mt-3 space-y-3 text-slate-600 list-none pl-0">
              <li className="pl-0">
                <strong className="text-slate-800">Personal Information:</strong> Name, phone number, email address, city, and medical condition details you provide when booking a consultation.
              </li>
              <li className="pl-0">
                <strong className="text-slate-800">Health Information:</strong> Details about your symptoms or required treatment (shared only with verified doctors and hospitals with your consent).
              </li>
              <li className="pl-0">
                <strong className="text-slate-800">Usage Data:</strong> IP address, browser type, pages visited, and time spent on our website (collected via cookies for improving user experience).
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-lg font-bold text-teal-950 font-serif">2. How We Use Your Information</h2>
            <p className="mt-2 text-slate-600">
              We use the information we collect to:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-600">
              <li>Provide free consultation and connect you with suitable doctors and hospitals</li>
              <li>Process appointment bookings and coordinate with partner hospitals</li>
              <li>Improve our website and services</li>
              <li>Send important updates regarding your consultation or surgery (with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-lg font-bold text-teal-950 font-serif">3. Sharing of Information</h2>
            <p className="mt-2 text-slate-600">
              We do not sell your personal data. We may share your information only with:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-600">
              <li>Verified doctors and NABH-accredited hospitals (only the necessary details required for your treatment)</li>
              <li>Service providers who help us operate our platform (under strict confidentiality agreements)</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-lg font-bold text-teal-950 font-serif">4. Data Security</h2>
            <p className="mt-2 text-slate-600">
              We implement reasonable security measures to protect your personal and health information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-lg font-bold text-teal-950 font-serif">5. Cookies and Tracking</h2>
            <p className="mt-2 text-slate-600">
              Our website uses essential cookies to provide a smooth experience. You can manage cookie preferences through your browser settings. We do not use cookies for targeted advertising.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-lg font-bold text-teal-950 font-serif">6. Your Rights</h2>
            <p className="mt-2 text-slate-600">
              You have the right to:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-600 mb-3">
              <li>Access, correct, or delete your personal information</li>
              <li>Withdraw consent for processing your data at any time</li>
              <li>Request a copy of the data we hold about you</li>
            </ul>
            <p className="text-slate-600">
              To exercise these rights, please contact us at the details provided below.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-lg font-bold text-teal-950 font-serif">7. Changes to This Policy</h2>
            <p className="mt-2 text-slate-600">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date.
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-lg font-bold text-teal-950 font-serif">8. Contact Us</h2>
            <p className="mt-2 text-slate-600">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="mt-3 rounded-2xl bg-slate-50 p-6 border border-slate-100 shadow-sm space-y-2 text-sm text-slate-600">
              <p>
                <strong className="text-slate-800">Email:</strong> privacy@surgencycare.com
              </p>
              <p>
                <strong className="text-slate-800">Phone:</strong> +91 97802 99802
              </p>
              <p>
                <strong className="text-slate-800">Address:</strong> Plot No. 12, Sector 10, Vaishali, Ghaziabad, Uttar Pradesh 201010
              </p>
            </div>
          </div>

          {/* Compliance Footer Box */}
          <div className="mt-12 rounded-2xl border border-slate-200 p-6 text-xs text-slate-500 leading-relaxed shadow-sm">
            <strong>Important Note:</strong> By using our website and services, you consent to the collection and use of information as described in this Privacy Policy. This policy is in compliance with applicable Indian laws including the Digital Personal Data Protection Act, 2023.
          </div>

        </div>
      </section>
    </>
  );
}
