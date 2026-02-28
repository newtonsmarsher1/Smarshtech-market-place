import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { OAuth2Client } from 'google-auth-library';

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
});

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const setTokenCookie = (res: Response, token: string) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', // Use lax for easier dev
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};

export const register = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    try {
        const userExists = await prisma.user.findUnique({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role || 'BUYER',
            },
        });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
            expiresIn: '7d',
        });

        setTokenCookie(res, token);
        res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
            expiresIn: '7d',
        });

        setTokenCookie(res, token);
        res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const googleLogin = async (req: Request, res: Response) => {
    const { idToken } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(400).json({ message: 'Invalid Google token' });
        }

        const { sub: googleId, email, name, picture } = payload;

        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            // Create user if doesn't exist
            user = await prisma.user.create({
                data: {
                    name: name || 'Google User',
                    email: email!,
                    password: await bcrypt.hash(Math.random().toString(36), 10), // Random password
                    role: 'BUYER',
                },
            });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
            expiresIn: '7d',
        });

        setTokenCookie(res, token);
        res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.error('Google login error:', error);
        res.status(500).json({ message: 'Google login failed', error });
    }
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};

export const getMe = async (req: Request & { user?: any }, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, name: true, email: true, role: true }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
