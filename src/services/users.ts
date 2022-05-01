import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUserList = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw error;
  }
};

export const removeUserById = async (userId: string) => {
  try {
    await prisma.user.delete({ where: { id: userId } });
  } catch (error) {
    throw error;
  }
};

export const updateUserById = async (
  userId: string,
  data: Prisma.UserUpdateInput
) => {
  try {
    await prisma.user.update({ where: { id: userId }, data: data });
  } catch (error) {
    throw error;
  }
};
