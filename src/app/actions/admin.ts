"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { saveImageSettings } from "@/lib/settings";
import { slugify, linesToJSON } from "@/lib/utils";
import { rename, unlink } from "fs/promises";
import path from "path";

async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/login");
}

async function deleteLocalFile(fileUrl: string | null) {
  if (!fileUrl || !fileUrl.startsWith("/uploads/")) return;
  const filename = fileUrl.substring("/uploads/".length);
  const filePath = path.join(process.cwd(), "public", "uploads", filename);
  try {
    await unlink(filePath);
  } catch (error) {
    // Ignore error if file doesn't exist
    console.error("Failed to delete local file:", error);
  }
}

async function renameUploadedImage(
  oldUrl: string | null,
  newSlug: string,
  prefix: string
): Promise<string | null> {
  if (!oldUrl || !oldUrl.startsWith("/uploads/")) return oldUrl;

  const oldFilename = oldUrl.substring("/uploads/".length);
  const prefixMatch = `${prefix}-${newSlug}-`;
  
  // If the file is already renamed with a timestamp under this prefix and slug, keep it
  if (oldFilename.startsWith(prefixMatch)) {
    return oldUrl;
  }

  const ext = (oldFilename.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const newFilename = `${prefix}-${newSlug}-${Date.now()}.${ext}`;

  const publicDir = path.join(process.cwd(), "public", "uploads");
  const oldPath = path.join(publicDir, oldFilename);
  const newPath = path.join(publicDir, newFilename);

  try {
    await rename(oldPath, newPath);
    return `/uploads/${newFilename}`;
  } catch (error) {
    console.error("Failed to rename image file:", error);
    return oldUrl;
  }
}

/** Ensure a slug is unique within a model; append -2, -3… if taken. */
async function uniqueSlug(
  model: "hospital" | "doctor" | "treatmentCategory" | "treatment" | "blog",
  base: string,
  currentId?: string
): Promise<string> {
  const root = slugify(base) || "item";
  let slug = root;
  let n = 1;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const delegate = (prisma as any)[model];
  while (true) {
    const existing = await delegate.findUnique({ where: { slug } });
    if (!existing || existing.id === currentId) return slug;
    n += 1;
    slug = `${root}-${n}`;
  }
}

const str = (fd: FormData, k: string) => String(fd.get(k) || "").trim();
const num = (fd: FormData, k: string) => {
  const v = parseFloat(String(fd.get(k) || "0").replace(/[^0-9.]/g, ""));
  return Number.isFinite(v) ? v : 0;
};
const int = (fd: FormData, k: string) => Math.round(num(fd, k));
const bool = (fd: FormData, k: string) => fd.get(k) === "on" || fd.get(k) === "true";

/* ------------------------------ HOSPITALS ------------------------------ */
export async function saveHospital(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const name = str(formData, "name");
  const slug = await uniqueSlug("hospital", str(formData, "slug") || name, id || undefined);

  // whyChoose: "Title :: Description" per line
  const whyChoose = JSON.stringify(
    str(formData, "whyChoose")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => {
        const [title, ...rest] = l.split("::");
        return { title: title.trim(), description: rest.join("::").trim() };
      })
  );

  const rawImage = str(formData, "image") || null;
  const image = await renameUploadedImage(rawImage, slug, "hospital");

  const data = {
    slug,
    name,
    location: str(formData, "location"),
    image,
    accreditation: str(formData, "accreditation") || "NABH Accredited",
    about: str(formData, "about"),
    beds: int(formData, "beds"),
    modularOTs: int(formData, "modularOTs"),
    rating: num(formData, "rating"),
    startingPrice: int(formData, "startingPrice"),
    whyChoose,
    specialties: linesToJSON(str(formData, "specialties")),
    featured: bool(formData, "featured"),
  };

  if (id) {
    const existing = await prisma.hospital.findUnique({ where: { id } });
    if (existing && existing.image && existing.image !== image) {
      await deleteLocalFile(existing.image);
    }
    await prisma.hospital.update({ where: { id }, data });
  } else {
    await prisma.hospital.create({ data });
  }

  revalidatePath("/dashboard/hospitals");
  revalidatePath("/hospitals");
  redirect("/dashboard/hospitals");
}

