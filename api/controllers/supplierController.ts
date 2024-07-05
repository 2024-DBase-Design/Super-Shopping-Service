import { prisma } from '../index';
import { Request, Response } from 'express';

/**
 * Create a new supplier.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const addSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const newSupplier = await prisma.supplier.create({
      data: { name }
    });
    res.status(201).json(newSupplier);
  } catch (error) {
    console.error('Error creating supplier:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get all suppliers.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const getSuppliers = async (req: Request, res: Response): Promise<void> => {
  try {
    const suppliers = await prisma.supplier.findMany();
    if (!suppliers) {
      res.status(404).json({ error: 'No suppliers found' });
      return;
    }
    res.status(200).json(suppliers);
  } catch (error) {
    console.error('Error getting suppliers:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get a supplier by ID.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const getSupplierById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { supplierId } = req.params;
    const supplier = await prisma.supplier.findUnique({
      where: {
        id: parseInt(supplierId)
      }
    });
    if (!supplier) {
      res.status(404).json({ error: 'Supplier not found' });
      return;
    }
    res.status(200).json(supplier);
  } catch (error) {
    console.error('Error getting supplier:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Update a supplier by ID.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const updateSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const { supplierId } = req.params;
    const { name } = req.body;
    const supplier = await prisma.supplier.update({
      where: {
        id: parseInt(supplierId)
      },
      data: { name }
    });
    if (!supplier) {
      res.status(404).json({ error: 'Supplier not found' });
      return;
    }
    res.status(200).json(supplier);
  } catch (error) {
    console.error('Error updating supplier:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Delete a supplier by ID.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const deleteSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const { supplierId } = req.params;
    await prisma.address.deleteMany({
      where: {
        supplierId: parseInt(supplierId)
      }
    });
    await prisma.product.deleteMany({
      where: {
        supplierId: parseInt(supplierId)
      }
    });
    const supplier = await prisma.supplier.delete({
      where: {
        id: parseInt(supplierId)
      }
    });
    if (!supplier) {
      res.status(404).json({ error: 'Supplier not found' });
      return;
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting supplier:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Add an address to a supplier.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const addAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { supplierId } = req.params;
    const supplier = await prisma.supplier.findUnique({
      where: {
        id: parseInt(supplierId)
      }
    });
    if (!supplier) {
      res.status(404).json({ error: 'Supplier not found' });
      return;
    }
    const address = await prisma.address.create({
      data: {
        ...req.body,
        supplierId: supplier.id
      }
    });
    if (!address) {
      res.status(404).json({ error: 'Address not created' });
      return;
    }
    res.status(201).json(address);
  } catch (error) {
    console.error('Error adding address:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get the address of a supplier.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const getAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { supplierId } = req.params;
    const supplier = await prisma.supplier.findUnique({
      where: {
        id: parseInt(supplierId)
      }
    });
    if (!supplier) {
      res.status(404).json({ error: 'Supplier not found' });
      return;
    }
    const address = await prisma.address.findFirst({
      where: {
        supplierId: supplier.id
      }
    });
    if (!address) {
      res.status(404).json({ error: 'Address not found' });
      return;
    }
    res.status(200).json(address);
  } catch (error) {
    console.error('Error getting address:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Update the address of a supplier.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const updateAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { supplierId } = req.params;
    const supplier = await prisma.supplier.findUnique({
      where: {
        id: parseInt(supplierId)
      }
    });
    if (!supplier) {
      res.status(404).json({ error: 'Supplier not found' });
      return;
    }
    const address = await prisma.address.updateMany({
      where: {
        supplierId: supplier.id
      },
      data: req.body
    });
    if (!address) {
      res.status(404).json({ error: 'Address not found' });
      return;
    }
    res.status(200).json(address);
  } catch (error) {
    console.error('Error updating address:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Delete the address of a supplier.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const deleteAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { supplierId } = req.params;
    const supplier = await prisma.supplier.findUnique({
      where: {
        id: parseInt(supplierId)
      }
    });
    if (!supplier) {
      res.status(404).json({ error: 'Supplier not found' });
      return;
    }
    const address = await prisma.address.deleteMany({
      where: {
        supplierId: supplier.id
      }
    });
    if (!address) {
      res.status(404).json({ error: 'Address not found' });
      return;
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting address:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Create a product for a supplier.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { supplierId } = req.params;
    const supplier = await prisma.supplier.findUnique({
      where: {
        id: parseInt(supplierId)
      }
    });
    if (!supplier) {
      res.status(404).json({ error: 'Supplier not found' });
      return;
    }
    const newProduct = await prisma.product.create({
      data: {
        ...req.body,
        supplierId: supplier.id
      }
    });
    if (!newProduct) {
      res.status(404).json({ error: 'Product not created' });
      return;
    }
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get all products for a supplier.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { supplierId } = req.params;
    const supplier_products = await prisma.supplier.findUnique({
      where: {
        id: parseInt(supplierId)
      },
      include: {
        products: true
      }
    });
    if (!supplier_products) {
      res.status(404).json({ error: 'No products found' });
      return;
    }
    res.status(200).json(supplier_products);
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
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { supplierId, productId } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
        supplierId: parseInt(supplierId)
      }
    });
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error getting product:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Update a product by ID.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { supplierId, productId } = req.params;
    const product = await prisma.product.update({
      where: {
        id: parseInt(productId),
        supplierId: parseInt(supplierId)
      },
      data: req.body
    });
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Delete a product by ID.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { supplierId, productId } = req.params;
    const product = await prisma.product.delete({
      where: {
        id: parseInt(productId),
        supplierId: parseInt(supplierId)
      }
    });
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting product:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};
