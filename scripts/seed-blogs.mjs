import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();

const blogs = [
  {
    title: "Gynecomastia Surgery: What Every Man Should Know Before Going Under the Knife",
    slug: "gynecomastia-surgery-what-every-man-should-know",
    category: "Plastic Surgery",
    author: "Dr. Tapeshwar Sehgal",
    readTime: "6 min read",
    excerpt: "Gynecomastia affects more men than you think. Dr. Sehgal breaks down the causes, the right time to consider surgery, and what recovery really looks like.",
    content: `## What is Gynecomastia?

Gynecomastia is the enlargement of breast tissue in males, caused by an imbalance of estrogen and testosterone. It affects an estimated 40–60% of men at some point in their lives.

## Is It Just Fat?

Many patients confuse gynecomastia with pseudo-gynecomastia, which is fat accumulation without glandular tissue growth. True gynecomastia involves actual glandular tissue and cannot be resolved by diet or exercise alone.

## When Should You Consider Surgery?

Surgery is recommended when the condition has persisted for more than 12 months, is causing psychological distress, or does not respond to hormonal treatment. Most patients I see have been living with this condition for years, quietly suffering in silence.

## What Does Surgery Involve?

The procedure typically combines liposuction with glandular excision. Under general anesthesia, small incisions are made around the areola. Recovery is usually 2–4 weeks before returning to normal activities.

## Results and Expectations

Results are permanent in most cases. The chest becomes flat and masculine-contoured. Patients consistently report a significant boost in confidence and quality of life after the procedure.`,
    featured: false,
    doctorId: "cmqf7zdku000tkz7wkssiccqa",
  },
  {
    title: "Rhinoplasty in India: Separating Myths from Medical Reality",
    slug: "rhinoplasty-india-myths-vs-reality",
    category: "Plastic Surgery",
    author: "Dr. Tapeshwar Sehgal",
    readTime: "5 min read",
    excerpt: "Nose reshaping is one of the most requested aesthetic surgeries. Here is what you actually need to know — before, during, and after.",
    content: `## The Most Common Misconceptions

Patients often come in expecting to walk out looking like a celebrity. Rhinoplasty is highly individualised — the goal is harmony with your existing facial features, not a transformation into someone else.

## Functional vs Cosmetic Rhinoplasty

Many people do not realise that rhinoplasty is often done for breathing problems (deviated septum) rather than cosmetic reasons. A combined approach addresses both function and appearance in a single surgery.

## Recovery Timeline

Swelling peaks at 48–72 hours after surgery. Most of the visible swelling resolves within 3–4 weeks, but subtle refinement continues for up to 12 months. Patience is essential.

## Choosing the Right Surgeon

Rhinoplasty is technically one of the most demanding plastic surgeries. Look for a surgeon with dedicated rhinoplasty experience, not just a general plastic surgeon. Ask to see before/after photos of real patients.

## Is It Right for You?

Ideal candidates are adults (21+) who are in good health, have realistic expectations, and are not seeking surgery due to external pressure. A detailed consultation is always the first step.`,
    featured: false,
    doctorId: "cmqf7zdku000tkz7wkssiccqa",
  },
  {
    title: "Laparoscopic Hernia Repair: Why Minimally Invasive is Now the Gold Standard",
    slug: "laparoscopic-hernia-repair-gold-standard",
    category: "General Surgery",
    author: "Dr. Saurabh Kumar Goyal",
    readTime: "5 min read",
    excerpt: "Open hernia surgery used to mean a week in hospital. Today, most patients go home the same day. Dr. Goyal explains how laparoscopy changed everything.",
    content: `## What is a Hernia?

A hernia occurs when an internal organ or tissue pushes through a weak spot in the surrounding muscle or connective tissue. The most common types are inguinal (groin), umbilical (belly button), and incisional (post-surgical).

## Open vs Laparoscopic Repair

Traditional open surgery involves a large incision, longer hospital stay, and a recovery period of 4–6 weeks. Laparoscopic repair uses 3 small cuts (each under 1 cm), a camera, and specialized instruments. Most patients are discharged the same day.

## The Mesh Factor

Both approaches typically use a synthetic mesh to reinforce the weakened area. Laparoscopic placement of mesh tends to cause less post-operative pain and has a lower recurrence rate for bilateral (both sides) hernias.

## Who is a Good Candidate?

Most patients with uncomplicated hernias are ideal candidates for laparoscopic repair. Patients who have had previous abdominal surgeries may require a more detailed assessment.

## Recovery After Laparoscopic Hernia Surgery

Most patients return to desk work within 5–7 days and full activity within 3–4 weeks. Avoiding heavy lifting for 4–6 weeks post-surgery is critical to prevent recurrence.`,
    featured: false,
    doctorId: "cmqf7zdl5000vkz7wiz7bavar",
  },
  {
    title: "Understanding Gallstones: When Diet Changes Are Not Enough",
    slug: "gallstones-when-diet-changes-not-enough",
    category: "General Surgery",
    author: "Dr. Salil Yadav",
    readTime: "4 min read",
    excerpt: "Many patients try to manage gallstones through diet. Dr. Yadav explains when surgery becomes the only lasting solution.",
    content: `## What Causes Gallstones?

Gallstones form when substances in bile — primarily cholesterol — harden into stone-like deposits. Risk factors include obesity, rapid weight loss, high-fat diets, and a family history of the condition.

## Symptoms to Watch For

Not all gallstones cause symptoms. When they do, the classic presentation is sharp pain in the upper right abdomen, especially after a fatty meal. Nausea, vomiting, and fever may indicate a complication like cholecystitis (inflamed gallbladder).

## Can Diet Control Gallstones?

A low-fat diet can reduce the frequency of attacks, but it does not dissolve existing stones or prevent new ones from forming. Medication to dissolve stones exists but works slowly and only for specific stone types.

## When is Surgery Necessary?

Surgery (cholecystectomy) is recommended for symptomatic gallstones, recurrent attacks, or complications. Laparoscopic cholecystectomy is the most common approach — it is safe, effective, and requires only 1 night in hospital for most patients.

## Life After Gallbladder Removal

The gallbladder is not essential for digestion. Most patients adapt within a few weeks and can return to a normal diet. Some experience loose stools initially, which typically resolves on its own.`,
    featured: false,
    doctorId: "cmqf7zdlf000xkz7wnr6n02qb",
  },
  {
    title: "Why Apex Hospital Invests in Modular Operation Theatres",
    slug: "apex-hospital-modular-operation-theatres",
    category: "Hospital & Facilities",
    author: "Apex Multi-Speciality Hospital",
    readTime: "3 min read",
    excerpt: "Modular OTs are not just about aesthetics — they directly impact patient safety and surgical outcomes. Here is why we prioritise them.",
    content: `## What is a Modular Operation Theatre?

A modular OT is a pre-fabricated, sealed surgical environment with controlled airflow (HEPA-filtered laminar flow), built-in medical gas pipelines, and anti-static flooring. Unlike conventional OTs, modular theatres can be assembled faster and maintain higher sterility standards.

## Infection Control

Surgical site infections (SSIs) are a leading cause of post-operative complications. Modular OTs reduce SSI risk by maintaining positive air pressure and filtering out 99.97% of airborne particles. This is especially critical for orthopedic and cardiac surgeries.

## Better Outcomes for Patients

Studies consistently show that hospitals with modular OTs have lower rates of post-operative infection and shorter average hospital stays. For patients undergoing elective surgery, this translates to faster recovery and fewer complications.

## Our Investment

At Apex Multi-Speciality Hospital, we currently operate 6 modular operation theatres, each equipped with 4K surgical cameras, advanced anesthesia workstations, and integrated monitoring systems. We believe that infrastructure quality directly reflects the quality of care our patients deserve.`,
    featured: false,
    hospitalId: "cmqf7zdgh0002kz7wfwo485ri",
  },
  {
    title: "Shri Ram Hospital: Our Approach to Post-Surgical Care",
    slug: "shri-ram-hospital-post-surgical-care",
    category: "Hospital & Facilities",
    author: "Shri Ram Hospital",
    readTime: "4 min read",
    excerpt: "Surgery is only half the journey. At Shri Ram Hospital, we believe recovery deserves as much attention as the procedure itself.",
    content: `## The Recovery Gap in Indian Healthcare

Most patients in India receive excellent surgical care but are often sent home with minimal post-operative guidance. We believe this is a critical gap — one that leads to preventable complications and avoidable readmissions.

## Our Dedicated Care Team

Every surgical patient at Shri Ram Hospital is assigned a dedicated care coordinator who stays in contact throughout the recovery period. This includes scheduled follow-up calls, diet counselling, and wound monitoring via our patient app.

## What Sets Us Apart

Our post-surgical ward maintains a nurse-to-patient ratio of 1:4 during the first 24 hours after surgery — among the best in the Delhi-NCR region. Pain management is proactive, not reactive, which means patients report significantly less post-operative discomfort.

## Discharge Planning Starts Before Surgery

We conduct a pre-discharge planning session with each patient and their family before the operation date. This covers what to expect, warning signs to watch for, medications, diet, and when to return for follow-up.

## Our Commitment

We measure our success not just by surgical outcomes but by how our patients feel at 2 weeks, 4 weeks, and 3 months post-surgery. That long-term view is what drives every decision we make.`,
    featured: false,
    hospitalId: "cmqf7zdg70001kz7w7nhhufoe",
  },
];

for (const blog of blogs) {
  await p.blog.upsert({
    where: { slug: blog.slug },
    create: blog,
    update: blog,
  });
  console.log("Seeded:", blog.title);
}

await p.$disconnect();
console.log("Done.");
