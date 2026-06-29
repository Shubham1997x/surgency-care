import Link from "next/link";
import { LogoWhite } from "./Logo";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className || "h-4 w-4"} fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function IconInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className || "h-4 w-4"} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className || "h-4 w-4"} fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function IconYoutube({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className || "h-4 w-4"} fill="currentColor">
      <path d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z" />
    </svg>
  );
}

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/treatments", label: "Treatments" },
  { href: "/doctors", label: "Doctors" },
  { href: "/hospitals", label: "Hospitals" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faqs", label: "FAQs" },
  { href: "/blogs", label: "Blog" },
];

const socials = [
  { href: "https://www.facebook.com/surgencycare", icon: IconFacebook, label: "Facebook" },
  { href: "https://www.instagram.com/surgencycare/", icon: IconInstagram, label: "Instagram" },
  { href: "https://www.linkedin.com/company/surgency-care/", icon: IconLinkedin, label: "LinkedIn" },
  { href: "https://www.youtube.com/@SurgencyCare", icon: IconYoutube, label: "YouTube" },
];

export function SiteFooter() {
  return (
    <footer className="bg-brand-dark text-white/70">
      {/* Top Contact Banner */}
      <div className="border-b border-white/5 py-8">
        <div className="container-page grid gap-8 md:grid-cols-3">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-white">
              <Phone className="h-5 w-5" fill="currentColor" stroke="none" />
            </div>
            <div>
              <p className="text-sm text-white">Call us for an appointment</p>
              <a href="tel:+919780299802" className="text-sm font-medium text-brand-blue hover:text-white transition-colors">
                +91 97802 99802
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-white">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-white">Feel free to contact us</p>
              <a href="mailto:info@surgencycare.com" className="text-sm font-medium text-brand-blue hover:text-white transition-colors">
                info@surgencycare.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-white">
              <MessageCircle className="h-5 w-5" fill="currentColor" stroke="none" />
            </div>
            <div>
              <p className="text-sm text-white">Chat with us</p>
              <a
                href="https://wa.me/919780299802?text=Hi!%20I%20want%20to%20book%20a%20free%20consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-brand-blue hover:text-white transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 – Brand */}
          <div>
            <LogoWhite />
            <p className="mt-5 text-sm leading-relaxed">
              Surgency Care connects patients across India with verified specialists and accredited hospitals for high-quality, affordable general and plastic surgeries. We offer transparent costs and comprehensive support, making complex surgical journeys simple and accessible.
            </p>
          </div>

          {/* Col 2 – Quick Links */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 – Contact, Hours & Socials */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wide text-white">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+919780299802" className="flex items-center gap-2 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 shrink-0 text-brand-teal" />
                  +91 97802 99802
                </a>
              </li>
              <li>
                <a href="mailto:info@surgencycare.com" className="flex items-center gap-2 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-brand-teal" />
                  info@surgencycare.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                <span>Ground floor, 479, Sector-38,<br />Gurugram, Haryana 122001</span>
              </li>
            </ul>

            <h4 className="mb-4 mt-8 text-sm font-semibold uppercase tracking-wide text-white">Opening Hours</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-brand-teal" />
                Mon – Fri: 07:00 – 22:00
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-brand-teal" />
                Sat – Sun: 08:00 – 20:00
              </li>
            </ul>

            <h4 className="mb-4 mt-8 text-sm font-semibold uppercase tracking-wide text-white">Stay Connected</h4>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-brand-teal"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 4 – Map */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wide text-white">Locate Us</h4>
            <div className="overflow-hidden rounded-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.5486102694836!2d77.0406623762632!3d28.432874193117964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d23d280917735%3A0x6aee54ea4559cf7a!2sSurgency%20Care!5e0!3m2!1sen!2sin!4v1775998875233!5m2!1sen!2sin"
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Surgency Care Location"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 text-center text-xs text-white/50 sm:flex-row sm:justify-between sm:text-left">
          <div className="flex flex-col gap-2 sm:gap-6 sm:flex-row items-center">
            <p>© {new Date().getFullYear()} Surgency Care. All Rights Reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
          <p className="max-w-xl">
            Information on this website is for general awareness only and not a substitute for professional medical advice. Always consult a qualified doctor.
          </p>
        </div>
      </div>
    </footer>
  );
}
