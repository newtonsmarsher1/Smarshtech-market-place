import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import sellerRoutes from './routes/sellerRoutes';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

import fs from 'fs';
import path from 'path';

// Only load .env in development (Vercel provides them directly)
if (fs.existsSync(path.join(__dirname, '../.env'))) {
    dotenv.config();
}

const app = express();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('CRITICAL: DATABASE_URL is missing from environment variables!');
}

let prisma: PrismaClient;

try {
    console.log('Initializing Database Pool...');
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    console.log('Initializing Prisma Client with Driver Adapter...');
    prisma = new PrismaClient({
        adapter: adapter
    });
    console.log('Prisma Client initialized.');
} catch (error) {
    console.error('FATAL ERROR DURING PRISMA INITIALIZATION:', error);
    // Create a dummy client to avoid type errors, but queries will fail (which we handle in health/controllers)
    prisma = new PrismaClient(); 
}

// Test DB Connection
app.get('/api/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({ status: 'ok', database: 'connected' });
    } catch (error: any) {
        console.error('Database connection error:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    'https://cloudsmall.vercel.app',
    'http://localhost:3000',
    process.env.FRONTEND_URL
].filter(Boolean) as string[];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/sellers', sellerRoutes);

app.get('/', (req, res) => {
    res.send('Clouds Mall API is Live');
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export { prisma };
export default app;
