import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const manager = await prisma.employee.findUnique({
    where: {
      username: "manager@gcu.in",
    },
  });

  if (manager) {
    console.log("Manager already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash("Manager@123", 10);

  await prisma.employee.create({
    data: {
      username: "manager@gcu.in",
      password: hashedPassword,
      role: "MANAGER",
    },
  });

  console.log("Manager seeded successfully.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });