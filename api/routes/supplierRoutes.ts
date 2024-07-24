import { Router } from 'express';
import * as supplierController from '../controllers/supplierController';

const router = Router();

router.post('/', supplierController.addSupplier);
router.get('/', supplierController.getSuppliers);
router.get('/:supplierId', supplierController.getSupplierById);
router.put('/:supplierId', supplierController.updateSupplier);
router.delete('/:supplierId', supplierController.deleteSupplier);

router.post('/:supplierId/address', supplierController.addAddress);
router.get('/:supplierId/address', supplierController.getAddress);
router.put('/:supplierId/address/:addressId', supplierController.updateAddress);
router.delete('/:supplierId/address/:addressId', supplierController.deleteAddress);

router.post('/:supplierId/products', supplierController.addProduct);
router.get('/:supplierId/products', supplierController.getProducts);
router.get('/:supplierId/products/:productId', supplierController.getProductById);
router.put('/:supplierId/products/:productId', supplierController.updateProduct);
router.delete('/:supplierId/products/:productId', supplierController.deleteProduct);

export default router;