export async function deleteHospital(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const existing = await prisma.hospital.findUnique({ where: { id } });
  if (existing && existing.image) {
    await deleteLocalFile(existing.image);
  }
  await prisma.hospital.delete({ where: { id } });
  revalidatePath("/dashboard/hospitals");
  revalidatePath("/hospitals");
}

/* ------------------------------- DOCTORS ------------------------------- */
export async function saveDoctor(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const name = str(formData, "name");
  const slug = await uniqueSlug("doctor", str(formData, "slug") || name, id || undefined);
  const hospitalId = str(formData, "hospitalId");

  const rawImage = str(formData, "image") || null;
  const image = await renameUploadedImage(rawImage, slug, "doctor");

  const data = {
    slug,
    name,
    title: str(formData, "title"),
    primarySpecialty: str(formData, "primarySpecialty"),
    image,
    about: str(formData, "about"),
    experienceYears: int(formData, "experienceYears"),
    rating: num(formData, "rating"),
    surgeriesCount: int(formData, "surgeriesCount"),
    consultationFee: int(formData, "consultationFee"),
    specialties: linesToJSON(str(formData, "specialties")),
    qualifications: linesToJSON(str(formData, "qualifications")),
    featured: bool(formData, "featured"),
    hospitalId: hospitalId || null,
  };

  if (id) {
    const existing = await prisma.doctor.findUnique({ where: { id } });
    if (existing && existing.image && existing.image !== image) {
      await deleteLocalFile(existing.image);
    }
    await prisma.doctor.update({ where: { id }, data });
  } else {
    await prisma.doctor.create({ data });
  }

  revalidatePath("/dashboard/doctors");
  revalidatePath("/doctors");
  redirect("/dashboard/doctors");
}

export async function deleteDoctor(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const existing = await prisma.doctor.findUnique({ where: { id } });
  if (existing && existing.image) {
    await deleteLocalFile(existing.image);
  }
  await prisma.doctor.delete({ where: { id } });
  revalidatePath("/dashboard/doctors");
  revalidatePath("/doctors");
}

/* -------------------------- TREATMENT CATEGORIES -------------------------- */
export async function saveCategory(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const name = str(formData, "name");
  const slug = await uniqueSlug("treatmentCategory", str(formData, "slug") || name, id || undefined);

  const data = {
    slug,
    name,
    description: str(formData, "description"),
    icon: str(formData, "icon") || "stethoscope",
    color: str(formData, "color") || "#4E97FD",
    featured: bool(formData, "featured"),
  };

  if (id) await prisma.treatmentCategory.update({ where: { id }, data });
  else await prisma.treatmentCategory.create({ data });

  revalidatePath("/dashboard/categories");
  revalidatePath("/treatments");
  redirect("/dashboard/categories");
}

export async function deleteCategory(formData: FormData) {
  await requireAdmin();
  await prisma.treatmentCategory.delete({ where: { id: str(formData, "id") } });
  revalidatePath("/dashboard/categories");
  revalidatePath("/treatments");
}

/* ------------------------------ TREATMENTS ------------------------------ */
export async function saveTreatment(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const name = str(formData, "name");
  const slug = await uniqueSlug("treatment", str(formData, "slug") || name, id || undefined);
  const categoryId = str(formData, "categoryId");

  const rawImage = str(formData, "image") || null;
  const image = await renameUploadedImage(rawImage, slug, "treatment");

  const data = {
    slug,
    name,
    conditionName: str(formData, "conditionName"),
    tagline: str(formData, "tagline"),
    shortDesc: str(formData, "shortDesc"),
    heroDesc: str(formData, "heroDesc"),
    image,
    costMin: int(formData, "costMin"),
    costMax: int(formData, "costMax"),
    recoveryNote: str(formData, "recoveryNote"),
    duration: str(formData, "duration"),
    hospitalStay: str(formData, "hospitalStay"),
    recoveryTime: str(formData, "recoveryTime"),
    successRate: str(formData, "successRate"),
    symptoms: linesToJSON(str(formData, "symptoms")),
    procedureSteps: linesToJSON(str(formData, "procedureSteps")),
    benefits: linesToJSON(str(formData, "benefits")),
    aftercare: linesToJSON(str(formData, "aftercare")),
    featured: bool(formData, "featured"),
    categoryId: categoryId || null,
  };

  if (id) {
    const existing = await prisma.treatment.findUnique({ where: { id } });
    if (existing && existing.image && existing.image !== image) {
      await deleteLocalFile(existing.image);
    }
    await prisma.treatment.update({ where: { id }, data });
  } else {
    await prisma.treatment.create({ data });
  }

  revalidatePath("/dashboard/treatments");
  revalidatePath("/treatments");
  redirect("/dashboard/treatments");
}

