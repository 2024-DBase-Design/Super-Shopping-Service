import { parse } from 'path';
import { prisma } from '../index';
import { Request, Response } from 'express';

/**
 * Create a new warehouse.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const addWarehouse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { capacity, address } = req.body;
    const newWarehouse = await prisma.warehouse.create({
      data: capacity
    });
    await prisma.address.create({
      data: {
        ...address,
        warehouseId: newWarehouse.id
      }
    });
    res.status(201).json(newWarehouse);
  } catch (error) {
    console.error('Error creating warehouse:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get all warehouses.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const getWarehouses = async (req: Request, res: Response): Promise<void> => {
  try {
    const warehouses = await prisma.warehouse.findMany();
    res.status(200).json(warehouses);
  } catch (error) {
    console.error('Error fetching warehouses:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get details for a specific warehouse.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const getWarehouseDetails = async (req: Request, res: Response) => {
  try {
    const { warehouseId } = req.params;
    const warehouse = await prisma.warehouse.findUnique({
      where: {
        id: parseInt(warehouseId)
      }
    });
    if (!warehouse) {
      res.status(404).json({ error: 'Warehouse not found' });
      return;
    }
    res.status(200).json(warehouse);
  } catch (error) {
    console.error('Error fetching warehouse details:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Update an existing warehouse.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const updateWarehouse = async (req: Request, res: Response) => {
  try {
    const { warehouseId } = req.params;
    const { capacity, address } = req.body;
    if (!capacity && !address) {
      res.status(400).json({ error: 'No data provided for update' });
      return;
    }
    if (address) {
      await prisma.address.updateMany({
        where: { warehouseId: parseInt(warehouseId) },
        data: address
      });
    }
    if (capacity) {
      await prisma.warehouse.update({
        where: {
          id: parseInt(warehouseId)
        },
        data: capacity
      });
    }
    res.status(200).json({ message: 'Warehouse updated successfully' });
  } catch (error) {
    console.error('Error updating warehouse:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Delete a warehouse.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const deleteWarehouse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { warehouseId } = req.params;
    await prisma.address.deleteMany({
      where: {
        warehouseId: parseInt(warehouseId)
      }
    });
    await prisma.warehouse.delete({
      where: {
        id: parseInt(warehouseId)
      }
    });
    res.status(200).json({ message: 'Warehouse deleted successfully' });
  } catch (error) {
    console.error('Error deleting warehouse:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get all the warehouse's stock.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const getWarehouseStock = async (req: Request, res: Response): Promise<void> => {
  try {
    const { warehouseId } = req.params;
    const stock = await prisma.stock.findMany({
      where: {
        warehouseId: parseInt(warehouseId)
      }
    });
    res.status(200).json(stock);
  } catch (error) {
    console.error('Error fetching warehouse stock:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};
