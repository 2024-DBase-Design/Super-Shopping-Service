import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

router.post('/login/customer', authController.loginCustomer);
router.post('/login/staff', authController.loginStaff);

export default router;
