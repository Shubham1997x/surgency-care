import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const J = (arr: unknown[]) => JSON.stringify(arr);

async function main() {
  console.log("🌱 Seeding Surgency Care database…");

  // ---- Admin ----
  const email = process.env.ADMIN_EMAIL || "admin@surgencycare.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash, name: "Surgency Admin" },
  });
  console.log(`   ✓ Admin: ${email} / ${password}`);

  // Clear content tables for idempotent re-seed
  await prisma.treatment.deleteMany();
  await prisma.treatmentCategory.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.hospital.deleteMany();
  await prisma.blog.deleteMany();

  // ---- Hospitals ----
  const shriRam = await prisma.hospital.create({
    data: {
      slug: "shri-ram-hospital",
      name: "Shri Ram Hospital",
      location: "Ghaziabad, Uttar Pradesh",
      accreditation: "NABH Accredited",
      about:
        "Located in the heart of Ghaziabad, Shri Ram Hospital is a NABH-accredited multi-specialty facility known for its excellence in general and laparoscopic surgeries. The hospital features state-of-the-art modular operation theatres and a dedicated team of experienced surgeons committed to safe, patient-first care.",
      beds: 150,
      modularOTs: 8,
      rating: 4.8,
      startingPrice: 45000,
      featured: true,
      whyChoose: J([
        { title: "Advanced Laparoscopic Setup", description: "Modern modular operation theatres with the latest equipment." },
        { title: "24×7 Emergency & ICU Care", description: "Round-the-clock emergency response and critical care." },
        { title: "Cashless Insurance & EMI", description: "Tie-ups with major insurers plus easy EMI options." },
      ]),
      specialties: J(["General Surgery", "Laparoscopic Surgery", "Urology", "Plastic & Aesthetic", "Gastroenterology"]),
    },
  });

  const apex = await prisma.hospital.create({
    data: {
      slug: "apex-multi-speciality-hospital",
      name: "Apex Multi-Speciality Hospital",
      location: "Noida, Sector 62, Uttar Pradesh",
      accreditation: "NABH Accredited",
      about:
        "Apex Multi-Speciality Hospital offers comprehensive surgical care across plastic, aesthetic and reconstructive specialties, supported by advanced diagnostics and a compassionate nursing team.",
      beds: 220,
      modularOTs: 10,
      rating: 4.7,
      startingPrice: 85000,
      featured: true,
      whyChoose: J([
        { title: "Centre of Aesthetic Excellence", description: "Renowned plastic and cosmetic surgery department." },
        { title: "Premium Recovery Suites", description: "Private rooms designed for comfortable recovery." },
      ]),
      specialties: J(["Plastic Surgery", "Aesthetic Surgery", "Bariatrics", "General Surgery"]),
    },
  });

  const carewell = await prisma.hospital.create({
    data: {
      slug: "carewell-super-speciality-hospital",
      name: "Carewell Super Speciality Hospital",
      location: "East Delhi",
      accreditation: "NABH Accredited",
      about:
        "Carewell Super Speciality Hospital specialises in urology and minimally invasive surgical procedures, with a strong focus on patient education and transparent pricing.",
      beds: 180,
      modularOTs: 7,
      rating: 4.6,
      startingPrice: 120000,
      whyChoose: J([
        { title: "Dedicated Urology Wing", description: "Specialised team and equipment for urological care." },
      ]),
      specialties: J(["Urology", "Laparoscopic Surgery", "General Surgery"]),
    },
  });

  console.log("   ✓ 3 hospitals");

  // ---- Treatment Categories ----
  const genLap = await prisma.treatmentCategory.create({
    data: {
      slug: "general-laparoscopic-surgery",
      name: "General & Laparoscopic Surgery",
      description:
        "Minimally invasive procedures for hernia, gallstones, appendix and more — faster recovery and smaller scars.",
      icon: "scalpel",
      color: "#4E97FD",
      featured: true,
    },
  });
  const plastic = await prisma.treatmentCategory.create({
    data: {
      slug: "plastic-aesthetic-surgery",
      name: "Plastic & Aesthetic Surgery",
      description:
        "Reconstructive and cosmetic procedures performed by board-certified plastic surgeons for natural-looking results.",
      icon: "heart",
      color: "#FF9700",
      featured: true,
    },
  });
  const urology = await prisma.treatmentCategory.create({
    data: {
      slug: "urology-weight-loss",
      name: "Urology & Weight Loss",
      description:
        "Stone removal, urological surgery and bariatric weight-loss procedures with experienced specialists.",
      icon: "stethoscope",
      color: "#0ED3B0",
      featured: true,
    },
  });
  const ophthal = await prisma.treatmentCategory.create({
    data: {
      slug: "ophthalmology",
      name: "Ophthalmology",
      description: "Advanced eye-care surgeries including cataract and LASIK with quick, comfortable recovery.",
      icon: "eye",
      color: "#0E606E",
    },
  });

  console.log("   ✓ 4 categories");

  // ---- Treatments ----
  await prisma.treatment.create({
    data: {
      slug: "gallbladder-stone-removal",
      name: "Gallbladder Stone Removal (Laparoscopic Cholecystectomy)",
      tagline: "Laparoscopic Cholecystectomy",
      shortDesc:
        "A safe, minimally invasive surgery to remove the gallbladder and stones. Most patients return home the same day with minimal pain.",
      heroDesc:
        "A safe, minimally invasive surgery to remove the gallbladder and stones. Most patients return home the same day with minimal pain and a faster recovery.",
      image: null,
      costMin: 45000,
      costMax: 75000,
      recoveryNote: "Most patients resume normal activities within a week.",
      featured: true,
      categoryId: genLap.id,
      symptoms: J([
        "Severe pain in the upper-right abdomen",
        "Nausea and vomiting after meals",
        "Indigestion and acidity that doesn't resolve",
        "Pain or jaundice in advanced cases",
      ]),
      procedureSteps: J([
        "Laparoscopic surgery is performed under general anaesthesia through 3–4 tiny incisions.",
        "A thin camera helps the surgeon locate and detach the gallbladder.",
        "The gallbladder, along with stones, is removed and the incisions closed.",
      ]),
      benefits: J([
        "Minimal pain and smaller scars",
        "Shorter hospital stay — often same-day discharge",
        "Quick return to normal activities",
        "Lower risk of infection",
      ]),
      aftercare: J([
        "You can walk the same evening after surgery.",
        "Resume light work in 3–5 days.",
        "Avoid heavy lifting for 2 weeks.",
        "Follow a low-fat diet for a few weeks as advised by your surgeon.",
      ]),
    },
  });

  await prisma.treatment.create({
    data: {
      slug: "hernia-repair-laparoscopic",
      name: "Hernia Repair (Laparoscopic & Open)",
      tagline: "Laparoscopic Mesh Repair",
      shortDesc:
        "Specialised hernia correction using laparoscopic, laxative and aesthetic procedures for lasting relief.",
      costMin: 50000,
      costMax: 90000,
      recoveryNote: "Return to daily activities within a week.",
      featured: true,
      categoryId: genLap.id,
      symptoms: J(["Visible bulge in the abdomen or groin", "Discomfort while lifting or bending", "Aching or pressure at the site"]),
      procedureSteps: J(["Performed laparoscopically or open under anaesthesia.", "A surgical mesh reinforces the weakened area.", "Incisions are closed with minimal scarring."]),
      benefits: J(["Strong, durable repair", "Low recurrence rate", "Faster recovery with laparoscopy"]),
      aftercare: J(["Avoid heavy lifting for 2–3 weeks.", "Walk regularly to aid recovery."]),
    },
  });

  await prisma.treatment.create({
    data: {
      slug: "gynecomastia-surgery",
      name: "Gynecomastia Surgery",
      tagline: "Male Chest Correction",
      shortDesc:
        "Male breast reduction for a flatter, more confident chest. Safe and effective day-care procedure.",
      costMin: 45000,
      costMax: 95000,
      recoveryNote: "Resume work in 5–7 days.",
      featured: true,
      categoryId: plastic.id,
      symptoms: J(["Enlarged or swollen chest tissue in men", "Self-consciousness about chest appearance"]),
      procedureSteps: J(["Performed as a day-care procedure under anaesthesia.", "Excess glandular tissue and fat are removed.", "Chest is contoured for a natural look."]),
      benefits: J(["Minimal scarring", "Permanent results", "Boost in confidence"]),
      aftercare: J(["Wear a compression garment as advised.", "Avoid strenuous exercise for 2–3 weeks."]),
    },
  });

  await prisma.treatment.create({
    data: {
      slug: "liposuction-body-contouring",
      name: "Liposuction & Body Contouring",
      tagline: "VASER / Laser-assisted",
      shortDesc:
        "Remove stubborn fat and achieve a more sculpted body shape with advanced contouring techniques.",
      costMin: 70000,
      costMax: 150000,
      recoveryNote: "Improved body confidence within weeks.",
      categoryId: plastic.id,
      symptoms: J(["Stubborn fat pockets resistant to diet/exercise"]),
      procedureSteps: J(["Targeted fat removal using VASER or laser.", "Sculpted body shape with advanced techniques."]),
      benefits: J(["Targeted fat removal", "VASER / laser assisted", "Improved body confidence"]),
      aftercare: J(["Wear compression garments.", "Stay hydrated and walk daily."]),
    },
  });

  await prisma.treatment.create({
    data: {
      slug: "piles-treatment",
      name: "Piles (Haemorrhoids) Treatment",
      tagline: "Laser Procedure",
      shortDesc:
        "Painless laser treatment for piles with same-day discharge and minimal recovery time.",
      costMin: 35000,
      costMax: 60000,
      recoveryNote: "Same-day discharge in most cases.",
      categoryId: urology.id,
      symptoms: J(["Bleeding during bowel movements", "Itching or discomfort", "Swelling near the anus"]),
      procedureSteps: J(["Laser energy is used to shrink the haemorrhoids.", "Day-care procedure with minimal bleeding."]),
      benefits: J(["Painless and bloodless", "Same-day discharge", "Quick recovery"]),
      aftercare: J(["Maintain a high-fibre diet.", "Stay hydrated to ease bowel movements."]),
    },
  });

  await prisma.treatment.create({
    data: {
      slug: "weight-loss-bariatric-surgery",
      name: "Weight Loss (Bariatric) Surgery",
      tagline: "Sleeve / Bypass",
      shortDesc:
        "Sustainable weight-loss surgery for those struggling with obesity and related health conditions.",
      costMin: 250000,
      costMax: 400000,
      recoveryNote: "Gradual return to activity over a few weeks.",
      categoryId: urology.id,
      symptoms: J(["Obesity with BMI over 35", "Diabetes or hypertension linked to weight"]),
      procedureSteps: J(["Laparoscopic sleeve gastrectomy or gastric bypass.", "Reduces stomach capacity for sustained weight loss."]),
      benefits: J(["Significant, sustained weight loss", "Improvement in diabetes and BP", "Better quality of life"]),
      aftercare: J(["Follow a supervised diet plan.", "Regular follow-ups with the surgeon and dietician."]),
    },
  });

  console.log("   ✓ 6 treatments");

  // ---- Doctors ----
  await prisma.doctor.create({
    data: {
      slug: "dr-rajesh-sharma",
      name: "Dr. Rajesh Sharma",
      title: "Senior Consultant — General & Laparoscopic Surgery",
      primarySpecialty: "General Surgery",
      about:
        "Dr. Rajesh Sharma is a highly experienced General and Laparoscopic Surgeon with over 18 years of expertise. He has successfully performed thousands of minimally invasive surgeries, helping patients recover faster with minimal scarring and discomfort. He specialises in gallbladder stone removal, hernia repair, appendix surgery and piles treatment.",
      experienceYears: 18,
      rating: 4.9,
      surgeriesCount: 8500,
      consultationFee: 800,
      featured: true,
      hospitalId: shriRam.id,
      specialties: J(["Gallbladder Stone Removal", "Hernia Repair", "Appendix Surgery", "Piles (Laser) Treatment"]),
      qualifications: J([
        "MS — General Surgery, King George's Medical University, Lucknow",
        "Fellowship in Minimal Access Surgery (FMAS)",
        "18+ years of surgical experience",
        "Former Senior Consultant at Max Hospital, Ghaziabad",
      ]),
    },
  });

  await prisma.doctor.create({
    data: {
      slug: "dr-priya-mehta",
      name: "Dr. Priya Mehta",
      title: "Consultant — Plastic & Aesthetic Surgery",
      primarySpecialty: "Plastic Surgery",
      about:
        "Dr. Priya Mehta is a board-certified Plastic and Aesthetic Surgeon specialising in gynecomastia correction, liposuction, laser procedures and reconstructive surgery. She is known for natural-looking results and a compassionate, patient-first approach.",
      experienceYears: 12,
      rating: 4.8,
      surgeriesCount: 4200,
      consultationFee: 1200,
      featured: true,
      hospitalId: apex.id,
      specialties: J(["Gynecomastia Surgery", "Liposuction", "Laser Procedures", "Reconstructive Surgery"]),
      qualifications: J([
        "MCh — Plastic Surgery, AIIMS New Delhi",
        "MS — General Surgery",
        "12+ years of aesthetic surgery experience",
        "Member, Association of Plastic Surgeons of India",
      ]),
    },
  });

  await prisma.doctor.create({
    data: {
      slug: "dr-amit-verma",
      name: "Dr. Amit Verma",
      title: "Consultant — Urology & Minimally Invasive Surgery",
      primarySpecialty: "Urology",
      about:
        "Dr. Amit Verma is an expert in kidney stone treatment, prostate surgery and urological procedures. He combines advanced laser techniques with a patient-centred approach for the best outcomes.",
      experienceYears: 15,
      rating: 4.7,
      surgeriesCount: 6100,
      consultationFee: 1000,
      featured: true,
      hospitalId: carewell.id,
      specialties: J(["Kidney Stone Treatment", "Prostate Surgery", "Urological Procedures"]),
      qualifications: J([
        "MCh — Urology, PGIMER Chandigarh",
        "MS — General Surgery",
        "15+ years of urology experience",
      ]),
    },
  });

  console.log("   ✓ 3 doctors");

  // ---- Blogs ----
  await prisma.blog.create({
    data: {
      slug: "gallbladder-stone-removal-what-to-expect",
      title: "Gallbladder Stone Removal: What to Expect Before, During & After Surgery",
      category: "General Surgery",
      excerpt:
        "If your doctor has recommended gallbladder surgery, you may feel anxious about the procedure, recovery and cost. This comprehensive guide walks you through everything you need to know.",
      readTime: "6 min read",
      featured: true,
      content:
        "Gallbladder surgery (laparoscopic cholecystectomy) is one of the most common surgical procedures performed in India.\n\nIf your doctor has recommended surgery, you may feel anxious about the procedure, recovery and cost. This comprehensive guide walks you through everything you need to know.\n\n## What is a gallbladder?\nThe gallbladder is a small organ that stores bile. When stones form, they can cause severe pain, nausea and indigestion.\n\n## The procedure\nThe surgery is performed under general anaesthesia through 3–4 tiny incisions. A thin camera guides the surgeon as the gallbladder is detached and removed.\n\n## Recovery\nMost patients are discharged the same day or the next morning. You can walk the same evening, resume light work in 3–5 days, and return to normal activities within a week.\n\n## Cost\nIn Delhi-NCR, the procedure typically costs between ₹45,000 and ₹75,000 depending on the hospital and insurance coverage.",
    },
  });

  await prisma.blog.create({
    data: {
      slug: "gynecomastia-causes-treatment-options",
      title: "Gynecomastia in Men: Causes, Treatment Options & What Results to Expect",
      category: "Aesthetic Surgery",
      excerpt:
        "Everything you need to know about male breast reduction surgery, including costs and recovery tips so you can make an informed decision.",
      readTime: "5 min read",
      content:
        "Gynecomastia is the enlargement of breast tissue in men. It is more common than most people realise and can affect confidence.\n\n## Causes\nHormonal imbalance, certain medications and lifestyle factors can all contribute.\n\n## Treatment\nSurgery removes excess glandular tissue and fat to restore a flatter chest contour. It is usually a day-care procedure.\n\n## Recovery\nMost men resume work within 5–7 days and see final results once swelling subsides.",
    },
  });

  await prisma.blog.create({
    data: {
      slug: "faster-recovery-after-laparoscopic-hernia-surgery",
      title: "10 Practical Tips for Faster Recovery After Laparoscopic Hernia Surgery",
      category: "Recovery Tips",
      excerpt:
        "Diet, activity restrictions, pain management and warning signs to watch for during your hernia surgery recovery period.",
      readTime: "4 min read",
      content:
        "Laparoscopic hernia repair offers a faster, less painful recovery than open surgery. Here are ten practical tips to help you heal well.\n\n1. Walk gently the same day.\n2. Avoid heavy lifting for 2–3 weeks.\n3. Eat fibre-rich foods to prevent straining.\n4. Stay hydrated.\n5. Take prescribed pain relief on schedule.\n6. Keep the incision clean and dry.\n7. Wear loose, comfortable clothing.\n8. Watch for signs of infection.\n9. Attend all follow-up appointments.\n10. Rest, but don't stay completely immobile.",
    },
  });

  console.log("   ✓ 3 blogs");
  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
