import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [{ level: 'query', emit: 'event' }],
});

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
})

async function sqliteContains() {
  const res = await prisma.customer
    .findMany({
      where: {
        name: {
          contains: '%' // find all
          // contains: '\\%' // find all
        }
      }
    });
   console.log(res);
}

async function main() {
  return sqliteContains();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    prisma.$disconnect;
  });
