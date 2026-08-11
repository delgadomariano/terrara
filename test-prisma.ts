import 'dotenv/config';

process.env.DATABASE_URL = process.env.TURSO_DATABASE_URL || 'file:./dev.db';

import { prisma } from './src/lib/prisma';

async function test() {
  try {
    const products = await prisma.product.findMany();
    console.log(products.length);
  } catch (e) {
    console.error(e);
  }
}
test();
