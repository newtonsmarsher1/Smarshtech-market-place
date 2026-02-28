import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/roleMiddleware';
import { prisma } from '../index';

const router = express.Router();

// Register as Seller
router.post('/register', protect, async (req: any, res) => {
    const { businessName, phone } = req.body;
    const userId = req.user.id;

    try {
        const existingSeller = await prisma.seller.findUnique({ where: { userId } });
        if (existingSeller) {
            return res.status(400).json({ message: 'User is already a seller' });
        }

        const seller = await prisma.seller.create({
            data: {
                userId,
                businessName,
                phone,
                approvalStatus: 'PENDING'
            }
        });

        res.status(201).json(seller);
    } catch (error) {
        res.status(500).json({ message: 'Error registering seller', error });
    }
});

// Admin: Approve/Reject Seller
router.patch('/approve/:id', protect, authorize('ADMIN'), async (req, res) => {
    const { status } = req.body; // APPROVED or REJECTED

    try {
        const seller = await prisma.seller.update({
            where: { id: req.params.id },
            data: { approvalStatus: status }
        });

        // Update user role to SELLER if approved
        if (status === 'APPROVED') {
            await prisma.user.update({
                where: { id: seller.userId },
                data: { role: 'SELLER' }
            });
        }

        res.json(seller);
    } catch (error) {
        res.status(500).json({ message: 'Error updating seller status', error });
    }
});

export default router;
