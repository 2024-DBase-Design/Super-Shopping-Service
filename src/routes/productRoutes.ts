import { Router } from 'express';
import * as productController from '../controllers/productController';

const router = Router();

router.post('/add', productController.addProduct);
router.get('/:productId', productController.getProductDetails);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

router.post('/:productId/price', productController.setProductPrice);
router.get('/search', productController.searchProducts);

export default router;
