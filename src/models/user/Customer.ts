import { DataTypes } from 'sequelize';
import sequelize from '../../server/sequelize';
import User, { UserAttributes } from './User';
import CreditCard, { CreditCardCreationAttributes } from './CreditCard';
import Address from './Address';
import { ProductWithQuantity } from '../warehouse/ProductWithQuantity';

/**
 * Interface defining the unique attributes of the Customer model.
 */
export interface CustomerAttributes extends UserAttributes {
  balance: number;
  cart: ProductWithQuantity[];
}

/**
 * Customer model class definition.
 *
 * This class extends the User model class and implements the CustomerAttributes interface.
 * It defines the shape of the Customer table and includes methods for interacting with customer data.
 */
class Customer extends User implements CustomerAttributes {
  public balance!: number;
  public cart!: ProductWithQuantity[];

  // Method to add a credit card to the customer
  public async addCreditCard(newCreditCard: CreditCardCreationAttributes): Promise<number> {
    const newCard = await CreditCard.create({
      ...newCreditCard,
      customerId: this.id
    });
    return newCard.id;
  }
}

/**
 * Define the unique attributes for the Customer model.
 */
const customerAttributes = {
  balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0
  },
  cart: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false,
    defaultValue: []
  }
};

/**
 * Initialize the Customer model.
 *
 * This method maps the Customer class to the customers table in the database.
 * It defines the schema of the customers table, including column types and constraints.
 */
Customer.init(
  {
    ...User.getAttributes(),
    ...customerAttributes
  },
  {
    sequelize,
    tableName: 'customers'
  }
);

Customer.hasMany(CreditCard, { foreignKey: 'customerId', as: 'creditCards' });
Customer.hasMany(Address, {
  foreignKey: 'addressableId',
  constraints: false,
  scope: { addressableType: 'customer' }
});

CreditCard.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });
Address.belongsTo(Customer, {
  foreignKey: 'addressableId',
  constraints: false
});

export default Customer;
