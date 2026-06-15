import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`}>
      <Image
        src="/logo.png"
        alt="Surgency Care"
        width={180}
        height={50}
        priority
        className="h-9 w-auto"
      />
    </Link>
  );
}

/** White wordmark for dark backgrounds (footer). */
export function LogoWhite({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" />
          <path d="m8.5 12 2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="font-serif text-xl font-semibold text-white">
        Surgency Care
      </span>
    </Link>
  );
}
