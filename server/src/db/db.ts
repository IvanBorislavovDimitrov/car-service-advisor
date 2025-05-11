import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: getConnectionString(),
});

export function getConnectionString() {
  console.log('Connecting to DB with connection string:', process.env.DATABASE_URL);
  return process.env.DATABASE_URL;
}

export async function initDb() {
  await client.connect();
  console.log('✅ Connected to DB');
}

export default client;