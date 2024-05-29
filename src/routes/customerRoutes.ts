import { Router } from "express";
import * as customerController from "../controllers/customerController";

const router = Router();

router.post("/", customerController.createCustomer);
router.get("/:customerId", customerController.getCustomerDetails);
router.put("/:customerId", customerController.updateCustomerDetails);
router.delete("/:customerId", customerController.deleteCustomerAccount);

router.post("/:customerId/creditCards", customerController.addCreditCard);
router.get("/:customerId/creditCards", customerController.getCreditCards);
router.put("/:customerId/creditCards/:cardId", customerController.updateCreditCard);
router.delete("/:customerId/creditCards/:cardId", customerController.deleteCreditCard);

router.post("/:customerId/addresses", customerController.addAddress);
router.get("/:customerId/addresses", customerController.getAddresses);
router.put("/:customerId/addresses/:addressId", customerController.updateAddress);
router.delete("/:customerId/addresses/:addressId", customerController.deleteAddress);

router.post("/:customerId/cart", customerController.addToCart);
router.get("/:customerId/cart", customerController.getCartItems);
router.put("/:customerId/cart/:itemId", customerController.updateCartItem);
router.delete("/:customerId/cart/:itemId", customerController.removeCartItem);

// router.post("/:customerId/orders", customerController.submitOrder);

export default router;
