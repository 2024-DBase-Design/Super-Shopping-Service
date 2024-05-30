import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../server/sequelize';

export interface WarehouseAttributes {
  id: number;
  capacity: number;
}

export interface WarehouseCreationAttributes extends Optional<WarehouseAttributes, 'id'> {}

class Warehouse
  extends Model<WarehouseAttributes, WarehouseCreationAttributes>
  implements WarehouseAttributes
{
  public id!: number;
  public capacity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Warehouse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'warehouses'
  }
);

// Warehouse.hasMany(Stock, { foreignKey: 'warehouseId' });
// Stock.belongsTo(Warehouse, { foreignKey: 'warehouseId' });

export default Warehouse;
