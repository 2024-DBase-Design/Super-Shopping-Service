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

let customers: Customer[] = [];
let orders: Order[] = [];

/**
 * Create a new customer.
 * 
 * @param req Express request object.
 * @param res Express response object.
 */
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const user = await Customer.create(req.body);
    res.status(201).json(user);
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
    res.json(customer);
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

    await customer.addCreditCard(newCreditCard);

    res.status(201).json({ message: 'Credit card added successfully' });
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

// export const addToCart = (req: Request, res: Response) => {
//   const { customerId } = req.params;
//   const newItem: ProductWithQuantity = { product: req.body, quantity: 1 };
//   const customer = customers.find((c) => c.id === customerId);
//   if (customer) {
//     customer.cart.push(newItem);
//     res.status(201).json(newItem);
//   } else {
//     res.status(404).json({ message: "Customer not found" });
//   }
// };

// export const getCartItems = (req: Request, res: Response) => {
//   const { customerId } = req.params;
//   const customer = customers.find((c) => c.id === customerId);
//   if (customer) {
//     res.json(customer.cart);
//   } else {
//     res.status(404).json({ message: "Customer not found" });
//   }
// };

// export const updateCartItem = (req: Request, res: Response) => {
//   const { customerId, itemId } = req.params;
//   const { quantity } = req.body;
//   const customer = customers.find((c) => c.id === customerId);
//   if (customer) {
//     const itemIndex = customer.cart.findIndex(
//       (item) => item.product.id === itemId
//     );
//     if (itemIndex !== -1) {
//       customer.cart[itemIndex].quantity = quantity;
//       res.json(customer.cart[itemIndex]);
//     } else {
//       res.status(404).json({ message: "Item not found in cart" });
//     }
//   } else {
//     res.status(404).json({ message: "Customer not found" });
//   }
// };

// export const removeCartItem = (req: Request, res: Response) => {
//   const { customerId, itemId } = req.params;
//   const customer = customers.find((c) => c.id === customerId);
//   if (customer) {
//     customer.cart = customer.cart.filter((item) => item.product.id !== itemId);
//     res.status(204).send();
//   } else {
//     res.status(404).json({ message: "Customer not found" });
//   }
// };

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
