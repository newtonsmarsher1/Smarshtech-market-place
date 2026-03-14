import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load .env if it exists (for local development)
const envPath = path.join(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
}

let prisma: PrismaClient;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('CRITICAL: DATABASE_URL is missing from environment variables!');
}

try {
    console.log('Initializing Database Pool in Lib...');
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool as any);

    console.log('Initializing Prisma Client with Driver Adapter in Lib...');
    prisma = new PrismaClient({
        adapter: adapter
    });
    console.log('Prisma Client initialized in Lib.');
} catch (error) {
    console.error('FATAL ERROR DURING PRISMA INITIALIZATION IN LIB:', error);
    prisma = new PrismaClient(); 
}

export { prisma };
