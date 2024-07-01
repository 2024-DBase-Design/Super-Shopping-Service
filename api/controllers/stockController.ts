import { prisma } from '../index';
import { Request, Response } from 'express';

/**
 * Add a new stock.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const addStock = async (req: Request, res: Response) => {
  try {
    const { productId, warehouseId, quantity } = req.body;
    const product = await prisma.product.findUnique({
      where: {
        id: productId
      }
    });
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    const warehouse = await prisma.warehouse.findUnique({
      where: {
        id: warehouseId
      }
    });
    if (!warehouse) {
      res.status(404).json({ error: 'Warehouse not found' });
      return;
    }
    const newStock = await prisma.stock.create({
      data: {
        productId: product.id,
        warehouseId: warehouse.id,
        quantity
      }
    });
    res.status(201).json(newStock);
  } catch (error) {
    console.error('Error creating stock:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get all stock.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const getStock = async (req: Request, res: Response) => {
  try {
    const stock = await prisma.stock.findMany();
    res.status(200).json(stock);
  } catch (error) {
    console.error('Error getting stock:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get stock by ID.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const getStockDetails = async (req: Request, res: Response) => {
  try {
    const stock = await prisma.stock.findUnique({
      where: {
        id: parseInt(req.params.stockId)
      }
    });
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }
    res.status(200).json(stock);
  } catch (error) {
    console.error('Error getting stock by ID:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get stock by product Id.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const getStockByProductId = async (req: Request, res: Response) => {
  try {
    const stock = await prisma.stock.findMany({
      where: {
        productId: parseInt(req.params.productId)
      }
    });
    if (!stock) {
      res.status(404).json({ error: 'Stock not found' });
      return;
    }
    res.status(200).json(stock);
  } catch (error) {
    console.error('Error getting stock by product ID:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get stock by warehouse Id.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const getStockByWarehouseId = async (req: Request, res: Response) => {
  try {
    const stock = await prisma.stock.findMany({
      where: {
        warehouseId: parseInt(req.params.warehouseId)
      }
    });
    if (!stock) {
      res.status(404).json({ error: 'Stock not found' });
      return;
    }
    res.status(200).json(stock);
  } catch (error) {
    console.error('Error getting stock by warehouse ID:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Update stock details.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const updateStock = async (req: Request, res: Response) => {
  try {
    const stock = await prisma.stock.update({
      where: {
        id: parseInt(req.params.stockId)
      },
      data: req.body
    });
    if (!stock) {
      res.status(404).json({ error: 'Stock not found' });
      return;
    }
    res.status(200).json(stock);
  } catch (error) {
    console.error('Error updating stock:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Delete stock.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const deleteStock = async (req: Request, res: Response) => {
  try {
    const stock = await prisma.stock.delete({
      where: {
        id: parseInt(req.params.stockId)
      }
    });
    if (!stock) {
      res.status(404).json({ error: 'Stock not found' });
      return;
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting stock:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};
