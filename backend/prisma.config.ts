import { defineConfig } from '@prisma/config';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });

export default defineConfig({
    schema: './prisma/schema.prisma',
    datasource: {
        url: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_xVrYjz1g7UJa@ep-floral-thunder-ai4ynq19-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require',
    },
});
