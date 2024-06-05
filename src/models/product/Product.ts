import { Model, Optional, DataTypes } from 'sequelize';
import sequelize from '../../server/sequelize';
import Supplier from '../supplier/Supplier';

export interface ProductAttributes {
  id: number;
  image?: string;
  name: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  size: string;
  supplierId: number;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public image?: string | undefined;
  public name!: string;
  public price!: number;
  public category!: string;
  public brand!: string;
  public size!: string;
  public description!: string;
  public supplierId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'products'
  }
);

Supplier.hasMany(Product, { as: 'products', foreignKey: 'supplierId' });
Product.belongsTo(Supplier, { as: 'supplier', foreignKey: 'supplierId' });

export default Product;