export async function deleteTreatment(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const existing = await prisma.treatment.findUnique({ where: { id } });
  if (existing && existing.image) {
    await deleteLocalFile(existing.image);
  }
  await prisma.treatment.delete({ where: { id } });
  revalidatePath("/dashboard/treatments");
  revalidatePath("/treatments");
}

/* -------------------------------- BLOGS -------------------------------- */
export async function saveBlog(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const title = str(formData, "title");
  const slug = await uniqueSlug("blog", str(formData, "slug") || title, id || undefined);

  const rawImage = str(formData, "coverImage") || null;
  const coverImage = await renameUploadedImage(rawImage, slug, "blog");

  const data = {
    slug,
    title,
    category: str(formData, "category") || "General Surgery",
    excerpt: str(formData, "excerpt"),
    content: str(formData, "content"),
    coverImage,
    author: str(formData, "author") || "Surgency Care Team",
    readTime: str(formData, "readTime") || "5 min read",
    featured: bool(formData, "featured"),
  };

  if (id) {
    const existing = await prisma.blog.findUnique({ where: { id } });
    if (existing && existing.coverImage && existing.coverImage !== coverImage) {
      await deleteLocalFile(existing.coverImage);
    }
    await prisma.blog.update({ where: { id }, data });
  } else {
    await prisma.blog.create({ data });
  }

  revalidatePath("/dashboard/blogs");
  revalidatePath("/blogs");
  redirect("/dashboard/blogs");
}

export async function deleteBlog(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const existing = await prisma.blog.findUnique({ where: { id } });
  if (existing && existing.coverImage) {
    await deleteLocalFile(existing.coverImage);
  }
  await prisma.blog.delete({ where: { id } });
  revalidatePath("/dashboard/blogs");
  revalidatePath("/blogs");
}

/* --------------------------------- LEADS --------------------------------- */
export async function deleteLead(formData: FormData) {
  await requireAdmin();
  await prisma.lead.delete({ where: { id: str(formData, "id") } });
  revalidatePath("/dashboard/leads");
}

/* ------------------------------ TESTIMONIALS ------------------------------ */
export async function saveTestimonial(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const name = str(formData, "name");

  const data = {
    name,
    image: str(formData, "image") || null,
    text: str(formData, "text"),
    time: str(formData, "time") || "1 day ago",
    rating: num(formData, "rating") || 5.0,
    featured: bool(formData, "featured"),
    treatmentId: str(formData, "treatmentId") || null,
  };

  if (id) {
    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (existing && existing.image && existing.image !== data.image) {
      await deleteLocalFile(existing.image);
    }
    await prisma.testimonial.update({ where: { id }, data });
  } else {
    await prisma.testimonial.create({ data });
  }

  revalidatePath("/dashboard/testimonials");
  revalidatePath("/testimonials");
  revalidatePath("/");
  redirect("/dashboard/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const existing = await prisma.testimonial.findUnique({ where: { id } });
  if (existing && existing.image) {
    await deleteLocalFile(existing.image);
  }
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/dashboard/testimonials");
  revalidatePath("/testimonials");
  revalidatePath("/");
}

/* ------------------------------- SETTINGS ------------------------------- */
export async function updateImageSettings(formData: FormData) {
  await requireAdmin();
  const settings = {
    doctor: {
      aspectRatio: str(formData, "doctor_aspectRatio") || "aspect-square",
      objectFit: str(formData, "doctor_objectFit") || "object-cover",
    },
    hospital: {
      aspectRatio: str(formData, "hospital_aspectRatio") || "aspect-video",
      objectFit: str(formData, "hospital_objectFit") || "object-cover",
    },
    treatment: {
      aspectRatio: str(formData, "treatment_aspectRatio") || "aspect-video",
      objectFit: str(formData, "treatment_objectFit") || "object-cover",
    },
  };

  saveImageSettings(settings);

  revalidatePath("/doctors");
  revalidatePath("/hospitals");
  revalidatePath("/treatments");
  revalidatePath("/");

  redirect("/dashboard/settings?saved=true");
}


