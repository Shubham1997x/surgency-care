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

  // ---- Treatment Categories ----
  await prisma.treatmentCategory.create({
    data: {
      id: "cmqf7zdh00004kz7w0cgi3kij",
      slug: "aesthetics",
      name: "Aesthetics",
      description: "Enhance your appearance with safe, advanced cosmetic procedures. Includes gynecomastia, lipoma removal, liposuction, and body contouring.",
      icon: "sparkles",
      color: "#FF9700",
      featured: true,
    }
  });

  await prisma.treatmentCategory.create({
    data: {
      id: "cmqf7zdha0005kz7ws85bp0wz",
      slug: "urology",
      name: "Urology",
      description: "Expert care for urinary tract and male reproductive conditions. Treatment for kidney stones, prostate disorders, and bladder problems.",
      icon: "stethoscope",
      color: "#0ED3B0",
      featured: true,
    }
  });

  await prisma.treatmentCategory.create({
    data: {
      id: "cmqf7zdhj0006kz7w0bu6avrh",
      slug: "weight-loss",
      name: "Weight Loss",
      description: "Effective weight management through advanced bariatric procedures including gastric bypass and sleeve gastrectomy.",
      icon: "scale",
      color: "#4E97FD",
      featured: true,
    }
  });

  await prisma.treatmentCategory.create({
    data: {
      id: "cmqf7zdhr0007kz7whbmppv4o",
      slug: "laparoscopic",
      name: "Laparoscopic",
      description: "Minimally invasive laparoscopic surgery with smaller incisions, less pain, and faster recovery. Treats hernia, gallbladder, and appendix.",
      icon: "activity",
      color: "#4E97FD",
      featured: true,
    }
  });

  await prisma.treatmentCategory.create({
    data: {
      id: "cmqf7zdi00008kz7w6y9p42oa",
      slug: "proctology",
      name: "Proctology",
      description: "Modern treatment for piles, fissures, fistulas, and other rectal & anal conditions using advanced, minimally invasive techniques.",
      icon: "scalpel",
      color: "#0ED3B0",
      featured: true,
    }
  });

  await prisma.treatmentCategory.create({
    data: {
      id: "cmqf7zdi90009kz7w6twosx17",
      slug: "ophthalmology",
      name: "Ophthalmology",
      description: "Advanced eye care solutions including cataract surgery, LASIK, and glaucoma treatment to restore and improve vision.",
      icon: "eye",
      color: "#0E606E",
      featured: true,
    }
  });

  // ---- Hospitals ----
  await prisma.hospital.create({
    data: {
      id: "cmqf7zdg70001kz7w7nhhufoe",
      slug: "shri-ram-hospital",
      name: "Shri Ram Hospital",
      location: "Ghaziabad, Uttar Pradesh",
      accreditation: "NABH Accredited",
      about: "Located in the heart of Ghaziabad, Shri Ram Hospital is a NABH-accredited multi-specialty facility known for its excellence in general and laparoscopic surgeries. The hospital features state-of-the-art modular operation theatres and a dedicated team of experienced surgeons committed to safe, patient-first care.",
      beds: 150,
      modularOTs: 8,
      rating: 4.8,
      startingPrice: 45000,
      featured: true,
      image: null,
      whyChoose: "[{\"title\":\"Advanced Laparoscopic Setup\",\"description\":\"Modern modular operation theatres with the latest equipment.\"},{\"title\":\"24×7 Emergency & ICU Care\",\"description\":\"Round-the-clock emergency response and critical care.\"},{\"title\":\"Cashless Insurance & EMI\",\"description\":\"Tie-ups with major insurers plus easy EMI options.\"}]",
      specialties: "[\"General Surgery\",\"Laparoscopic Surgery\",\"Urology\",\"Plastic & Aesthetic\",\"Gastroenterology\"]",
    }
  });

  await prisma.hospital.create({
    data: {
      id: "cmqf7zdgh0002kz7wfwo485ri",
      slug: "apex-multi-speciality-hospital",
      name: "Apex Multi-Speciality Hospital",
      location: "Noida, Sector 62, Uttar Pradesh",
      accreditation: "NABH Accredited",
      about: "Apex Multi-Speciality Hospital offers comprehensive surgical care across plastic, aesthetic and reconstructive specialties, supported by advanced diagnostics and a compassionate nursing team.",
      beds: 220,
      modularOTs: 10,
      rating: 4.7,
      startingPrice: 85000,
      featured: true,
      image: "/uploads/1781603785323-605443b9.jpg,/uploads/1781603788550-32bdcca5.webp",
      whyChoose: "[{\"title\":\"Centre of Aesthetic Excellence\",\"description\":\"Renowned plastic and cosmetic surgery department.\"},{\"title\":\"Premium Recovery Suites\",\"description\":\"Private rooms designed for comfortable recovery.\"}]",
      specialties: "[\"Plastic Surgery\",\"Aesthetic Surgery\",\"Bariatrics\",\"General Surgery\"]",
    }
  });

  await prisma.hospital.create({
    data: {
      id: "cmqf7zdgr0003kz7wtto9gdfj",
      slug: "carewell-super-speciality-hospital",
      name: "Carewell Super Speciality Hospital",
      location: "East Delhi",
      accreditation: "NABH Accredited",
      about: "Carewell Super Speciality Hospital specialises in urology and minimally invasive surgical procedures, with a strong focus on patient education and transparent pricing.",
      beds: 180,
      modularOTs: 7,
      rating: 4.6,
      startingPrice: 120000,
      featured: false,
      image: null,
      whyChoose: "[{\"title\":\"Dedicated Urology Wing\",\"description\":\"Specialised team and equipment for urological care.\"}]",
      specialties: "[\"Urology\",\"Laparoscopic Surgery\",\"General Surgery\"]",
    }
  });

  await prisma.hospital.create({
    data: {
      id: "cmqf8ebzq0000kzp4qzen27b9",
      slug: "apollo",
      name: "Apollo",
      location: "New Dlehi",
      accreditation: "NABH Accredited",
      about: "Test",
      beds: 100,
      modularOTs: 25,
      rating: 4.5,
      startingPrice: 25000,
      featured: false,
      image: null,
      whyChoose: "[]",
      specialties: "[\"Oncology\",\"Orthopedic\"]",
    }
  });

  // ---- Treatments ----
  await prisma.treatment.create({
    data: {
      id: "cmqf7zdii000bkz7w89dyqdti",
      slug: "gallbladder-stone-removal",
      name: "Gallbladder Stone Removal",
      conditionName: "Gallbladder Stones",
      tagline: "Laparoscopic Cholecystectomy",
      shortDesc: "A safe, minimally invasive surgery to remove the gallbladder and stones. Most patients return home the same day with minimal pain.",
      heroDesc: "A safe, minimally invasive surgery to remove the gallbladder and stones. Most patients return home the same day with minimal pain and a faster recovery.",
      image: "/uploads/treatment-gallbladder-stone-removal-1781603634397.jpg",
      costMin: 45000,
      costMax: 75000,
      recoveryNote: "Most patients resume normal activities within a week.",
      duration: "45-60 minutes",
      hospitalStay: "1 day",
      recoveryTime: "3-7 days",
      successRate: "98%",
      featured: true,
      categoryId: "cmqf7zdhr0007kz7whbmppv4o",
      symptoms: "[\"Severe pain in the upper-right abdomen\",\"Nausea and vomiting after meals\",\"Indigestion and acidity that doesn't resolve\",\"Pain or jaundice in advanced cases\"]",
      procedureSteps: "[\"Laparoscopic surgery is performed under general anaesthesia through 3–4 tiny incisions.\",\"A thin camera helps the surgeon locate and detach the gallbladder.\",\"The gallbladder, along with stones, is removed and the incisions closed.\"]",
      benefits: "[\"Minimal pain and smaller scars\",\"Shorter hospital stay — often same-day discharge\",\"Quick return to normal activities\",\"Lower risk of infection\"]",
      aftercare: "[\"You can walk the same evening after surgery.\",\"Resume light work in 3–5 days.\",\"Avoid heavy lifting for 2 weeks.\",\"Follow a low-fat diet for a few weeks as advised by your surgeon.\"]",
    }
  });

  await prisma.treatment.create({
    data: {
      id: "cmqf7zdis000dkz7wop7vjstm",
      slug: "hernia-repair",
      name: "Hernia Repair",
      conditionName: "Hernia",
      tagline: "Laparoscopic Mesh Repair",
      shortDesc: "Specialised hernia correction using laparoscopic, laxative and aesthetic procedures for lasting relief.",
      heroDesc: "",
      image: "/uploads/treatment-hernia-repair-laparoscopic-open-1781603644425.jpg",
      costMin: 50000,
      costMax: 90000,
      recoveryNote: "Return to daily activities within a week.",
      duration: "",
      hospitalStay: "",
      recoveryTime: "",
      successRate: "",
      featured: true,
      categoryId: "cmqf7zdhr0007kz7whbmppv4o",
      symptoms: "[\"Visible bulge in the abdomen or groin\",\"Discomfort while lifting or bending\",\"Aching or pressure at the site\"]",
      procedureSteps: "[\"Performed laparoscopically or open under anaesthesia.\",\"A surgical mesh reinforces the weakened area.\",\"Incisions are closed with minimal scarring.\"]",
      benefits: "[\"Strong, durable repair\",\"Low recurrence rate\",\"Faster recovery with laparoscopy\"]",
      aftercare: "[\"Avoid heavy lifting for 2–3 weeks.\",\"Walk regularly to aid recovery.\"]",
    }
  });

  await prisma.treatment.create({
    data: {
      id: "cmqf7zdj1000fkz7w4e697age",
      slug: "gynecomastia-surgery",
      name: "Gynecomastia Surgery",
      conditionName: "Gynecomastia",
      tagline: "Male Chest Correction",
      shortDesc: "Male breast reduction for a flatter, more confident chest. Safe and effective day-care procedure.",
      heroDesc: "",
      image: "/uploads/treatment-gynecomastia-surgery-1781603655281.jpg",
      costMin: 45000,
      costMax: 95000,
      recoveryNote: "Resume work in 5–7 days.",
      duration: "",
      hospitalStay: "",
      recoveryTime: "",
      successRate: "",
      featured: true,
      categoryId: "cmqf7zdh00004kz7w0cgi3kij",
      symptoms: "[\"Enlarged or swollen chest tissue in men\",\"Self-consciousness about chest appearance\"]",
      procedureSteps: "[\"Performed as a day-care procedure under anaesthesia.\",\"Excess glandular tissue and fat are removed.\",\"Chest is contoured for a natural look.\"]",
      benefits: "[\"Minimal scarring\",\"Permanent results\",\"Boost in confidence\"]",
      aftercare: "[\"Wear a compression garment as advised.\",\"Avoid strenuous exercise for 2–3 weeks.\"]",
    }
  });

  await prisma.treatment.create({
    data: {
      id: "cmqf7zdj9000hkz7w6icxkbu0",
      slug: "liposuction-body-contouring",
      name: "Liposuction & Body Contouring",
      conditionName: "Stubborn Fat",
      tagline: "VASER",
      shortDesc: "Remove stubborn fat and achieve a more sculpted body shape with advanced contouring techniques.",
      heroDesc: "",
      image: null,
      costMin: 70000,
      costMax: 150000,
      recoveryNote: "Improved body confidence within weeks.",
      duration: "",
      hospitalStay: "",
      recoveryTime: "",
      successRate: "",
      featured: false,
      categoryId: "cmqf7zdh00004kz7w0cgi3kij",
      symptoms: "[\"Stubborn fat pockets resistant to diet/exercise\"]",
      procedureSteps: "[\"Targeted fat removal using VASER or laser.\",\"Sculpted body shape with advanced techniques.\"]",
      benefits: "[\"Targeted fat removal\",\"VASER / laser assisted\",\"Improved body confidence\"]",
      aftercare: "[\"Wear compression garments.\",\"Stay hydrated and walk daily.\"]",
    }
  });

  await prisma.treatment.create({
    data: {
      id: "cmqf7zdji000jkz7wt4zst3ep",
      slug: "piles-treatment",
      name: "Piles Treatment",
      conditionName: "Piles / Haemorrhoids",
      tagline: "Laser Procedure",
      shortDesc: "Painless laser treatment for piles with same-day discharge and minimal recovery time.",
      heroDesc: "",
      image: null,
      costMin: 35000,
      costMax: 60000,
      recoveryNote: "Same-day discharge in most cases.",
      duration: "",
      hospitalStay: "",
      recoveryTime: "",
      successRate: "",
      featured: false,
      categoryId: "cmqf7zdi00008kz7w6y9p42oa",
      symptoms: "[\"Bleeding during bowel movements\",\"Itching or discomfort\",\"Swelling near the anus\"]",
      procedureSteps: "[\"Laser energy is used to shrink the haemorrhoids.\",\"Day-care procedure with minimal bleeding.\"]",
      benefits: "[\"Painless and bloodless\",\"Same-day discharge\",\"Quick recovery\"]",
      aftercare: "[\"Maintain a high-fibre diet.\",\"Stay hydrated to ease bowel movements.\"]",
    }
  });

  await prisma.treatment.create({
    data: {
      id: "cmqf7zdjr000lkz7wwidl9r0n",
      slug: "weight-loss-surgery",
      name: "Weight Loss Surgery",
      conditionName: "Obesity / Excess Weight",
      tagline: "Sleeve / Bypass",
      shortDesc: "Sustainable weight-loss surgery for those struggling with obesity and related health conditions.",
      heroDesc: "",
      image: null,
      costMin: 250000,
      costMax: 400000,
      recoveryNote: "Gradual return to activity over a few weeks.",
      duration: "",
      hospitalStay: "",
      recoveryTime: "",
      successRate: "",
      featured: false,
      categoryId: "cmqf7zdhj0006kz7w0bu6avrh",
      symptoms: "[\"Obesity with BMI over 35\",\"Diabetes or hypertension linked to weight\"]",
      procedureSteps: "[\"Laparoscopic sleeve gastrectomy or gastric bypass.\",\"Reduces stomach capacity for sustained weight loss.\"]",
      benefits: "[\"Significant, sustained weight loss\",\"Improvement in diabetes and BP\",\"Better quality of life\"]",
      aftercare: "[\"Follow a supervised diet plan.\",\"Regular follow-ups with the surgeon and dietician.\"]",
    }
  });

  await prisma.treatment.create({
    data: {
      id: "cmqf7zdk0000nkz7wvj1f4mhw",
      slug: "kidney-stone-laser-treatment",
      name: "Kidney Stone Laser Treatment",
      conditionName: "Kidney Stones",
      tagline: "Minimally Invasive Laser Lithotripsy",
      shortDesc: "Advanced laser technology to dust and remove kidney stones with zero incisions and quick recovery.",
      heroDesc: "",
      image: null,
      costMin: 45000,
      costMax: 85000,
      recoveryNote: "Most patients go home the same or next day and resume light activities in 2-3 days.",
      duration: "",
      hospitalStay: "",
      recoveryTime: "",
      successRate: "",
      featured: false,
      categoryId: "cmqf7zdha0005kz7ws85bp0wz",
      symptoms: "[\"Sharp pain in the back or side\",\"Blood in urine (hematuria)\",\"Painful or frequent urination\",\"Nausea or fever in case of infection\"]",
      procedureSteps: "[\"A thin flexible scope is passed through the natural passage to reach the stone.\",\"Holmium laser fiber dusts the stone into tiny particles.\",\"Stone fragments are washed out or retrieved using a basket.\"]",
      benefits: "[\"No surgical cuts or stitches\",\"High success rate for all stone sizes\",\"Quick discharge and minimal downtime\",\"Low risk of complications\"]",
      aftercare: "[\"Drink plenty of water to flush out stone dust.\",\"Avoid heavy lifting for 3-5 days.\",\"Take prescribed medications for smooth recovery.\"]",
    }
  });

  await prisma.treatment.create({
    data: {
      id: "cmqf7zdka000pkz7ww6rpc6c9",
      slug: "lipoma-removal-surgery",
      name: "Lipoma Removal Surgery",
      conditionName: "Lipomas",
      tagline: "Aesthetic Surgical Excision",
      shortDesc: "Safe, painless excision of lipoma lumps under local anesthesia with minimal scarring.",
      heroDesc: "",
      image: null,
      costMin: 15000,
      costMax: 35000,
      recoveryNote: "Stitch removal in 7-10 days. Resume normal activities the next day.",
      duration: "",
      hospitalStay: "",
      recoveryTime: "",
      successRate: "",
      featured: false,
      categoryId: "cmqf7zdh00004kz7w0cgi3kij",
      symptoms: "[\"Soft, doughy lump under the skin\",\"Moves easily with slight finger pressure\",\"Generally painless unless pressing on nerves\"]",
      procedureSteps: "[\"Area is numbed using local anesthesia.\",\"A small aesthetic incision is made directly over the lipoma.\",\"The fatty lump is carefully extracted and closed with fine sutures.\"]",
      benefits: "[\"Immediate and complete removal\",\"Painless day-care procedure\",\"Minimal aesthetic scarring\",\"Low recurrence rate\"]",
      aftercare: "[\"Keep the dressing clean and dry.\",\"Avoid stretching the incision area.\",\"Stitch removal as advised in 7-10 days.\"]",
    }
  });

  await prisma.treatment.create({
    data: {
      id: "cmqf7zdkk000rkz7wotby0oqm",
      slug: "lasik-eye-surgery",
      name: "Lasik Eye Surgery",
      conditionName: "Vision Issues",
      tagline: "Advanced Vision Correction",
      shortDesc: "Say goodbye to glasses and contact lenses with advanced blade-free laser vision correction.",
      heroDesc: "",
      image: null,
      costMin: 35000,
      costMax: 75000,
      recoveryNote: "Vision stabilizes within 24-48 hours. Clear sight without glasses.",
      duration: "",
      hospitalStay: "",
      recoveryTime: "",
      successRate: "",
      featured: false,
      categoryId: "cmqf7zdi90009kz7w6twosx17",
      symptoms: "[\"Short-sightedness (Myopia)\",\"Far-sightedness (Hyperopia)\",\"Astigmatism (Blurred vision)\",\"Dependence on glasses or contact lenses\"]",
      procedureSteps: "[\"Numbing eye drops are applied for a painless procedure.\",\"A precise corneal flap is created using a laser.\",\"The cornea is reshaped to correct vision and the flap is repositioned.\"]",
      benefits: "[\"Quick 10-minute procedure\",\"Rapid vision recovery within 24 hours\",\"Permanent freedom from glasses\",\"Highly safe and precise\"]",
      aftercare: "[\"Avoid rubbing your eyes.\",\"Use prescribed antibiotic and lubricating eye drops.\",\"Wear protective eyewear outdoors for a few days.\"]",
    }
  });

  // ---- Doctors ----
  await prisma.doctor.create({
    data: {
      id: "cmqf7zdku000tkz7wkssiccqa",
      slug: "dr-tapeshwar-sehgal",
      name: "Dr. Tapeshwar Sehgal",
      title: "Senior Consultant — Plastic, Burn & Hair Transplant Surgery",
      primarySpecialty: "Plastic Surgery",
      about: "Dr. Tapeshwar Sehgal is an esteemed Plastic and Reconstructive Surgeon with over 28 years of clinical experience. He specializes in advanced cosmetic procedures, burn treatment, and hair transplant surgeries, delivering outstanding patient care and natural results.",
      experienceYears: 28,
      rating: 4.9,
      surgeriesCount: 9500,
      consultationFee: 1500,
      featured: true,
      image: "/uploads/doctor-dr-tapeshwar-sehgal-1781603531197.png",
      hospitalId: "cmqf7zdgh0002kz7wfwo485ri",
      specialties: "[\"Plastic Surgery\",\"Burn Surgery\",\"Hair Transplant Surgery\"]",
      qualifications: "[\"MCh — Plastic Surgery\",\"MS — General Surgery\",\"28+ years of experience overall (18 years as a specialist)\",\"Senior Consultant at Apex Multi-Speciality Hospital\"]",
    }
  });

  await prisma.doctor.create({
    data: {
      id: "cmqf7zdl5000vkz7wiz7bavar",
      slug: "dr-saurabh-kumar-goyal",
      name: "Dr. Saurabh Kumar Goyal",
      title: "Senior Consultant — Laparoscopic, General & Proctology Surgery",
      primarySpecialty: "General Surgery",
      about: "Dr. Saurabh Kumar Goyal is a highly skilled General and Minimally Invasive Surgeon with 18 years of experience. He specializes in laparoscopic surgeries for gallbladder, hernia, and appendix, as well as laser treatment for proctology cases like piles, fissures, and fistulas.",
      experienceYears: 18,
      rating: 4.8,
      surgeriesCount: 6500,
      consultationFee: 1000,
      featured: true,
      image: "/uploads/doctor-dr-saurabh-kumar-goyal-1781603553028.png",
      hospitalId: "cmqf7zdg70001kz7w7nhhufoe",
      specialties: "[\"General Surgery\",\"Laparoscopic Surgery\",\"Proctology\"]",
      qualifications: "[\"MS — General Surgery\",\"Fellowship in Minimal Access Surgery (FMAS)\",\"18+ years of experience overall (12 years as a specialist)\"]",
    }
  });

  await prisma.doctor.create({
    data: {
      id: "cmqf7zdlf000xkz7wnr6n02qb",
      slug: "dr-salil-yadav",
      name: "Dr. Salil Yadav",
      title: "Consultant — Robotic & Laparoscopic Surgery",
      primarySpecialty: "General Surgery",
      about: "Dr. Salil Yadav is a modern surgical specialist with 13 years of experience. He is highly proficient in performing advanced laparoscopic and robotic procedures, helping patients achieve quicker recovery times with minimal scarring.",
      experienceYears: 13,
      rating: 4.7,
      surgeriesCount: 4200,
      consultationFee: 1200,
      featured: false,
      image: "/uploads/doctor-dr-salil-yadav-1781603562338.png",
      hospitalId: "cmqf7zdgr0003kz7wtto9gdfj",
      specialties: "[\"Robotic Surgery\",\"Laparoscopic Surgery\"]",
      qualifications: "[\"MS — General Surgery\",\"Fellowship in Robotic Surgery\",\"13+ years of experience overall (7 years as a specialist)\"]",
    }
  });

  await prisma.doctor.create({
    data: {
      id: "cmqf7zdlq000zkz7wq74wewpv",
      slug: "dr-sahil-singla",
      name: "Dr. Sahil Singla",
      title: "Consultant — Plastic, Burn & Diabetic Foot Surgery",
      primarySpecialty: "Plastic Surgery",
      about: "Dr. Sahil Singla is a board-certified plastic and reconstructive surgeon with 16 years of experience. He is dedicated to burn reconstruction, diabetic foot management, and cosmetic body contouring.",
      experienceYears: 16,
      rating: 4.9,
      surgeriesCount: 5100,
      consultationFee: 1200,
      featured: true,
      image: "/uploads/doctor-dr-sahil-singla-1781603571045.png",
      hospitalId: "cmqf7zdgh0002kz7wfwo485ri",
      specialties: "[\"Plastic Surgery\",\"Diabetic Foot Surgery\",\"Burn Surgery\"]",
      qualifications: "[\"MCh — Plastic Surgery\",\"MS — General Surgery\",\"18+ years of experience overall (9 years as a specialist)\"]",
    }
  });

  await prisma.doctor.create({
    data: {
      id: "cmqf7zdlz0011kz7wrbzz9dcm",
      slug: "dr-deepak-kumar-sinha",
      name: "Dr. Deepak Kumar Sinha",
      title: "Consultant — Laparoscopic, General & Proctology Surgery",
      primarySpecialty: "General Surgery",
      about: "Dr. Deepak Kumar Sinha is a dedicated general and proctology surgeon with 18 years of experience. He has extensive expertise in laparoscopic and proctological procedures, providing safe and effective treatments for piles, hernia, and stones.",
      experienceYears: 18,
      rating: 4.8,
      surgeriesCount: 5800,
      consultationFee: 1000,
      featured: true,
      image: "/uploads/doctor-dr-deepak-kumar-sinha-1781603578780.png",
      hospitalId: "cmqf7zdg70001kz7w7nhhufoe",
      specialties: "[\"General Surgery\",\"Laparoscopic Surgery\",\"Proctology\"]",
      qualifications: "[\"MS — General Surgery\",\"18+ years of experience overall (6 years as a specialist)\"]",
    }
  });

  // ---- Blogs ----
  await prisma.blog.create({
    data: {
      id: "cmqf7zdm80012kz7wsj22ruv6",
      slug: "gallbladder-stone-removal-what-to-expect-before-during-after-surgery",
      title: "Gallbladder Stone Removal: What to Expect Before, During & After Surgery",
      category: "General Surgery",
      excerpt: "If your doctor has recommended gallbladder surgery, you may feel anxious about the procedure, recovery and cost. This comprehensive guide walks you through everything you need to know.",
      content: "Gallbladder surgery (laparoscopic cholecystectomy) is one of the most common surgical procedures performed in India.\r\n\r\nIf your doctor has recommended surgery, you may feel anxious about the procedure, recovery and cost. This comprehensive guide walks you through everything you need to know.\r\n\r\n## What is a gallbladder?\r\nThe gallbladder is a small organ that stores bile. When stones form, they can cause severe pain, nausea and indigestion.\r\n\r\n## The procedure\r\nThe surgery is performed under general anaesthesia through 3–4 tiny incisions. A thin camera guides the surgeon as the gallbladder is detached and removed.\r\n\r\n## Recovery\r\nMost patients are discharged the same day or the next morning. You can walk the same evening, resume light work in 3–5 days, and return to normal activities within a week.\r\n\r\n## Cost\r\nIn Delhi-NCR, the procedure typically costs between ₹45,000 and ₹75,000 depending on the hospital and insurance coverage.",
      coverImage: "/uploads/blog-gallbladder-stone-removal-what-to-expect-before-during-after-surgery-1781603676214.jpg",
      author: "Surgency Care Team",
      readTime: "6 min read",
      featured: true,
    }
  });

  await prisma.blog.create({
    data: {
      id: "cmqf7zdmi0013kz7w4o5hp03x",
      slug: "gynecomastia-in-men-causes-treatment-options-what-results-to-expect",
      title: "Gynecomastia in Men: Causes, Treatment Options & What Results to Expect",
      category: "Aesthetic Surgery",
      excerpt: "Everything you need to know about male breast reduction surgery, including costs and recovery tips so you can make an informed decision.",
      content: "Gynecomastia is the enlargement of breast tissue in men. It is more common than most people realise and can affect confidence.\r\n\r\n## Causes\r\nHormonal imbalance, certain medications and lifestyle factors can all contribute.\r\n\r\n## Treatment\r\nSurgery removes excess glandular tissue and fat to restore a flatter chest contour. It is usually a day-care procedure.\r\n\r\n## Recovery\r\nMost men resume work within 5–7 days and see final results once swelling subsides.",
      coverImage: "/uploads/blog-gynecomastia-in-men-causes-treatment-options-what-results-to-expect-1781603690144.webp",
      author: "Surgency Care Team",
      readTime: "5 min read",
      featured: true,
    }
  });

  await prisma.blog.create({
    data: {
      id: "cmqf7zdmr0014kz7w0dggvm7q",
      slug: "10-practical-tips-for-faster-recovery-after-laparoscopic-hernia-surgery",
      title: "10 Practical Tips for Faster Recovery After Laparoscopic Hernia Surgery",
      category: "Recovery Tips",
      excerpt: "Diet, activity restrictions, pain management and warning signs to watch for during your hernia surgery recovery period.",
      content: "Laparoscopic hernia repair offers a faster, less painful recovery than open surgery. Here are ten practical tips to help you heal well.\r\n\r\n1. Walk gently the same day.\r\n2. Avoid heavy lifting for 2–3 weeks.\r\n3. Eat fibre-rich foods to prevent straining.\r\n4. Stay hydrated.\r\n5. Take prescribed pain relief on schedule.\r\n6. Keep the incision clean and dry.\r\n7. Wear loose, comfortable clothing.\r\n8. Watch for signs of infection.\r\n9. Attend all follow-up appointments.\r\n10. Rest, but don't stay completely immobile.",
      coverImage: "/uploads/blog-10-practical-tips-for-faster-recovery-after-laparoscopic-hernia-surgery-1781603684029.webp",
      author: "Surgency Care Team",
      readTime: "4 min read",
      featured: true,
    }
  });

  await prisma.blog.create({
    data: {
      id: "cmqgidf9f0001kz2say2o4jpt",
      slug: "test",
      title: "Test",
      category: "General Surgery",
      excerpt: "",
      content: "",
      coverImage: null,
      author: "Surgency Care Team",
      readTime: "5 min read",
      featured: false,
    }
  });

  // ---- Testimonials ----
  await prisma.testimonial.create({
    data: {
      id: "cmqf7zdn00015kz7wvmpsnudn",
      name: "Gaurav Pandey",
      image: "https://surgencycare.com/wp-content/uploads/2026/05/ChIJNXeRgNIjDTkRes9ZRepU7mo_e07c9bb54f9432440fa86e61f71c3b6b.jpg",
      text: "I would like to express my heartfelt gratitude to Divyansh Chhabra ji and Shavi Arora ji for their incredible support during my surgery. They ensured that all the facilities were arranged exactly as promised. They are very supportive and wonderful people—truly great individuals.",
      time: "2 months ago",
      rating: 5,
      featured: true,
      treatmentId: "cmqf7zdii000bkz7w89dyqdti",
    }
  });

  await prisma.testimonial.create({
    data: {
      id: "cmqf7zdna0016kz7wa9rkevup",
      name: "Rishabh Nigam",
      image: "https://surgencycare.com/wp-content/uploads/2026/05/ChIJNXeRgNIjDTkRes9ZRepU7mo_481f09e4afb0f1be77761b899f019225.jpg",
      text: "I like the healthcare facility provided by Surgency Care for my father piles treatment. Divyansh help me find the best doctor for the treatment at the top hospital of Delhi NCR. Totally recommended!",
      time: "5 months ago",
      rating: 5,
      featured: true,
      treatmentId: "cmqf7zdii000bkz7w89dyqdti",
    }
  });

  await prisma.testimonial.create({
    data: {
      id: "cmqf7zdnj0017kz7wav2hhcjy",
      name: "nisha arora",
      image: "https://surgencycare.com/wp-content/uploads/2026/05/ChIJNXeRgNIjDTkRes9ZRepU7mo_1a12fce528930a69ad8566558da2c237.jpg",
      text: "Top-notch Ophthalmology at Surgency Care! Had LASIK and it's life-changing. Highly skilled surgeons and excellent facilities. Totally worth it and recommended. 💯",
      time: "5 months ago",
      rating: 5,
      featured: true,
      treatmentId: "cmqf7zdii000bkz7w89dyqdti",
    }
  });

  await prisma.testimonial.create({
    data: {
      id: "cmqf7zdns0018kz7wo08hy1yf",
      name: "Adil",
      image: "https://surgencycare.com/wp-content/uploads/2025/10/ChIJNXeRgNIjDTkRes9ZRepU7mo_d8a876e26b954e6a6f9fad6e858ea8a2.jpg",
      text: "Had a good experience. They recommended to an expert doctor and coordinated end to end during dad's surgery. Thanks a lott..✨✨",
      time: "8 months ago",
      rating: 5,
      featured: true,
      treatmentId: "cmqf7zdii000bkz7w89dyqdti",
    }
  });

  await prisma.testimonial.create({
    data: {
      id: "cmqf7zdo10019kz7w3hdhuwei",
      name: "Ankush Ahuja",
      image: "https://surgencycare.com/wp-content/uploads/2026/05/ChIJNXeRgNIjDTkRes9ZRepU7mo_89214131cd2272ad5c82f2cc4961be9d.jpg",
      text: "My surgery turned out to be an amazing experience — from the care of the doctors to the smooth recovery, it taught me gratitude, trust, and the true power of modern medicine.",
      time: "9 months ago",
      rating: 5,
      featured: true,
      treatmentId: null,
    }
  });

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
