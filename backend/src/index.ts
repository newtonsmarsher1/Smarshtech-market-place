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
    console.error('DATABASE_URL is missing from environment variables!');
}

console.log('Initializing Prisma with Driver Adapter...');
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// In Prisma 7, the adapter is passed directly in the constructor options
const prisma = new PrismaClient({
    adapter: adapter
});

console.log('Prisma Client initialized successfully.');

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

app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
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
