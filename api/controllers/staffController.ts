import { prisma } from '../index';
import { Request, Response } from 'express';
import { registerStaff } from './authController';

/**
 * Create a new staff.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const createStaff = async (req: Request, res: Response) => {
  try {
    const staff = await registerStaff(req.body);
    res.status(201).json(staff);
  } catch (error) {
    console.error('Error creating staff:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get all staff.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const getStaff = async (req: Request, res: Response) => {
  try {
    const staff = await prisma.staff.findMany();
    if (!staff) {
      return res.status(404).json({ error: 'No staff found' });
    }
    res.status(200).json(staff);
  } catch (error) {
    console.error('Error getting staff:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get a staff by ID.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const getStaffDetails = async (req: Request, res: Response) => {
  try {
    const staff = await prisma.staff.findUnique({
      where: {
        id: parseInt(req.params.staffId)
      }
    });
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    res.status(200).json(staff);
  } catch (error) {
    console.error('Error getting staff by ID:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Update staff details.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const updateStaffDetails = async (req: Request, res: Response) => {
  try {
    const staff = await prisma.staff.update({
      where: {
        id: parseInt(req.params.staffId)
      },
      data: req.body
    });
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    res.status(200).json(staff);
  } catch (error) {
    console.error('Error updating staff details:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Delete a staff account.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const deleteStaffAccount = async (req: Request, res: Response) => {
  try {
    const staff = await prisma.staff.delete({
      where: {
        id: parseInt(req.params.staffId)
      }
    });
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting staff account:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Add an address to a staff member.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const addAddress = async (req: Request, res: Response) => {
  try {
    const staff = await prisma.staff.findUnique({
      where: {
        id: parseInt(req.params.staffId)
      }
    });
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    const address = await prisma.address.create({
      data: {
        ...req.body,
        staffId: staff.id
      }
    });
    res.status(201).json(address);
  } catch (error) {
    console.error('Error adding address to staff:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get a staff member's address.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const getAddress = async (req: Request, res: Response) => {
  try {
    const staff = await prisma.staff.findUnique({
      where: {
        id: parseInt(req.params.staffId)
      }
    });
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    const address = await prisma.address.findFirst({
      where: {
        staffId: staff.id
      }
    });
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }
    res.status(200).json(address);
  } catch (error) {
    console.error('Error getting staff address:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Update a staff member's address.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const updateAddress = async (req: Request, res: Response) => {
  try {
    const staff = await prisma.staff.findUnique({
      where: {
        id: parseInt(req.params.staffId)
      }
    });
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    const address = await prisma.address.findFirst({
      where: {
        staffId: staff.id
      }
    });
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }
    const updatedAddress = await prisma.address.update({
      where: {
        id: address.id
      },
      data: req.body
    });
    res.status(200).json(updatedAddress);
  } catch (error) {
    console.error('Error updating staff address:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Delete a staff member's address.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const staff = await prisma.staff.findUnique({
      where: {
        id: parseInt(req.params.staffId)
      }
    });
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    const address = await prisma.address.findFirst({
      where: {
        staffId: staff.id
      }
    });
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }
    await prisma.address.delete({
      where: {
        id: address.id
      }
    });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting staff address:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};
