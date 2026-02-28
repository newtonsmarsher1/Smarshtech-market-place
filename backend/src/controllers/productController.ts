import { Request, Response } from 'express';
import { prisma } from '../index';
import Fuse from 'fuse.js';

export const searchProducts = async (req: Request, res: Response) => {
    try {
        const { q, category } = req.query;
        const query = q as string || '';

        // Fetch products with optional category filter
        const whereClause: any = {};
        if (category && category !== 'All Items') {
            whereClause.category = (category as string).toUpperCase().replace(/ & /g, '_').replace(/ /g, '_');
        }

        const products = await prisma.product.findMany({
            where: whereClause,
            include: {
                seller: {
                    select: {
                        businessName: true
                    }
                }
            }
        });

        if (!query) {
            return res.json(products);
        }

        // Apply fuzzy matching ("AI-like" experience)
        const fuse = new Fuse(products, {
            keys: ['name', 'description', 'category'],
            threshold: 0.4, // Adjust for sensitivity
            includeScore: true
        });

        const results = fuse.search(query).map(r => r.item);

        res.json(results);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getSimilarProducts = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const product = await prisma.product.findUnique({ where: { id } });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find products in the same category, excluding current product
        const similar = await prisma.product.findMany({
            where: {
                category: product.category,
                NOT: { id: product.id }
            },
            take: 4
        });

        res.json(similar);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
    try {
        const category = req.params.category as string;
        const products = await prisma.product.findMany({
            where: {
                category: category.toUpperCase() as any
            }
        });
        res.json(products);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
