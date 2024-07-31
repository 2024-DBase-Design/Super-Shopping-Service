import { Router } from 'express';
import * as warehouseController from '../controllers/warehouseController';

const router = Router();

router.post('/', warehouseController.addWarehouse);
router.get('/', warehouseController.getWarehouses);
router.get('/:warehouseId', warehouseController.getWarehouseDetails);
router.put('/:warehouseId', warehouseController.updateWarehouse);
router.delete('/:warehouseId', warehouseController.deleteWarehouse);

router.get('/filter/:warehouseName', warehouseController.getWarehouseStock);
router.get('/:warehouseId/stock', warehouseController.getWarehouseByName);
router.get('/:warehouseId/addresses', warehouseController.getWarehouseAddresses);

export default router;
