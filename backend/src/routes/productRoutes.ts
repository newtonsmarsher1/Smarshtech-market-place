import express from 'express';
import { searchProducts, getSimilarProducts, getProductsByCategory } from '../controllers/productController';

const router = express.Router();

router.get('/search', searchProducts);
router.get('/:id/similar', getSimilarProducts);
router.get('/category/:category', getProductsByCategory);

export default router;
