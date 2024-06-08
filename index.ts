import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

async function test() {
  const res = await prisma.customer.findFirst();
  console.log(res);

  await prisma.user.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.revenue.deleteMany();

  return res;
}

async function main() {
  // console.log(process.env.DATABASE_URL);
  // await populate();
  return test();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    prisma.$disconnect;
  });
