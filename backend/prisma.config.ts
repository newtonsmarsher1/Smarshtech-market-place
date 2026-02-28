import { defineConfig } from '@prisma/config'
import path from 'path'
import dotenv from 'dotenv'

// Explicitly load .env if it exists (for local development)
dotenv.config({ path: path.join(__dirname, '.env') })

export default defineConfig({
    schema: './prisma/schema.prisma',
    datasource: {
        url: process.env.DATABASE_URL
    }
})
