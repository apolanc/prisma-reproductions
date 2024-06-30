import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

async function main() {
  const searchText = 'First Sec';
  
  try {
    const countries = await prisma.country.findMany({
      where: {
        name: {
          contains: searchText,
          mode: 'insensitive',
        },
      },
      orderBy: {
        _relevance: {
          fields: ['name'],
          search: searchText,
          sort: 'desc',
        },
      },
      take: 10,
    });
    console.log(countries);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}
prisma.$on('query', (e) => {
  console.log('Params: ' + e.params)
})
main();
