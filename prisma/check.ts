import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const doctors = await prisma.doctor.findMany();
  console.log("DOCTORS IN DATABASE:");
  doctors.forEach(d => {
    console.log(`Name: ${d.name}, Image URL: ${d.image}, Slug: ${d.slug}`);
  });
}
main();
