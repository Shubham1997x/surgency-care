import Link from "next/link";
import type { Blog, Doctor, Hospital, Treatment, TreatmentCategory } from "@prisma/client";
import { Media } from "./Media";
import { HospitalSlideshow } from "./HospitalSlideshow";
import { formatINR, formatRange, formatDate } from "@/lib/utils";
import { IconStar, IconMapPin, IconArrow, IconAward, Icon, IconStethoscope } from "./Icons";
import { getImageSettings, type ImageSetting } from "@/lib/settings";

export function DoctorCard({ doctor, setting }: { doctor: Doctor & { hospital?: Hospital | null }; setting?: ImageSetting }) {
  const docSetting = setting ?? getImageSettings().doctor;

  // Extract first qualification
  let qualification = "";
  if (doctor.qualifications) {
    try {
      const parsed = JSON.parse(doctor.qualifications);
      if (Array.isArray(parsed) && parsed.length > 0) {
        qualification = parsed[0];
      }
    } catch (e) {
      // Ignore
    }
  }
  if (!qualification) {
    qualification = doctor.primarySpecialty || "Surgeon";
  }

  // Extract city from hospital location
  let city = "";
  if (doctor.hospital?.location) {
    city = doctor.hospital.location.split(",")[0].trim();
  }

  return (
    <div className="card card-hover overflow-hidden flex flex-col justify-between h-full bg-white">
      <div>
        <div className={`relative w-full ${docSetting.aspectRatio} overflow-hidden`}>
          <Media src={doctor.image} alt={doctor.name} className={`h-full w-full ${docSetting.aspectRatio}`} />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-10">
            <h3 className="font-bold text-lg text-white">{doctor.name}</h3>
            <p className="text-xs text-white/95 mt-1 font-medium">
              {qualification} • {doctor.experienceYears}+ years
            </p>
          </div>
        </div>
        <div className="p-6">
          {city && (
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-teal mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-teal shrink-0" />
              {city}
            </div>
          )}
          <p className="line-clamp-3 text-sm text-slate-500 leading-relaxed">{doctor.about}</p>
        </div>
      </div>

      <div className="p-6 pt-0 mt-2 flex items-center justify-between border-t border-slate-50">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Consultation Fee</p>
          <p className="text-xl font-bold text-brand-dark mt-0.5">{formatINR(doctor.consultationFee)}</p>
        </div>
        <Link href={`/doctors/${doctor.slug}`} className="btn-blue px-6 py-2.5 text-xs font-semibold rounded-full shadow-sm">
          View Profile
        </Link>
      </div>
    </div>
  );
}

export function HospitalCard({ hospital, setting }: { hospital: Hospital; setting?: ImageSetting }) {
  const hospSetting = setting ?? getImageSettings().hospital;

  // Parse specialties
  let specs: string[] = [];
  if (hospital.specialties) {
    try {
      const parsed = JSON.parse(hospital.specialties);
      if (Array.isArray(parsed)) {
        specs = parsed;
      }
    } catch (e) {
      // Ignore
    }
  }

  return (
    <div className="card card-hover overflow-hidden flex flex-col justify-between h-full bg-white">
      <div>
        <div className={`relative w-full ${hospSetting.aspectRatio} overflow-hidden`}>
          <HospitalSlideshow imageString={hospital.image} alt={hospital.name} objectFit={hospSetting.objectFit} />
          <span className="absolute right-3 top-3 bg-white/95 text-[10px] font-bold text-slate-700 px-3 py-1 rounded-full border border-slate-100 flex items-center gap-1 shadow-sm">
            <IconAward className="mr-1 h-3.5 w-3.5 text-brand-teal shrink-0" />
            {hospital.accreditation || "NABH Accredited"}
          </span>
        </div>
        <div className="p-6">
          <h3 className="font-bold text-lg text-brand-dark leading-tight">{hospital.name}</h3>
          <p className="text-xs text-slate-500 mt-1">{hospital.location}</p>

          {specs.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {specs.slice(0, 3).map((spec, i) => {
                const colors = [
                  "bg-teal-50 text-teal-700",
                  "bg-orange-50/70 text-orange-600",
                  "bg-blue-50 text-blue-600",
                ];
                return (
                  <span key={spec} className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${colors[i % colors.length]}`}>
                    {spec}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="p-6 pt-0 mt-2 flex items-center justify-end border-t border-slate-50">
        <Link href={`/hospitals/${hospital.slug}`} className="btn-blue px-6 py-2.5 text-xs font-semibold rounded-full shadow-sm">
          View Hospital
        </Link>
      </div>
    </div>
  );
}

export function TreatmentCard({ treatment }: { treatment: Treatment }) {
  const settings = getImageSettings();
  const treatSetting = settings.treatment;

  return (
    <div className="card card-hover flex flex-col overflow-hidden">
      {treatment.image && treatment.image.trim() !== "" ? (
        <div className={`relative w-full ${treatSetting.aspectRatio} overflow-hidden border-b border-slate-100`}>
          <Media src={treatment.image} alt={treatment.name} className={`h-full w-full ${treatSetting.objectFit}`} />
        </div>
      ) : (
        <div className={`relative w-full ${treatSetting.aspectRatio} overflow-hidden border-b border-slate-100 bg-slate-50 flex flex-col items-center justify-center gap-2 text-slate-300`}>
          <IconStethoscope className="h-8 w-8 text-slate-300/80 animate-pulse" />
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Surgency Care</span>
        </div>
      )}
      <div className="flex flex-col flex-1 p-6">
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
        <Icon name={category.icon} className="h-6 w-6" />
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
