import { PrismaClient } from '@/generated/client/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
const adapter = new PrismaLibSql({
  url: 'file:./dev.db'
});

const globalForPrisma4 = global as unknown as { prisma4: PrismaClient };

export const prisma =
  globalForPrisma4.prisma4 ||
  new PrismaClient({
    adapter,
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma4.prisma4 = prisma;
