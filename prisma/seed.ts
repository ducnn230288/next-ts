import bcrypt from 'bcrypt';
import { PrismaClient } from './.generated';

const prisma = new PrismaClient();

async function main() {
  // 1. Seeding Users
  await prisma.user.create({
    data: {
      name: 'Sample User',
      email: 'admin@gmail.com',
      hashedPassword: await bcrypt.hash('Password1!', 10),
    },
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
