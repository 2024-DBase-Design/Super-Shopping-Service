import { Router } from 'express';
import * as warehouseController from '../controllers/warehouseController';

const router = Router();

router.post('/', warehouseController.addWarehouse);
router.get('/', warehouseController.getWarehouses);
router.get('/:warehouseId', warehouseController.getWarehouseDetails);
router.put('/:warehouseId', warehouseController.updateWarehouse);
router.delete('/:warehouseId', warehouseController.deleteWarehouse);

router.get('/filter/:warehouseName', warehouseController.getWarehouseByName);
router.get('/:warehouseId/stock', warehouseController.getWarehouseStock);
router.get('/:warehouseId/addresses', warehouseController.getWarehouseAddresses);
router.get('/available_space', warehouseController.getWarehouseNotFull);

export default router;
