import Link from "next/link";
import type { Blog, Doctor, Hospital, Treatment, TreatmentCategory } from "@prisma/client";
import { Media } from "./Media";
import { formatINR, formatRange, formatDate } from "@/lib/utils";
import { IconStar, IconMapPin, IconArrow, IconAward } from "./Icons";

export function DoctorCard({ doctor }: { doctor: Doctor & { hospital?: Hospital | null } }) {
  return (
    <div className="card card-hover overflow-hidden">
      <div className="relative h-48">
        <Media src={doctor.image} alt={doctor.name} className="h-full w-full" />
        <span className="badge absolute left-3 top-3 bg-brand-teal text-white">
          {doctor.primarySpecialty || "Surgeon"}
        </span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="font-semibold text-white">{doctor.name}</h3>
          <p className="text-xs text-white/80">
            {doctor.title} • {doctor.experienceYears}+ yrs exp
          </p>
        </div>
      </div>
      <div className="p-5">
        <p className="line-clamp-2 text-sm text-slate-500">{doctor.about}</p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Consultation from</p>
            <p className="font-semibold text-brand-dark">{formatINR(doctor.consultationFee)}</p>
          </div>
          <Link href={`/doctors/${doctor.slug}`} className="btn-blue px-5 py-2 text-xs">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export function HospitalCard({ hospital }: { hospital: Hospital }) {
  return (
    <div className="card card-hover overflow-hidden">
      <div className="relative h-44">
        <Media src={hospital.image} alt={hospital.name} className="h-full w-full" />
        <span className="badge absolute left-3 top-3 bg-white/95 text-brand-dark">
          <IconAward className="mr-1 h-3.5 w-3.5 text-brand-teal" /> {hospital.accreditation}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-brand-dark">{hospital.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
          <IconMapPin className="h-3.5 w-3.5" /> {hospital.location}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Starting from</p>
            <p className="font-semibold text-brand-orange">{formatINR(hospital.startingPrice)}</p>
          </div>
          <Link href={`/hospitals/${hospital.slug}`} className="btn-blue px-5 py-2 text-xs">
            View Hospital
          </Link>
        </div>
      </div>
    </div>
  );
}

export function TreatmentCard({ treatment }: { treatment: Treatment }) {
  return (
    <div className="card card-hover flex flex-col p-6">
      <h3 className="font-semibold text-brand-dark">{treatment.name}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-500">{treatment.shortDesc}</p>
      <div className="mt-4 border-t border-slate-100 pt-4">
        <p className="text-xs text-slate-400">Approx. cost</p>
        <p className="text-sm font-semibold text-brand-dark">
          {formatRange(treatment.costMin, treatment.costMax)}
        </p>
      </div>
      <Link
        href={`/treatments/${treatment.slug}`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue"
      >
        Learn more <IconArrow className="h-4 w-4" />
      </Link>
    </div>
  );
}

export function CategoryCard({
  category,
  count,
}: {
  category: TreatmentCategory;
  count?: number;
}) {
  return (
    <Link href={`/treatments/category/${category.slug}`} className="card card-hover block p-6">
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-white"
        style={{ backgroundColor: category.color }}
      >
        <IconStar className="h-6 w-6" />
      </div>
      <h3 className="font-semibold text-brand-dark">{category.name}</h3>
      <p className="mt-2 line-clamp-2 text-sm text-slate-500">{category.description}</p>
      <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue">
        Explore {count != null ? `(${count})` : ""} <IconArrow className="h-4 w-4" />
      </p>
    </Link>
  );
}

export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="card card-hover block overflow-hidden">
      <div className="relative h-44">
        <Media src={blog.coverImage} alt={blog.title} className="h-full w-full" />
        <span className="badge absolute left-3 top-3 bg-brand-blue text-white">
          {blog.category}
        </span>
      </div>
      <div className="p-5">
        <p className="text-xs text-slate-400">
          {formatDate(blog.publishedAt)} • {blog.readTime}
        </p>
        <h3 className="mt-2 line-clamp-2 font-semibold text-brand-dark">{blog.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-500">{blog.excerpt}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue">
          Read Full Article <IconArrow className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
