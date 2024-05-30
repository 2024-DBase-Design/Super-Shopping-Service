import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../server/sequelize';
import Address from './Address';

export interface CreditCardAttributes {
  id: number;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  billingAddressId: number; // Foreign key associated with Address
  customerId: number; // Foreign key associated with Customer
}

export interface CreditCardCreationAttributes
  extends Optional<CreditCardAttributes, 'id'> {}

class CreditCard
  extends Model<CreditCardAttributes, CreditCardCreationAttributes>
  implements CreditCardAttributes
{
  public id!: number;
  public cardNumber!: string;
  public expiryDate!: string;
  public cvv!: string;
  public billingAddressId!: number;
  public customerId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CreditCard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiryDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cvv: {
      type: DataTypes.STRING,
      allowNull: false
    },
    billingAddressId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'addresses',
        key: 'id'
      }
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    tableName: 'creditCards'
  }
);

CreditCard.belongsTo(Address, {
  foreignKey: 'billingAddressId',
  as: 'billingAddress'
});

export default CreditCard;
