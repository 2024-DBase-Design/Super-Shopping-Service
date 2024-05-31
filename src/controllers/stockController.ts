import { Request, Response } from 'express';
import { Product, Stock, Warehouse } from '../models';

/**
 * Add a new stock.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const addStock = async (req: Request, res: Response) => {
  try {
    const { productId, warehouseId, quantity } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const warehouse = await Warehouse.findByPk(warehouseId);
    if (!warehouse) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }
    const newStock = await Stock.create({ productId, warehouseId, quantity });
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
    const stock = await Stock.findAll();
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
    const stock = await Stock.findByPk(req.params.stockId);
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
    const stock = await Stock.findAll({ where: { productId: req.params.productId } });
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
    const stock = await Stock.findAll({ where: { warehouseId: req.params.warehouseId } });
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
    const stock = await Stock.findByPk(req.params.stockId);
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }
    await stock.update(req.body);
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
    const stock = await Stock.findByPk(req.params.stockId);
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }
    await stock.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting stock:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};
