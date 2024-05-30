import { Request, Response } from 'express';
import { Supplier, Product, Stock, AddressableType, Address } from '../models';

/**
 * Create a new supplier.
 *
 * @param req Express request object.
 * @param res Express response object.
 */
export const addSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const newSupplier = await Supplier.create({ name });
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
    const suppliers = await Supplier.findAll();
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
    const supplier = await Supplier.findByPk(supplierId);
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
    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier) {
      res.status(404).json({ error: 'Supplier not found' });
      return;
    }
    await supplier.update({ name });
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
    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier) {
      res.status(404).json({ error: 'Supplier not found' });
      return;
    }
    await supplier.destroy();
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
    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier) {
      res.status(404).json({ error: 'Supplier not found' });
      return;
    }
    const newAddress = await Address.create({
      ...req.body,
      addressableId: supplier.id,
      addressableType: AddressableType.SUPPLIER
    });
    res.status(201).json(newAddress);
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
    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier) {
      res.status(404).json({ error: 'Supplier not found' });
      return;
    }
    const address = await Address.findOne({
      where: {
        addressableId: supplier.id,
        addressableType: AddressableType.SUPPLIER
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
    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier) {
      res.status(404).json({ error: 'Supplier not found' });
      return;
    }
    const address = await Address.findOne({
      where: {
        addressableId: supplier.id,
        addressableType: AddressableType.SUPPLIER
      }
    });
    if (!address) {
      res.status(404).json({ error: 'Address not found' });
      return;
    }
    await address.update(req.body);
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
    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier) {
      res.status(404).json({ error: 'Supplier not found' });
      return;
    }
    const address = await Address.findOne({
      where: {
        addressableId: supplier.id,
        addressableType: AddressableType.SUPPLIER
      }
    });
    if (!address) {
      res.status(404).json({ error: 'Address not found' });
      return;
    }
    await address.destroy();
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
    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier) {
      res.status(404).json({ error: 'Supplier not found' });
      return;
    }
    const newProduct = await Product.create(
      { ...req.body, supplierId: supplier.id },
      { include: [{ model: Stock, as: 'stocks' }] }
    );
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
    const supplier = await Supplier.findByPk(supplierId, {
      include: [{ model: Product, as: 'products', include: [{ model: Stock, as: 'stocks' }] }]
    });
    if (!supplier) {
      res.status(404).json({ error: 'Supplier not found' });
      return;
    }
    res.status(200).json(supplier);
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
    const product = await Supplier.findByPk(supplierId, {
      include: [{ model: Product, as: 'products', where: { id: productId } }]
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
    const product = await Supplier.findByPk(supplierId, {
      include: [{ model: Product, as: 'products', where: { id: productId } }]
    });
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    await product.update(req.body);
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
    const product = await Product.findByPk(productId, {
      include: [{ model: Supplier, as: 'supplier', where: { id: supplierId } }]
    });
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    await product.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting product:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message });
  }
};
