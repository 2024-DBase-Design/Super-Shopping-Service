import { prisma } from '../index';
import { Request, Response } from 'express';
import { registerCustomer } from './authController';
import { Prisma, Product } from '@prisma/client';

interface ShoppingCartItem {
  product: Product;
  quantity: number;
}

/**
 * Create a new customer.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer_token = await registerCustomer(req);
    res.status(201).json(customer_token);
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
    const customer = await prisma.customer.findUnique({
      where: { id: Number(req.params.customerId) }
    });
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
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
    const customer = await prisma.customer.update({
      where: { id: Number(req.params.customerId) },
      data: req.body
    });
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
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
    const customer = await prisma.customer.delete({
      where: { id: Number(req.params.customerId) }
    });
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
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
    const customer = await prisma.customer.findUnique({
      where: { id: Number(req.params.customerId) }
    });
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }

    const { cardNumber, expiryDate, cvv, billingAddress } = req.body;
    let { billingAddressId } = req.body;

    if (!billingAddressId && !billingAddress) {
      res.status(400).json({ error: 'Billing address ID or details required' });
      return;
    }

    if (billingAddressId && billingAddress) {
      res.status(400).json({ error: 'Provide either billing address ID or details' });
      return;
    }

    if (!billingAddressId) {
      const newAddressData = { ...billingAddress, customerId: customer.id };
      const newAddress = await prisma.address.create({ data: newAddressData });
      billingAddressId = newAddress.id;
    }

    const newCreditCard = {
      cardNumber,
      expiryDate,
      cvv,
      billingAddressId,
      customerId: customer.id
    };

    const cardId = await prisma.creditCard.create({ data: newCreditCard });

    res.status(201).json({ message: 'Credit card added successfully', cardId: cardId });
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
    const customer = await prisma.customer.findUnique({
      where: { id: Number(req.params.customerId) }
    });
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
    const creditCards = await prisma.creditCard.findMany({
      where: { customerId: customer.id }
    });
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
    const customer = await prisma.customer.findUnique({
      where: { id: Number(req.params.customerId) }
    });
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
    const creditCard = await prisma.creditCard.update({
      where: { id: Number(req.params.cardId), customerId: customer.id },
      data: req.body
    });
    if (!creditCard) {
      res.status(404).json({ error: 'Credit card not found' });
      return;
    }
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
    const customer = await prisma.customer.findUnique({
      where: { id: Number(req.params.customerId) }
    });
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
    const creditCard = await prisma.creditCard.delete({
      where: { id: Number(req.params.cardId), customerId: customer.id }
    });
    if (!creditCard) {
      res.status(404).json({ error: 'Credit card not found' });
      return;
    }
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
    const customer = await prisma.customer.findUnique({
      where: { id: Number(req.params.customerId) }
    });
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
    const newAddress = await prisma.address.create({
      data: { ...req.body, customerId: customer.id }
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
    const customer = await prisma.customer.findUnique({
      where: { id: Number(req.params.customerId) }
    });
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
    const addresses = await prisma.address.findMany({
      where: { customerId: customer.id }
    });
    if (!addresses) {
      res.status(404).json({ error: 'Addresses not found' });
      return;
    }
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
    const customer = await prisma.customer.findUnique({
      where: { id: Number(req.params.customerId) }
    });
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
    const address = await prisma.address.update({
      where: { id: Number(req.params.addressId), customerId: customer.id },
      data: req.body
    });
    if (!address) {
      res.status(404).json({ error: 'Address not found' });
      return;
    }
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
    const customer = await prisma.customer.findUnique({
      where: { id: Number(req.params.customerId) }
    });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    const address = await prisma.address.delete({
      where: { id: Number(req.params.addressId), customerId: customer.id }
    });
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }
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
    const customer = await prisma.customer.findUnique({
      where: {
        id: Number(req.params.customerId)
      }
    });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    const { productId, quantity } = req.body;
    const product = await prisma.product.findUnique({
      where: { id: Number(productId) }
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const item = {
      product: {
        ...product,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString()
      },
      quantity
    };
    (customer.cart as Prisma.JsonArray).push(item);
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
    const customer = await prisma.customer.findUnique({
      where: { id: Number(req.params.customerId) }
    });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer.cart);
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
    const customer = await prisma.customer.findUnique({
      where: { id: Number(customerId) }
    });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    const { quantity } = req.body;
    const cartItems = customer.cart as unknown as ShoppingCartItem[];
    if (Array.isArray(cartItems)) {
      const itemIndex = cartItems.findIndex((item) => item.product.id === Number(itemId));
      if (itemIndex !== -1) {
        cartItems[itemIndex].quantity = quantity;
      } else {
        console.error('Item not found in cart');
      }
    } else {
      console.error('Cart is not a valid array of ShoppingCartItems');
    }
    const updatedCustomer = await prisma.customer.update({
      where: { id: Number(customerId) },
      data: { cart: cartItems as unknown as Prisma.JsonArray }
    });
    res.json(updatedCustomer.cart);
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
    const customer = await prisma.customer.findUnique({
      where: { id: Number(customerId) }
    });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    const cartItems = customer.cart as unknown as ShoppingCartItem[];
    if (Array.isArray(cartItems)) {
      const itemIndex = cartItems.findIndex((item) => item.product.id === Number(itemId));
      if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
      } else {
        console.error('Item not found in cart');
      }
    } else {
      console.error('Cart is not a valid array of ShoppingCartItems');
    }
    await prisma.customer.update({
      where: { id: Number(customerId) },
      data: { cart: cartItems as unknown as Prisma.JsonArray }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error removing cart item:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

// /**
//  * Submit an order for a customer.
//  *
//  * @param req Express request object.
//  * @param res Express response object.
//  */
export const submitOrder = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;
    const { cardId, deliveryPlan } = req.body;

    const customer = await prisma.customer.findUnique({
      where: { id: Number(customerId) }
    });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Validate the card used
    const cardUsed = await prisma.creditCard.findUnique({
      where: { id: cardId, customerId: customer.id }
    });
    if (!cardUsed) {
      return res.status(400).json({ error: 'Invalid card used' });
    }

    const items: ShoppingCartItem[] = customer.cart as unknown as ShoppingCartItem[];

    items.forEach(async (item) => {
      const product = await prisma.product.findUnique({
        where: { id: item.product.id }
      });
      if (!product) {
        return res.status(404).json({ error: 'Cart product not found' });
      }

      customer.balance += item.quantity * product.price;
    });

    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        status: 'ISSUED',
        items: customer.cart as unknown as Prisma.JsonArray,
        cardUsed: cardUsed.id,
        deliveryPlan
      }
    });

    await prisma.customer.update({
      where: { id: customer.id },
      data: { cart: [], balance: customer.balance }
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error submitting order:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

// /**
//  * Get a customer's orders.
//  *
//  * @param req Express request object.
//  * @param res Express response object.
//  */
export const getOrders = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;
    const orders = await prisma.order.findMany({
      where: { customerId: Number(customerId) }
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get a customer's order details.
 *
 * @param req
 * @param res
 * @returns
 */
export const getOrderDetails = async (req: Request, res: Response) => {
  try {
    const { customerId, orderId } = req.params;
    const order = await prisma.order.findUnique({
      where: { id: String(orderId), customerId: Number(customerId) }
    });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Update a customer's order status.
 *
 * @param req
 * @param res
 */
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { customerId, orderId } = req.params;
    const { status } = req.body;

    const order = await prisma.order.update({
      where: { id: String(orderId), customerId: Number(customerId) },
      data: { status }
    });
    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Delete a customer's order.
 *
 * @param req
 * @param res
 */
export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const { customerId, orderId } = req.params;
    await prisma.order.delete({
      where: { id: String(orderId), customerId: Number(customerId) }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting order:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};
