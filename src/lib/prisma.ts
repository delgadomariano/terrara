import { PrismaClient } from '@/generated/client/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const dbUrl = process.env.TURSO_DATABASE_URL || 'file:./dev.db';
const authToken = process.env.TURSO_AUTH_TOKEN;

const config = {
  url: dbUrl,
  authToken: authToken,
};

const adapter = new PrismaLibSql(config);

const globalForPrisma4 = global as unknown as { prisma4: PrismaClient };

export const prisma =
  globalForPrisma4.prisma4 ||
  new PrismaClient({
    adapter,
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma4.prisma4 = prisma;
