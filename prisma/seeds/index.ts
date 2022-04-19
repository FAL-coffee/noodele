import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const seedCount: number = 3;

const getUserSeeds = (): Prisma.UserCreateInput[] => {
  const users: Prisma.UserCreateInput[] = [];
  for (let i = 0; i < seedCount; i++) {
    users.push({
      name: `test-${i}`,
      email: `test${i}@test.com`,
      password: `test-${i}`,
    });
  }
  return users;
};

const getTopicSeeds = (): Prisma.TopicCreateInput[] => {
  const topics: Prisma.TopicCreateInput[] = [];
  for (let i = 0; i < seedCount; i++) {
    topics.push({
      title: `testtopics-title--${i}`,
      contents: `testtopics-contents--${i}`,
    });
  }
  return topics;
};

const getTagSeeds = (): Prisma.TagCreateInput[] => {
  const tags: Prisma.TagCreateInput[] = [];
  for (let i = 0; i < seedCount; i++) {
    tags.push({
      name: `testtag--${i}`,
    });
  }
  return tags;
};

const userData: Prisma.UserCreateInput[] = getUserSeeds();
const topicData: Prisma.TopicCreateInput[] = getTopicSeeds();
const tagData: Prisma.TagCreateInput[] = getTagSeeds();

const main = async () => {
  console.log(`Start seeding ...`);

  const users = [];
  for (const u of userData) {
    const user = prisma.user.create({
      data: u,
    });
    users.push(user);
  }

  const topics = [];
  for (const t of topicData) {
    const topic = prisma.topic.create({
      data: t,
    });
    topics.push(topic);
  }
  const tags = [];
  for (const t of tagData) {
    const tag = prisma.tag.create({
      data: t,
    });
    tags.push(tag);
  }
  await prisma.$transaction(users);
  await prisma.$transaction(topics);
  await prisma.$transaction(tags);

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
