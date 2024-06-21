import { prisma } from '../index';
import { Request, Response } from 'express';
import { registerCustomer } from './authController';
import { Prisma, Product } from '@prisma/client';

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
