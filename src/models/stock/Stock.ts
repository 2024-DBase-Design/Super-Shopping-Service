import { Model, Optional, DataTypes } from 'sequelize';
import sequelize from '../../server/sequelize';
import Product from '../product/Product';
import Warehouse from '../warehouse/Warehouse';

export interface StockAttributes {
  id: number;
  productId: number;
  warehouseId: number;
  quantity: number;
}

export interface StockCreationAttributes extends Optional<StockAttributes, 'id'> {}
class Stock extends Model<StockAttributes, StockCreationAttributes> implements StockAttributes {
  public id!: number;
  public productId!: number;
  public warehouseId!: number;
  public quantity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Stock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'stocks'
  }
);

Product.hasMany(Stock, { as: 'stocks', foreignKey: 'productId' });
Stock.belongsTo(Product, { as: 'products', foreignKey: 'productId' });

Warehouse.hasMany(Stock, { as: 'stocks', foreignKey: 'warehouseId' });
Stock.belongsTo(Warehouse, { as: 'warehouses', foreignKey: 'warehouseId' });

export default Stock;
