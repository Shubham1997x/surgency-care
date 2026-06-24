import { ShieldCheck } from "lucide-react";

export function MedicalDisclaimer() {
  return (
    <div className="container-page py-6">
      <div className="rounded-xl border border-brand-dark/15 bg-brand-dark/[0.04] px-6 py-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-dark">
              Medical Disclaimer
            </span>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              Surgency Care does not guarantee any specific medical outcome,
              cure, or result from any surgical procedure or treatment. All
              medical decisions, diagnoses, and treatments are made solely
              between you and your qualified doctor or hospital. Results may
              vary from patient to patient. We strongly recommend that you
              always consult a qualified medical professional for personalized
              medical advice tailored to your individual health needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
