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
  await prisma.testimonial.deleteMany();

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
  const aesthetics = await prisma.treatmentCategory.create({
    data: {
      slug: "aesthetics",
      name: "Aesthetics",
      description:
        "Enhance your appearance with safe, advanced cosmetic procedures. Includes gynecomastia, lipoma removal, liposuction, and body contouring.",
      icon: "sparkles",
      color: "#FF9700",
      featured: true,
    },
  });
  const urology = await prisma.treatmentCategory.create({
    data: {
      slug: "urology",
      name: "Urology",
      description:
        "Expert care for urinary tract and male reproductive conditions. Treatment for kidney stones, prostate disorders, and bladder problems.",
      icon: "stethoscope",
      color: "#0ED3B0",
      featured: true,
    },
  });
  const weightLoss = await prisma.treatmentCategory.create({
    data: {
      slug: "weight-loss",
      name: "Weight Loss",
      description:
        "Effective weight management through advanced bariatric procedures including gastric bypass and sleeve gastrectomy.",
      icon: "scale",
      color: "#4E97FD",
      featured: true,
    },
  });
  const laparoscopic = await prisma.treatmentCategory.create({
    data: {
      slug: "laparoscopic",
      name: "Laparoscopic",
      description:
        "Minimally invasive laparoscopic surgery with smaller incisions, less pain, and faster recovery. Treats hernia, gallbladder, and appendix.",
      icon: "activity",
      color: "#4E97FD",
      featured: true,
    },
  });
  const proctology = await prisma.treatmentCategory.create({
    data: {
      slug: "proctology",
      name: "Proctology",
      description:
        "Modern treatment for piles, fissures, fistulas, and other rectal & anal conditions using advanced, minimally invasive techniques.",
      icon: "scalpel",
      color: "#0ED3B0",
      featured: true,
    },
  });
  const ophthal = await prisma.treatmentCategory.create({
    data: {
      slug: "ophthalmology",
      name: "Ophthalmology",
      description:
        "Advanced eye care solutions including cataract surgery, LASIK, and glaucoma treatment to restore and improve vision.",
      icon: "eye",
      color: "#0E606E",
      featured: true,
    },
  });

  console.log("   ✓ 6 categories");

  // ---- Treatments ----
  await prisma.treatment.create({
    data: {
      slug: "gallbladder-stone-removal",
      name: "Gallbladder Stone Removal (Laparoscopic Cholecystectomy)",
      conditionName: "Gallbladder Stones",
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
      categoryId: laparoscopic.id,
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
      conditionName: "Hernia",
      tagline: "Laparoscopic Mesh Repair",
      shortDesc:
        "Specialised hernia correction using laparoscopic, laxative and aesthetic procedures for lasting relief.",
      costMin: 50000,
      costMax: 90000,
      recoveryNote: "Return to daily activities within a week.",
      featured: true,
      categoryId: laparoscopic.id,
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
      conditionName: "Gynecomastia",
      tagline: "Male Chest Correction",
      shortDesc:
        "Male breast reduction for a flatter, more confident chest. Safe and effective day-care procedure.",
      costMin: 45000,
      costMax: 95000,
      recoveryNote: "Resume work in 5–7 days.",
      featured: true,
      categoryId: aesthetics.id,
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
      conditionName: "Stubborn Fat",
      tagline: "VASER / Laser-assisted",
      shortDesc:
        "Remove stubborn fat and achieve a more sculpted body shape with advanced contouring techniques.",
      costMin: 70000,
      costMax: 150000,
      recoveryNote: "Improved body confidence within weeks.",
      categoryId: aesthetics.id,
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
      conditionName: "Piles / Haemorrhoids",
      tagline: "Laser Procedure",
      shortDesc:
        "Painless laser treatment for piles with same-day discharge and minimal recovery time.",
      costMin: 35000,
      costMax: 60000,
      recoveryNote: "Same-day discharge in most cases.",
      categoryId: proctology.id,
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
      conditionName: "Obesity / Excess Weight",
      tagline: "Sleeve / Bypass",
      shortDesc:
        "Sustainable weight-loss surgery for those struggling with obesity and related health conditions.",
      costMin: 250000,
      costMax: 400000,
      recoveryNote: "Gradual return to activity over a few weeks.",
      categoryId: weightLoss.id,
      symptoms: J(["Obesity with BMI over 35", "Diabetes or hypertension linked to weight"]),
      procedureSteps: J(["Laparoscopic sleeve gastrectomy or gastric bypass.", "Reduces stomach capacity for sustained weight loss."]),
      benefits: J(["Significant, sustained weight loss", "Improvement in diabetes and BP", "Better quality of life"]),
      aftercare: J(["Follow a supervised diet plan.", "Regular follow-ups with the surgeon and dietician."]),
    },
  });

  await prisma.treatment.create({
    data: {
      slug: "kidney-stone-laser-treatment",
      name: "Kidney Stone Laser Treatment (RIRS / URSL)",
      conditionName: "Kidney Stones",
      tagline: "Minimally Invasive Laser Lithotripsy",
      shortDesc:
        "Advanced laser technology to dust and remove kidney stones with zero incisions and quick recovery.",
      costMin: 45000,
      costMax: 85000,
      recoveryNote: "Most patients go home the same or next day and resume light activities in 2-3 days.",
      categoryId: urology.id,
      symptoms: J(["Sharp pain in the back or side", "Blood in urine (hematuria)", "Painful or frequent urination", "Nausea or fever in case of infection"]),
      procedureSteps: J(["A thin flexible scope is passed through the natural passage to reach the stone.", "Holmium laser fiber dusts the stone into tiny particles.", "Stone fragments are washed out or retrieved using a basket."]),
      benefits: J(["No surgical cuts or stitches", "High success rate for all stone sizes", "Quick discharge and minimal downtime", "Low risk of complications"]),
      aftercare: J(["Drink plenty of water to flush out stone dust.", "Avoid heavy lifting for 3-5 days.", "Take prescribed medications for smooth recovery."]),
    },
  });

  await prisma.treatment.create({
    data: {
      slug: "lipoma-removal-surgery",
      name: "Lipoma Removal Surgery",
      conditionName: "Lipomas",
      tagline: "Aesthetic Surgical Excision",
      shortDesc:
        "Safe, painless excision of lipoma lumps under local anesthesia with minimal scarring.",
      costMin: 15000,
      costMax: 35000,
      recoveryNote: "Stitch removal in 7-10 days. Resume normal activities the next day.",
      categoryId: aesthetics.id,
      symptoms: J(["Soft, doughy lump under the skin", "Moves easily with slight finger pressure", "Generally painless unless pressing on nerves"]),
      procedureSteps: J(["Area is numbed using local anesthesia.", "A small aesthetic incision is made directly over the lipoma.", "The fatty lump is carefully extracted and closed with fine sutures."]),
      benefits: J(["Immediate and complete removal", "Painless day-care procedure", "Minimal aesthetic scarring", "Low recurrence rate"]),
      aftercare: J(["Keep the dressing clean and dry.", "Avoid stretching the incision area.", "Stitch removal as advised in 7-10 days."]),
    },
  });

  await prisma.treatment.create({
    data: {
      slug: "lasik-eye-surgery",
      name: "Lasik Eye Surgery",
      conditionName: "Vision Issues",
      tagline: "Advanced Vision Correction",
      shortDesc:
        "Say goodbye to glasses and contact lenses with advanced blade-free laser vision correction.",
      costMin: 35000,
      costMax: 75000,
      recoveryNote: "Vision stabilizes within 24-48 hours. Clear sight without glasses.",
      categoryId: ophthal.id,
      symptoms: J(["Short-sightedness (Myopia)", "Far-sightedness (Hyperopia)", "Astigmatism (Blurred vision)", "Dependence on glasses or contact lenses"]),
      procedureSteps: J(["Numbing eye drops are applied for a painless procedure.", "A precise corneal flap is created using a laser.", "The cornea is reshaped to correct vision and the flap is repositioned."]),
      benefits: J(["Quick 10-minute procedure", "Rapid vision recovery within 24 hours", "Permanent freedom from glasses", "Highly safe and precise"]),
      aftercare: J(["Avoid rubbing your eyes.", "Use prescribed antibiotic and lubricating eye drops.", "Wear protective eyewear outdoors for a few days."]),
    },
  });

  console.log("   ✓ 9 treatments");

  // ---- Doctors ----
  await prisma.doctor.create({
    data: {
      slug: "dr-tapeshwar-sehgal",
      name: "Dr. Tapeshwar Sehgal",
      title: "Senior Consultant — Plastic, Burn & Hair Transplant Surgery",
      primarySpecialty: "Plastic Surgery",
      about:
        "Dr. Tapeshwar Sehgal is an esteemed Plastic and Reconstructive Surgeon with over 28 years of clinical experience. He specializes in advanced cosmetic procedures, burn treatment, and hair transplant surgeries, delivering outstanding patient care and natural results.",
      experienceYears: 28,
      rating: 4.9,
      surgeriesCount: 9500,
      consultationFee: 1500,
      featured: true,
      hospitalId: apex.id,
      specialties: J(["Plastic Surgery", "Burn Surgery", "Hair Transplant Surgery"]),
      qualifications: J([
        "MCh — Plastic Surgery",
        "MS — General Surgery",
        "28+ years of experience overall (18 years as a specialist)",
        "Senior Consultant at Apex Multi-Speciality Hospital",
      ]),
    },
  });

  await prisma.doctor.create({
    data: {
      slug: "dr-saurabh-kumar-goyal",
      name: "Dr. Saurabh Kumar Goyal",
      title: "Senior Consultant — Laparoscopic, General & Proctology Surgery",
      primarySpecialty: "General Surgery",
      about:
        "Dr. Saurabh Kumar Goyal is a highly skilled General and Minimally Invasive Surgeon with 18 years of experience. He specializes in laparoscopic surgeries for gallbladder, hernia, and appendix, as well as laser treatment for proctology cases like piles, fissures, and fistulas.",
      experienceYears: 18,
      rating: 4.8,
      surgeriesCount: 6500,
      consultationFee: 1000,
      featured: true,
      hospitalId: shriRam.id,
      specialties: J(["General Surgery", "Laparoscopic Surgery", "Proctology"]),
      qualifications: J([
        "MS — General Surgery",
        "Fellowship in Minimal Access Surgery (FMAS)",
        "18+ years of experience overall (12 years as a specialist)",
      ]),
    },
  });

  await prisma.doctor.create({
    data: {
      slug: "dr-salil-yadav",
      name: "Dr. Salil Yadav",
      title: "Consultant — Robotic & Laparoscopic Surgery",
      primarySpecialty: "General Surgery",
      about:
        "Dr. Salil Yadav is a modern surgical specialist with 13 years of experience. He is highly proficient in performing advanced laparoscopic and robotic procedures, helping patients achieve quicker recovery times with minimal scarring.",
      experienceYears: 13,
      rating: 4.7,
      surgeriesCount: 4200,
      consultationFee: 1200,
      featured: true,
      hospitalId: carewell.id,
      specialties: J(["Robotic Surgery", "Laparoscopic Surgery"]),
      qualifications: J([
        "MS — General Surgery",
        "Fellowship in Robotic Surgery",
        "13+ years of experience overall (7 years as a specialist)",
      ]),
    },
  });

  await prisma.doctor.create({
    data: {
      slug: "dr-sahil-singla",
      name: "Dr. Sahil Singla",
      title: "Consultant — Plastic, Burn & Diabetic Foot Surgery",
      primarySpecialty: "Plastic Surgery",
      about:
        "Dr. Sahil Singla is a board-certified plastic and reconstructive surgeon with 16 years of experience. He is dedicated to burn reconstruction, diabetic foot management, and cosmetic body contouring.",
      experienceYears: 16,
      rating: 4.9,
      surgeriesCount: 5100,
      consultationFee: 1200,
      featured: true,
      hospitalId: apex.id,
      specialties: J(["Plastic Surgery", "Diabetic Foot Surgery", "Burn Surgery"]),
      qualifications: J([
        "MCh — Plastic Surgery",
        "MS — General Surgery",
        "16+ years of experience overall (9 years as a specialist)",
      ]),
    },
  });

  await prisma.doctor.create({
    data: {
      slug: "dr-deepak-kumar-sinha",
      name: "Dr. Deepak Kumar Sinha",
      title: "Consultant — Laparoscopic, General & Proctology Surgery",
      primarySpecialty: "General Surgery",
      about:
        "Dr. Deepak Kumar Sinha is a dedicated general and proctology surgeon with 18 years of experience. He has extensive expertise in laparoscopic and proctological procedures, providing safe and effective treatments for piles, hernia, and stones.",
      experienceYears: 18,
      rating: 4.8,
      surgeriesCount: 5800,
      consultationFee: 1000,
      featured: true,
      hospitalId: shriRam.id,
      specialties: J(["General Surgery", "Laparoscopic Surgery", "Proctology"]),
      qualifications: J([
        "MS — General Surgery",
        "18+ years of experience overall (6 years as a specialist)",
      ]),
    },
  });

  console.log("   ✓ 5 doctors");

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

  // ---- Testimonials ----
  await prisma.testimonial.create({
    data: {
      name: "Gaurav Pandey",
      image: "https://surgencycare.com/wp-content/uploads/2026/05/ChIJNXeRgNIjDTkRes9ZRepU7mo_e07c9bb54f9432440fa86e61f71c3b6b.jpg",
      text: "I would like to express my heartfelt gratitude to Divyansh Chhabra ji and Shavi Arora ji for their incredible support during my surgery. They ensured that all the facilities were arranged exactly as promised. They are very supportive and wonderful people—truly great individuals.",
      time: "2 months ago",
      rating: 5.0,
      featured: true,
    },
  });

  await prisma.testimonial.create({
    data: {
      name: "Rishabh Nigam",
      image: "https://surgencycare.com/wp-content/uploads/2026/05/ChIJNXeRgNIjDTkRes9ZRepU7mo_481f09e4afb0f1be77761b899f019225.jpg",
      text: "I like the healthcare facility provided by Surgency Care for my father piles treatment. Divyansh help me find the best doctor for the treatment at the top hospital of Delhi NCR. Totally recommended!",
      time: "5 months ago",
      rating: 5.0,
      featured: true,
    },
  });

  await prisma.testimonial.create({
    data: {
      name: "nisha arora",
      image: "https://surgencycare.com/wp-content/uploads/2026/05/ChIJNXeRgNIjDTkRes9ZRepU7mo_1a12fce528930a69ad8566558da2c237.jpg",
      text: "Top-notch Ophthalmology at Surgency Care! Had LASIK and it's life-changing. Highly skilled surgeons and excellent facilities. Totally worth it and recommended. 💯",
      time: "5 months ago",
      rating: 5.0,
      featured: true,
    },
  });

  await prisma.testimonial.create({
    data: {
      name: "Adil",
      image: "https://surgencycare.com/wp-content/uploads/2025/10/ChIJNXeRgNIjDTkRes9ZRepU7mo_d8a876e26b954e6a6f9fad6e858ea8a2.jpg",
      text: "Had a good experience. They recommended to an expert doctor and coordinated end to end during dad's surgery. Thanks a lott..✨✨",
      time: "8 months ago",
      rating: 5.0,
      featured: true,
    },
  });

  await prisma.testimonial.create({
    data: {
      name: "Ankush Ahuja",
      image: "https://surgencycare.com/wp-content/uploads/2026/05/ChIJNXeRgNIjDTkRes9ZRepU7mo_89214131cd2272ad5c82f2cc4961be9d.jpg",
      text: "My surgery turned out to be an amazing experience — from the care of the doctors to the smooth recovery, it taught me gratitude, trust, and the true power of modern medicine.",
      time: "9 months ago",
      rating: 5.0,
      featured: true,
    },
  });

  console.log("   ✓ 5 testimonials");
  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
