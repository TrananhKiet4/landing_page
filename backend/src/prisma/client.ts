import { PrismaClient } from "@prisma/client";

const prismaGlobal = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export const prisma =
  prismaGlobal.prisma ??
  new PrismaClient({
    log: ["error", "warn"]
  });

if (process.env.NODE_ENV !== "production") {
  prismaGlobal.prisma = prisma;
}
