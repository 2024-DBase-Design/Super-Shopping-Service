import { Request, Response } from "express";
import {
  Customer,
  CreditCard,
  Address,
  ProductWithQuantity,
  Order,
  ShoppingCartItem,
  DeliveryPlan,
} from "../models";
import { AddressableType } from "../models/user/Address";

/**
 * Create a new customer.
 * 
 * @param req Express request object.
 * @param res Express response object.
 */
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.create(req.body);
    const customerDetails = {
      ...customer.get(),
      cart: customer.getCart(),
    };
    res.status(201).json(customerDetails);
  } catch (error) {
    console.error('Error creating customer:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get a customer by ID.
 * 
 * @param req Express request object.
 * @param res Express response object.
 */
export const getCustomerDetails = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    const customerDetails = {
      ...customer.get(),
      cart: customer.getCart(),
    };
    res.json(customerDetails);
  } catch (error) {
    console.error('Error fetching user:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Update a customer's details.
 * 
 * @param req Express request object.
 * @param res Express response object.
 */
export const updateCustomerDetails = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    await customer.update(req.body);
    res.json(customer);
  } catch (error) {
    console.error('Error updating user:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Delete a customer's account.
 * 
 * @param req Express request object.
 * @param res Express response object.
 */
export const deleteCustomerAccount = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    await customer.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Add a credit card to a customer's account.
 * 
 * @param req Express request object.
 * @param res Express response object.
 */
export const addCreditCard = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const { cardNumber, expiryDate, cvv, billingAddress } = req.body;

    const newAddress = await Address.create({
      ...billingAddress,
      addressableId: customer.id,
      addressableType: AddressableType.CUSTOMER,
    });

    const newCreditCard = {
      cardNumber,
      expiryDate,
      cvv,
      billingAddressId: newAddress.id,
      customerId: customer.id,
    };

    const cardId = await customer.addCreditCard(newCreditCard);

    res.status(201).json({ message: 'Credit card added successfully', cardId: cardId});
  } catch (error) {
    console.error('Error adding credit card:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get a customer's credit cards.
 * 
 * @param req Express request object.
 * @param res Express response object.
 */
export const getCreditCards = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    const creditCards = await CreditCard.findAll({ where: { customerId: customer.id } });
    res.json(creditCards);
  } catch (error) {
    console.error('Error fetching credit cards:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Update a customer's credit card details.
 * 
 * @param req Express request object.
 * @param res Express response object.
 */
export const updateCreditCard = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    const creditCard = await CreditCard.findByPk(req.params.cardId);
    if (!creditCard) {
      return res.status(404).json({ error: 'Credit card not found' });
    }
    await creditCard.update(req.body);
    res.json(creditCard);
  } catch (error) {
    console.error('Error updating credit card:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Delete a customer's credit card.
 * 
 * @param req Express request object.
 * @param res Express response object.
 */
export const deleteCreditCard = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    const creditCard = await CreditCard.findByPk(req.params.cardId);
    if (!creditCard) {
      return res.status(404).json({ error: 'Credit card not found' });
    }
    await creditCard.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting credit card:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Add a customer's address.
 * 
 * @param req Express request object.
 * @param res Express response object.
 */
export const addAddress = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const newAddress = await Address.create({
      ...req.body,
      addressableId: customer.id,
      addressableType: AddressableType.CUSTOMER,
    });

    res.status(201).json(newAddress);
  } catch (error) {
    console.error('Error adding address:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  
  }
};

/**
 * Get a customer's addresses.
 * 
 * @param req Express request object.
 * @param res Express response object.
 */
export const getAddresses = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    const addresses = await Address.findAll({ where: { addressableId: customer.id } });
    res.json(addresses);
  } catch (error) {
    console.error('Error fetching addresses:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Update a customer's address.
 * 
 * @param req Express request object.
 * @param res Express response object.
 */
export const updateAddress = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    const address = await Address.findByPk(req.params.addressId);
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }
    await address.update(req.body);
    res.json(address);
  } catch (error) {
    console.error('Error updating address:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Delete a customer's address.
 * 
 * @param req Express request object.
 * @param res Express response object.
 */
export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    const address = await Address.findByPk(req.params.addressId);
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }
    await address.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting address:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Add to a customer's cart items.
 * 
 * @param req Express request object.
 * @param res Express response object.
 */
export const addToCart = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    const { product, quantity } = req.body;
    const item: ProductWithQuantity = { product, quantity };
    const currentCart = customer.getCart();
    currentCart.push(item);
    customer.setCart(currentCart);
    await customer.save();
    res.status(201).json(item);
  } catch (error) {
    console.error('Error adding to cart:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get a customer's cart items.
 * 
 * @param req Express request object.
 * @param res Express response object.
 */
export const getCartItems = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer.getCart());
  } catch (error) {
    console.error('Error fetching cart items:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Update a customer's cart item.
 * 
 * @param req Express request object.
 * @param res Express response object.
 */
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const { customerId, itemId } = req.params;
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    const { quantity } = req.body;
    const cart = customer.getCart();
    const itemIndex = cart.findIndex((item) => item.product.id === Number(itemId));
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }
    cart[itemIndex].quantity = quantity;
    customer.setCart(cart);
    await customer.save();
    res.json(cart[itemIndex]);
  } catch (error) {
    console.error('Error updating cart item:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Remove a customer's cart item.
 * 
 * @param req Express request object.
 * @param res Express response object.
 */
export const removeCartItem = async (req: Request, res: Response) => {
  try {
    const { customerId, itemId } = req.params;
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    const cart = customer.getCart();
    const itemIndex = cart.findIndex((item) => item.product.id === Number(itemId));
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }
    cart.splice(itemIndex, 1);
    customer.setCart(cart);

    await customer.save();
    res.status(204).send();
  } catch (error) {
    console.error('Error removing cart item:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

// export const submitOrder = (req: Request, res: Response) => {
//   const { customerId } = req.params;
//   const {
//     items,
//     cardUsed,
//     deliveryPlan,
//   }: {
//     items: ShoppingCartItem[];
//     cardUsed: CreditCard;
//     deliveryPlan: DeliveryPlan;
//   } = req.body;
//   const customer = customers.find((c) => c.id === customerId);
//   if (customer) {
//     const newOrder: Order = {
//       id: "order-" + new Date().getTime(),
//       customerId,
//       items,
//       status: "issued",
//       cardUsed,
//       deliveryPlan,
//     };
//     orders.push(newOrder);
//     res.status(201).json(newOrder);
//   } else {
//     res.status(404).json({ message: "Customer not found" });
//   }
// };
