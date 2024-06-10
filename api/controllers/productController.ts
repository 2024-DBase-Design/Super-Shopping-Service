// import { Request, Response } from 'express';
// import { Product } from '../models';
// import { Op, WhereOptions } from 'sequelize';

// /**
//  * Add a new product.
//  *
//  * @param req Express request object.
//  * @param res Express response object.
//  */
// export const addProduct = async (req: Request, res: Response) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(201).json(product);
//   } catch (error) {
//     console.error('Error adding product:', (error as Error).message);
//     res.status(500).json({ error: (error as Error).message });
//   }
// };

// /**
//  * Get a product by ID.
//  *
//  * @param req Express request object.
//  * @param res Express response object.
//  */
// export const getProductDetails = async (req: Request, res: Response) => {
//   try {
//     const product = await Product.findByPk(req.params.productId);
//     res.status(200).json(product);
//   } catch (error) {
//     console.error('Error getting product by ID:', (error as Error).message);
//     res.status(500).json({ error: (error as Error).message });
//   }
// };

// /**
//  * Get all products.
//  *
//  * @param req Express request object.
//  * @param res Express response object.
//  */
// export const getAllProducts = async (req: Request, res: Response) => {
//   try {
//     const products = await Product.findAll();
//     res.status(200).json(products);
//   } catch (error) {
//     console.error('Error getting products:', (error as Error).message);
//     res.status(500).json({ error: (error as Error).message });
//   }
// };

// /**
//  * Update product details.
//  *
//  * @param req Express request object.
//  * @param res Express response object.
//  */
// export const updateProduct = async (req: Request, res: Response) => {
//   try {
//     const product = await Product.findByPk(req.params.productId);
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }
//     await product.update(req.body);
//     res.status(200).json(product);
//   } catch (error) {
//     console.error('Error updating product:', (error as Error).message);
//     res.status(500).json({ error: (error as Error).message });
//   }
// };

// /**
//  * Delete a product.
//  *
//  * @param req Express request object.
//  * @param res Express response object.
//  */
// export const deleteProduct = async (req: Request, res: Response) => {
//   try {
//     const product = await Product.findByPk(req.params.productId);
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }
//     await product.destroy();
//     res.status(204).end();
//   } catch (error) {
//     console.error('Error deleting product:', (error as Error).message);
//     res.status(500).json({ error: (error as Error).message });
//   }
// };

// /**
//  * Search for products by name, category, brand, size, or description.
//  *
//  * @param req Express request object.
//  * @param res Express response object.
//  */
// export const searchProducts = async (req: Request, res: Response) => {
//   try {
//     const { name, category, brand, size, description } = req.query;
//     // add explit type here

//     const whereClause: WhereOptions = {};

//     if (name) {
//       whereClause.name = { [Op.iLike]: `%${name}%` };
//     }
//     if (category) {
//       whereClause.category = { [Op.iLike]: `%${category}%` };
//     }
//     if (brand) {
//       whereClause.brand = { [Op.iLike]: `%${brand}%` };
//     }
//     if (size) {
//       whereClause.size = { [Op.iLike]: `%${size}%` };
//     }
//     if (description) {
//       whereClause.description = { [Op.iLike]: `%${description}%` };
//     }

//     const products = await Product.findAll({
//       where: whereClause
//     });
//     res.status(200).json(products);
//   } catch (error) {
//     console.error('Error searching products:', (error as Error).message);
//     res.status(500).json({ error: (error as Error).message });
//   }
// };
