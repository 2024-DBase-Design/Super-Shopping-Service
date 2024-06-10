// import { Request, Response } from 'express';
// import { Warehouse, Address, AddressableType, Stock } from '../models';

// /**
//  * Create a new warehouse.
//  *
//  * @param req Express request object.
//  * @param res Express response object.
//  */
// export const addWarehouse = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { capacity, address } = req.body;
//     const newWarehouse = await Warehouse.create({ capacity });
//     await Address.create({
//       ...address,
//       addressableId: newWarehouse.id,
//       addressableType: AddressableType.WAREHOUSE
//     });
//     res.status(201).json(newWarehouse);
//   } catch (error) {
//     console.error('Error creating warehouse:', (error as Error).message);
//     res.status(500).json({ error: (error as Error).message });
//   }
// };

// /**
//  * Get all warehouses.
//  *
//  * @param req Express request object.
//  * @param res Express response object.
//  */
// export const getWarehouses = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const warehouses = await Warehouse.findAll({
//       include: [
//         {
//           model: Address,
//           as: 'addresses',
//           where: { addressableType: AddressableType.WAREHOUSE }
//         }
//       ]
//     });
//     res.status(200).json(warehouses);
//   } catch (error) {
//     console.error('Error fetching warehouses:', (error as Error).message);
//     res.status(500).json({ error: (error as Error).message });
//   }
// };

// /**
//  * Get details for a specific warehouse.
//  *
//  * @param req Express request object.
//  * @param res Express response object.
//  */
// export const getWarehouseDetails = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { warehouseId } = req.params;
//     const warehouse = await Warehouse.findByPk(warehouseId, {
//       include: [
//         {
//           model: Address,
//           as: 'addresses',
//           where: { addressableType: AddressableType.WAREHOUSE }
//         }
//       ]
//     });
//     if (!warehouse) {
//       res.status(404).json({ error: 'Warehouse not found' });
//       return;
//     }
//     res.status(200).json(warehouse);
//   } catch (error) {
//     console.error('Error fetching warehouse details:', (error as Error).message);
//     res.status(500).json({ error: (error as Error).message });
//   }
// };

// /**
//  * Update an existing warehouse.
//  *
//  * @param req Express request object.
//  * @param res Express response object.
//  */
// export const updateWarehouse = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { warehouseId } = req.params;
//     const { capacity, address } = req.body;
//     await Warehouse.update({ capacity }, { where: { id: warehouseId } });
//     await Address.update(address, { where: { addressableId: warehouseId } });
//     res.status(200).json({ message: 'Warehouse updated successfully' });
//   } catch (error) {
//     console.error('Error updating warehouse:', (error as Error).message);
//     res.status(500).json({ error: (error as Error).message });
//   }
// };

// /**
//  * Delete a warehouse.
//  *
//  * @param req Express request object.
//  * @param res Express response object.
//  */
// export const deleteWarehouse = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { warehouseId } = req.params;
//     await Warehouse.destroy({ where: { id: warehouseId } });
//     res.status(200).json({ message: 'Warehouse deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting warehouse:', (error as Error).message);
//     res.status(500).json({ error: (error as Error).message });
//   }
// };

// /**
//  * Get all the warehouse's stock.
//  *
//  * @param req Express request object.
//  * @param res Express response object.
//  */
// export const getWarehouseStock = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { warehouseId } = req.params;
//     const stock = await Stock.findAll({ where: { warehouseId } });
//     res.status(200).json(stock);
//   } catch (error) {
//     console.error('Error fetching warehouse stock:', (error as Error).message);
//     res.status(500).json({ error: (error as Error).message });
//   }
// };
