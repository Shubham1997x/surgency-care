import Image from "next/image";

/**
 * Image that gracefully falls back to a branded gradient block when no
 * source is available (e.g. content created without an upload yet).
 */
export function Media({
  src,
  alt,
  className = "",
  initials,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  initials?: string;
}) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-brand-gradient text-white ${className}`}
      >
        <span className="font-serif text-2xl font-bold opacity-90">
          {initials ?? alt.slice(0, 2).toUpperCase()}
        </span>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      className={`object-cover ${className}`}
    />
  );
}
