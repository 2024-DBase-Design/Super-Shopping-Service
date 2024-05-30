import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../server/sequelize';
import Warehouse from '../warehouse/Warehouse';

export enum AddressType {
  DELIVERY = 'delivery',
  BILLING = 'billing',
  WAREHOUSE = 'warehouses',
  SUPPLIER = 'supplier'
}

export enum AddressableType {
  CUSTOMER = 'customer',
  STAFF = 'staff',
  WAREHOUSE = 'warehouses',
  SUPPLIER = 'supplier'
}

export interface AddressAttributes {
  id: number;
  addressLineOne: string;
  addressLineTwo?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  type: AddressType;
  addressableId: number; // Foreign key to associate with User
  addressableType: AddressableType;
}

interface AddressCreationAttributes extends Optional<AddressAttributes, 'id'> {}

class Address
  extends Model<AddressAttributes, AddressCreationAttributes>
  implements AddressAttributes
{
  public id!: number;
  public addressLineOne!: string;
  public addressLineTwo?: string;
  public city!: string;
  public state!: string;
  public zip!: string;
  public country!: string;
  public type!: AddressType;
  public addressableId!: number;
  public addressableType!: AddressableType;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    addressLineOne: {
      type: DataTypes.STRING,
      allowNull: false
    },
    addressLineTwo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(...Object.values(AddressType)),
      allowNull: false
    },
    addressableId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    addressableType: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'addresses'
  }
);

Warehouse.hasOne(Address, {
  as: 'addresses',
  foreignKey: 'addressableId',
  constraints: false,
  scope: {
    addressableType: AddressableType.WAREHOUSE
  }
});

Address.belongsTo(Warehouse, {
  foreignKey: 'addressableId',
  constraints: false,
  as: 'warehouses'
});

export default Address;
