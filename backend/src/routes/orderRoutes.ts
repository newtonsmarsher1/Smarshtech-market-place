import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { prisma } from '../index';

const router = express.Router();

// Create Order
router.post('/', protect, async (req: any, res) => {
    const { items, totalAmount } = req.body; // items: [{ productId, quantity, price }]
    const buyerId = req.user.id;

    try {
        const order = await prisma.order.create({
            data: {
                buyerId,
                totalAmount,
                status: 'PENDING',
                paymentStatus: 'PENDING',
                items: {
                    create: items.map((item: any) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            },
            include: { items: true }
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
});

// Get My Orders
router.get('/my-orders', protect, async (req: any, res) => {
    try {
        const orders = await prisma.order.findMany({
            where: { buyerId: req.user.id },
            include: { items: { include: { product: true } } }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
});

export default router;
