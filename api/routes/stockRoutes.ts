import { Router } from 'express';
import * as stockController from '../controllers/stockController';

const router = Router();

router.post('/', stockController.addStock);
router.get('/', stockController.getStock);
router.get('/:stockId', stockController.getStockDetails);
router.get('/product/:productId', stockController.getStockByProductId);
router.get('/warehouse/:warehouseId', stockController.getStockByWarehouseId);
router.put('/:stockId', stockController.updateStock);
router.delete('/:stockId', stockController.deleteStock);

export default router;
