import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const seedCount: number = 3;

const getUserSeeds = (): Prisma.UserCreateInput[] => {
  const users: Prisma.UserCreateInput[] = [];
  for (let i = 0; i < seedCount; i++) {
    users.push({
      name: `testuser--${i}`,
      email: `testuser--${i}@test.test`,
      password: `password--${i}`,
    });
  }
  return users;
};

const userData: Prisma.UserCreateInput[] = getUserSeeds();

// const transfer = async () => {
//   const users = [];
//   for (const u of userData) {
//     const user = prisma.user.create({
//       data: u,
//     });
//     users.push(user);
//   }
//   return await prisma.$transaction(users);
// };

const main = async () => {
  console.log(`Start seeding ...`);

  const users = [];
  for (const u of userData) {
    const user = prisma.user.create({
      data: u,
    });
    users.push(user);
  }
  await prisma.$transaction(users);
  console.log(`Seeding finished.`);
};

// 処理開始
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
