import { Router } from 'express';
import * as productController from '../controllers/productController';

const router = Router();

router.post('/', productController.addProduct);
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductDetails);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

/// Add route for searching all products by category, brand, name, size, or description
router.get('/search', productController.searchProducts);
router.get('/:productId/warehouses', productController.getProductsWarehouses);
router.get('/:productId/stock', productController.getProductStock);

export default router;
