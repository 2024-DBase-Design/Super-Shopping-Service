import { Request, Response } from 'express';
import { Staff, Address, AddressableType } from '../models';
/**
 * Create a new staff.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const createStaff = async (req: Request, res: Response) => {
  try {
    const staff = await Staff.create(req.body);
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
    const staff = await Staff.findAll();
    if (staff.length === 0) {
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
    const staff = await Staff.findByPk(req.params.staffId);
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
    const staff = await Staff.findByPk(req.params.staffId);
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    await staff.update(req.body);
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
    const staff = await Staff.findByPk(req.params.staffId);
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    await staff.destroy();
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
    const staff = await Staff.findByPk(req.params.staffId);
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    const address = await Address.create({
      ...req.body,
      addressableId: staff.id,
      addressableType: AddressableType.STAFF
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
    const staff = await Staff.findByPk(req.params.staffId);
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    const address = await Address.findOne({
      where: {
        addressableId: staff.id,
        addressableType: AddressableType.STAFF
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
    const staff = await Staff.findByPk(req.params.staffId);
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    const address = await Address.findOne({
      where: {
        addressableId: staff.id,
        addressableType: AddressableType.STAFF
      }
    });
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }
    await address.update(req.body);
    res.status(200).json(address);
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
    const staff = await Staff.findByPk(req.params.staffId);
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    const address = await Address.findOne({
      where: {
        addressableId: staff.id,
        addressableType: AddressableType.STAFF
      }
    });
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }
    await address.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting staff address:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};
