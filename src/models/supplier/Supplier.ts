import Address from '../user/Address';
import { Model, Optional, DataTypes } from 'sequelize';
import sequelize from '../../server/sequelize';

export interface SupplierAttributes {
  id: number;
  name: string;
}

export interface SupplierCreationAttributes extends Optional<SupplierAttributes, 'id'> {}

class Supplier
  extends Model<SupplierAttributes, SupplierCreationAttributes>
  implements SupplierAttributes
{
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Supplier.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'suppliers'
  }
);

Supplier.hasOne(Address, {
  foreignKey: 'addressableId',
  constraints: false,
  scope: { addressableType: 'supplier' }
});

// Supplier.hasMany(Product, { as: 'products', foreignKey: 'supplierId' });
// Product.belongsTo(Supplier, { as: 'supplier', foreignKey: 'supplierId' });

export default Supplier;
