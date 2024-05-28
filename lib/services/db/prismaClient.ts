import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    log: ["error", "info", "query", "warn"],
  });
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient({
      log: ["error", "info", "query", "warn"],
    });
  }
  // @ts-ignore
  prisma = global.prisma;
}

export default prisma;
