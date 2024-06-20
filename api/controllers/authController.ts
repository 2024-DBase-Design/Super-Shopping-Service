import jwt from 'jsonwebtoken';
import { prisma } from '../index';
import { Request, Response } from 'express';
import { hashPassword, comparePassword } from '../utils/auth';

/**
 * Register a new customer.
 *
 * @param data Request object.
 * @returns
 */
export const registerCustomer = async (data: Request) => {
  const customer = await prisma.customer.create({
    data: {
      ...data.body,
      password: await hashPassword(data.body.password),
      cart: {}
    }
  });
  return customer;
};

/**
 * Register a new staff.
 *
 * @param data Request object.
 * @returns
 */
export const registerStaff = async (data: Request) => {
  const staff = await prisma.staff.create({
    data: {
      ...data.body,
      password: await hashPassword(data.body.password)
    }
  });
  return staff;
};

/**
 * Login a user.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const user =
      (await prisma.customer.findUnique({ where: { email } })) ||
      (await prisma.staff.findUnique({ where: { email } }));

    if (!user) return res.status(400).send('User not found');

    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');

    const role = user instanceof prisma.customer.constructor ? 'customer' : 'staff';
    const token = jwt.sign(
      { id: user.id, email: user.email, role },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '1h' }
    );

    return res.json({ token });
  } catch (error) {
    console.error('Error logging in user:', (error as Error).message);
    return res.status(500).json({ error: (error as Error).message });
  }
};

// /**
//  * Login a customer.
//  *
//  * @param req Express request object.
//  * @param res Express response object.
//  */
// export const loginCustomer = async (req: Request, res: Response) => {
//   try {
//     const customer = await prisma.customer.findUnique({ where: { email: req.body.email } });
//     if (!customer) {
//       return res.status(404).json({ error: 'Customer not found' });
//     }
//     const isValid = await comparePassword(req.body.password, customer.password);
//     if (!isValid) {
//       return res.status(401).json({ error: 'Invalid password' });
//     }
//     res.status(200).json(customer);
//   } catch (error) {
//     console.error('Error logging in customer:', (error as Error).message);
//     res.status(500).json({ error: (error as Error).message });
//   }
// };

// /**
//  * Login a staff.
//  *
//  * @param email
//  * @param password
//  * @returns
//  */
// export const loginStaff = async (req: Request, res: Response) => {
//   try {
//     const staff = await prisma.staff.findUnique({ where: { email: req.body.email } });
//     if (!staff) {
//       return res.status(404).json({ error: 'Staff not found' });
//     }
//     const isValid = await comparePassword(req.body.password, staff.password);
//     if (!isValid) {
//       return res.status(401).json({ error: 'Invalid password' });
//     }
//     return staff;
//   } catch (error) {
//     console.error('Error logging in staff:', (error as Error).message);
//     res.status(500).json({ error: (error as Error).message });
//   }
// };
