import { createClient } from '@libsql/client';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  const sql = fs.readFileSync('schema.sql', 'utf8');
  const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0);
  
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
  });

  console.log('Running ' + statements.length + ' statements against Turso...');
  for (const stmt of statements) {
    console.log('Executing:', stmt.substring(0, 50) + '...');
    try {
      await client.execute(stmt);
    } catch (e) {
      if (e.message.includes('already exists')) {
        console.log('Table already exists, skipping...');
      } else {
        throw e;
      }
    }
  }
  console.log('Done!');
}
run();
