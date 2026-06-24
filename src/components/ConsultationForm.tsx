"use client";

import { useActionState, useState } from "react";
import { submitLead, type LeadResult } from "@/app/actions/leads";
import { IconCheck, IconPhone } from "./Icons";

type FieldErrors = {
  name?: string;
  phone?: string;
  city?: string;
  condition?: string;
};

function validateName(v: string) {
  if (!v) return "Full name is required";
  if (v.length < 3) return "Name must be at least 3 characters";
  if (!/^[a-zA-Z\s'.'-]+$/.test(v)) return "Name can only contain letters and spaces";
  return undefined;
}

function validatePhone(v: string) {
  if (!v) return "Phone number is required";
  const digits = v.replace(/[\s\-+()]/g, "");
  if (!/^\d{7,12}$/.test(digits)) return "Enter a valid phone number";
  return undefined;
}

function validateCity(v: string) {
  if (v && v.length < 2) return "City must be at least 2 characters";
  return undefined;
}

function validateCondition(v: string) {
  if (!v) return "Please select or enter your condition / treatment needed";
  if (v.length < 2) return "Please describe your condition briefly";
  return undefined;
}

const COUNTRY_CODES = [
  { code: "+91", label: "+91 (India)" },
  { code: "+1", label: "+1 (USA/Canada)" },
  { code: "+44", label: "+44 (UK)" },
  { code: "+971", label: "+971 (UAE)" },
  { code: "+966", label: "+966 (Saudi Arabia)" },
  { code: "+61", label: "+61 (Australia)" },
  { code: "+65", label: "+65 (Singapore)" },
  { code: "+60", label: "+60 (Malaysia)" },
  { code: "+974", label: "+974 (Qatar)" },
  { code: "+968", label: "+968 (Oman)" },
  { code: "+49", label: "+49 (Germany)" },
  { code: "+33", label: "+33 (France)" },
  { code: "+81", label: "+81 (Japan)" },
];

