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
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

// export const updateCustomerDetails = (req: Request, res: Response) => {
//   const { customerId } = req.params;
//   const updatedDetails = req.body;
//   let customer = customers.find((c) => c.id === customerId) as Customer;
//   if (customer) {
//     customer = { ...customer, ...updatedDetails };
//     customers = customers.map((c) => (c.id === customerId ? customer : c));
//     res.json(customer);
//   } else {
//     res.status(404).json({ message: "Customer not found" });
//   }
// };

// export const deleteCustomerAccount = (req: Request, res: Response) => {
//   const { customerId } = req.params;
//   customers = customers.filter((c) => c.id !== customerId);
//   res.status(204).send();
// };

// export const addCreditCard = (req: Request, res: Response) => {
//   const { customerId } = req.params;
//   const newCard: CreditCard = req.body;
//   const customer = customers.find((c) => c.id === customerId);
//   if (customer) {
//     customer.creditCards.push(newCard);
//     res.status(201).json(newCard);
//   } else {
//     res.status(404).json({ message: "Customer not found" });
//   }
// };

// export const getCreditCards = (req: Request, res: Response) => {
//   const { customerId } = req.params;
//   const customer = customers.find((c) => c.id === customerId);
//   if (customer) {
//     res.json(customer.creditCards);
//   } else {
//     res.status(404).json({ message: "Customer not found" });
//   }
// };

// export const updateCreditCard = (req: Request, res: Response) => {
//   const { customerId, cardId } = req.params;
//   const updatedCard = req.body;
//   const customer = customers.find((c) => c.id === customerId);
//   if (customer) {
//     const cardIndex = customer.creditCards.findIndex((c) => c.id === cardId);
//     if (cardIndex !== -1) {
//       customer.creditCards[cardIndex] = {
//         ...customer.creditCards[cardIndex],
//         ...updatedCard,
//       };
//       res.json(customer.creditCards[cardIndex]);
//     } else {
//       res.status(404).json({ message: "Credit card not found" });
//     }
//   } else {
//     res.status(404).json({ message: "Customer not found" });
//   }
// };

// export const deleteCreditCard = (req: Request, res: Response) => {
//   const { customerId, cardId } = req.params;
//   const customer = customers.find((c) => c.id === customerId);
//   if (customer) {
//     customer.creditCards = customer.creditCards.filter((c) => c.id !== cardId);
//     res.status(204).send();
//   } else {
//     res.status(404).json({ message: "Customer not found" });
//   }
// };

// export const addAddress = (req: Request, res: Response) => {
//   const { customerId } = req.params;
//   const newAddress: Address = req.body;
//   const customer = customers.find((c) => c.id === customerId);
//   if (customer) {
//     customer.addresses.push(newAddress);
//     res.status(201).json(newAddress);
//   } else {
//     res.status(404).json({ message: "Customer not found" });
//   }
// };

// export const getAddresses = (req: Request, res: Response) => {
//   const { customerId } = req.params;
//   const customer = customers.find((c) => c.id === customerId);
//   if (customer) {
//     res.json(customer.addresses);
//   } else {
//     res.status(404).json({ message: "Customer not found" });
//   }
// };

// export const updateAddress = (req: Request, res: Response) => {
//   const { customerId, addressId } = req.params;
//   const updatedAddress = req.body;
//   const customer = customers.find((c) => c.id === customerId);
//   if (customer) {
//     const addressIndex = customer.addresses.findIndex(
//       (a: { id: string }) => a.id === addressId
//     );
//     if (addressIndex !== -1) {
//       customer.addresses[addressIndex] = {
//         ...customer.addresses[addressIndex],
//         ...updatedAddress,
//       };
//       res.json(customer.addresses[addressIndex]);
//     } else {
//       res.status(404).json({ message: "Address not found" });
//     }
//   } else {
//     res.status(404).json({ message: "Customer not found" });
//   }
// };

// export const deleteAddress = (req: Request, res: Response) => {
//   const { customerId, addressId } = req.params;
//   const customer = customers.find((c) => c.id === customerId);
//   if (customer) {
//     customer.addresses = customer.addresses.filter((a) => a.id !== addressId);
//     res.status(204).send();
//   } else {
//     res.status(404).json({ message: "Customer not found" });
//   }
// };

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
