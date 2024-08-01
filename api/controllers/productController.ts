import { prisma } from '../index';
import { Request, Response } from 'express';
import { Prisma, Product } from '@prisma/client';
import { ProductWithWarehouses, WarehouseProductInfo } from '@/app/supplier/products/[id]/page';

/**
 * Add a new product.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const addProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.create({
      data: req.body
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error adding product:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get all products.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error getting products:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get a product by ID.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const getProductDetails = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(req.params.productId)
      }
    });
    res.status(200).json(product);
  } catch (error) {
    console.error('Error getting product by ID:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Update product details.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.update({
      where: {
        id: parseInt(req.params.productId)
      },
      data: req.body
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Delete a product.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.delete({
      where: {
        id: parseInt(req.params.productId)
      }
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting product:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Search for products by name, category, brand, size, or description.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { name, category, brand, size, description } = req.query;
    // add explit type here

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: name as string } },
          { category: { contains: category as string } },
          { brand: { contains: brand as string } },
          { size: { contains: size as string } },
          { description: { contains: description as string } }
        ]
      }
    });
    if (!products.length) {
      return res.status(404).json({ error: 'No products found' });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error('Error searching products:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get all warehouses that have a product in stock.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const getProductsWarehouses = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.productId);
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid productId' });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId
      },
      include: {
        stocks: {
          include: {
            warehouse: true
          }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Extract warehouse information from the stocks
    const warehouses: WarehouseProductInfo[] = product.stocks.map((stock) => ({
      id: stock.warehouseId,
      name: stock.warehouse.name,
      stock: stock.quantity
    }));

    // Construct the response object
    const response: ProductWithWarehouses = {
      product,
      warehouses
    };

    // Return the response with status 200
    res.status(200).json(response);
  } catch (error) {
    console.error('Error getting product warehouses:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get the stock for a product.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const getProductStock = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.productId);
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid productId' });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId
      },
      include: {
        stocks: true
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Calculate the total stock for the product
    const totalStock = product.stocks.reduce((total, stock) => total + stock.quantity, 0);

    // Return the total stock with status 200
    res.status(200).json({ totalStock });
  } catch (error) {
    console.error('Error getting product stock:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};