export function ConsultationForm({
  source = "contact",
  conditionDefault = "",
  compact = false,
  treatments = [],
}: {
  source?: string;
  conditionDefault?: string;
  compact?: boolean;
  treatments?: { name: string; slug: string }[];
}) {
  const [state, action, pending] = useActionState<LeadResult | null, FormData>(
    submitLead,
    null
  );

  const [errors, setErrors] = useState<FieldErrors>({});
  const [countryCode, setCountryCode] = useState("+91");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function clearError(field: keyof FieldErrors) {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleBlur(field: keyof FieldErrors, value: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validators = { name: validateName, phone: validatePhone, city: validateCity, condition: validateCondition };
    const err = validators[field](value);
    setErrors((prev) => ({ ...prev, [field]: err }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const city = String(fd.get("city") || "").trim();
    const condition = String(fd.get("condition") || "").trim();

    const newErrors: FieldErrors = {
      name: validateName(name),
      phone: validatePhone(phone),
      city: validateCity(city),
      condition: validateCondition(condition),
    };

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      e.preventDefault();
      setErrors(newErrors);
      setTouched({ name: true, phone: true, city: true, condition: true });
    } else {
      setErrors({});
    }
  }

  if (state?.ok) {
    return (
      <div className="rounded-xl bg-brand-teal/10 p-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal text-white">
          <IconCheck className="h-6 w-6" />
        </div>
        <h4 className="font-semibold text-brand-dark">Thank you! We&apos;ll call you back.</h4>
        <p className="mt-1 text-sm text-slate-600">
          Our care team will reach out shortly to guide you — completely free.
        </p>
      </div>
    );
  }

  const fieldClass = (field: keyof FieldErrors) =>
    `field-input ${touched[field] && errors[field] ? "border-red-400 focus:border-red-500 focus:ring-red-200" : touched[field] && !errors[field] ? "border-green-400 focus:border-green-500 focus:ring-green-100" : ""}`;

  return (
    <form action={action} onSubmit={handleSubmit} noValidate className="space-y-4">
      <input type="hidden" name="source" value={source} />

      <div className={compact ? "grid gap-4 sm:grid-cols-2" : "space-y-4"}>
        {/* Full Name */}
        <div>
          <label className="field-label font-medium text-slate-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            placeholder="Enter your name"
            className={fieldClass("name")}
            onChange={(e) => clearError("name")}
            onBlur={(e) => handleBlur("name", e.target.value.trim())}
          />
          {touched.name && errors.name && (
            <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
              <span>⚠</span> {errors.name}
            </p>
          )}
          {touched.name && !errors.name && (
            <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-green-600">
              <span>✓</span> Looks good
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="field-label font-medium text-slate-700">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input type="hidden" name="countryCode" value={countryCode} />
          <div className="flex gap-2">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="field-input w-36 flex-shrink-0 bg-white"
              aria-label="Country code"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>{c.label}</option>
              ))}
            </select>
            <input
              name="phone"
              type="tel"
              placeholder="98765 43210"
              className={`${fieldClass("phone")} flex-1`}
              onChange={(e) => clearError("phone")}
              onBlur={(e) => handleBlur("phone", e.target.value.trim())}
            />
          </div>
          {touched.phone && errors.phone && (
            <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
              <span>⚠</span> {errors.phone}
            </p>
          )}
          {touched.phone && !errors.phone && (
            <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-green-600">
              <span>✓</span> Looks good
            </p>
          )}
        </div>
      </div>

      <div className={compact ? "grid gap-4 sm:grid-cols-2" : "space-y-4"}>
        {/* City */}
        <div>
          <label className="field-label font-medium text-slate-700">City / Location</label>
          <input
            name="city"
            placeholder="e.g. Gurugram"
            className={fieldClass("city")}
            onChange={(e) => clearError("city")}
            onBlur={(e) => handleBlur("city", e.target.value.trim())}
          />
          {touched.city && errors.city && (
            <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
              <span>⚠</span> {errors.city}
            </p>
          )}
        </div>

        {/* Condition */}
        <div>
          <label className="field-label font-medium text-slate-700">
            Condition / Treatment Needed <span className="text-red-500">*</span>
          </label>
          {treatments && treatments.length > 0 ? (
            <select
              name="condition"
              className={`field-input bg-white ${touched.condition && errors.condition ? "border-red-400" : ""}`}
              onChange={(e) => clearError("condition")}
              onBlur={(e) => handleBlur("condition", e.target.value.trim())}
            >
              <option value="">Select a treatment...</option>
              {treatments.map((t) => (
                <option key={t.slug} value={t.name}>{t.name}</option>
              ))}
              <option value="Other">Other / Not Listed</option>
            </select>
          ) : (
            <input
              name="condition"
              defaultValue={conditionDefault}
              placeholder="e.g. Gallbladder Stone"
              className={fieldClass("condition")}
              onChange={(e) => clearError("condition")}
              onBlur={(e) => handleBlur("condition", e.target.value.trim())}
            />
          )}
          {touched.condition && errors.condition && (
            <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
              <span>⚠</span> {errors.condition}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="field-label font-medium text-slate-700">Brief Description (Optional)</label>
        <textarea
          name="message"
          rows={3}
          placeholder="Describe your symptoms or any questions you have…"
          className="field-input resize-none"
        />
      </div>

      {/* Server error */}
      {state?.error && (
        <div className="flex items-start gap-2.5 rounded-xl bg-red-50 p-4 text-xs text-red-700 border border-red-100">
          <span className="mt-0.5 flex-shrink-0">⚠</span>
          <div>
            <span className="font-semibold block mb-0.5">Submission failed</span>
            <span className="opacity-90 leading-normal">{state.error}</span>
          </div>
        </div>
      )}

      <button type="submit" disabled={pending} className="btn-blue w-full">
        <IconPhone className="h-4 w-4" />
        {pending ? "Submitting…" : "Submit & Get a Call Back"}
      </button>
      <p className="text-center text-xs text-slate-400">
        Your information is safe with us. We respect your privacy.
      </p>
    </form>
  );
}
