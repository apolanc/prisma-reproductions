import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.country.createMany({
    data: [
      { name: 'United States' },
      { name: 'Canada' },
      { name: 'Mexico' },
      { name: 'First Secondary'}      
    ],
  });

  await prisma.city.createMany({
    data: [
      { name: 'New York', region: 'NY', countryId: 1 },
      { name: 'Los Angeles', region: 'CA', countryId: 1 },
      { name: 'Toronto', region: 'ON', countryId: 2 },
      { name: 'Vancouver', region: 'BC', countryId: 2 },
      { name: 'Mexico City', region: 'DF', countryId: 3 },
    ],
  });

  await prisma.location.createMany({
    data: [
      { cityId: 1, address: '123 Broadway', latitude: 40.7128, longitude: -74.0060 },
      { cityId: 2, address: '456 Hollywood Blvd', latitude: 34.0522, longitude: -118.2437 },
      { cityId: 3, address: '789 Yonge St', latitude: 43.6510, longitude: -79.3470 },
      { cityId: 4, address: '101 Granville St', latitude: 49.2827, longitude: -123.1207 },
      { cityId: 5, address: '202 Reforma', latitude: 19.4326, longitude: -99.1332 },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
