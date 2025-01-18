import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";


type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClientSingleton | undefined;
}

const prismaClientSingleton = () => {
  return new PrismaClient().$extends(withAccelerate());
};

export const db = globalThis.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
