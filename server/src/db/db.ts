import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client();

export async function initDb() {
  await client.connect();

  // Create table if it doesn't exist
  await client.query(`
    CREATE TABLE IF NOT EXISTS car (
      id SERIAL PRIMARY KEY,
      brand VARCHAR(100) NOT NULL,
      model VARCHAR(100) NOT NULL,
      vin VARCHAR(100) NOT NULL,
      mileage INTEGER
    );
  `);

  console.log('✅ Connected to DB and ensured car table exists');
}

export default client;