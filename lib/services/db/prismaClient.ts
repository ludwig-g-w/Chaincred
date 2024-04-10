import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    log: ["error", "info", "query", "warn"],
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ["error", "info", "query", "warn"],
    });
  }
  prisma = global.prisma;
}

export default prisma;
