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
      <Image
        src="/icon.jpg"
        alt="Surgency Care"
        width={100}
        height={100}
        className="h-10 w-10 rounded-xl bg-white p-1 object-contain"
      />
      <span className="font-serif text-xl font-semibold text-white">
        Surgency Care
      </span>
    </Link>
  );
}
