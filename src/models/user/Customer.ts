import { DataTypes } from 'sequelize';
import sequelize from '../../server/sequelize';
import User, { UserAttributes } from './User';
import { CreditCard } from "./CreditCard";
import { Product } from "../product/Product";

/**
 * Interface defining the unique attributes of the Customer model.
 */
interface CustomerAttributes extends UserAttributes {
  creditCards: CreditCard[];
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
  public creditCards!: CreditCard[];
  public balance!: number;
  public cart!: ProductWithQuantity[];
}

/**
 * Define the unique attributes for the Customer model.
 */
const customerAttributes = {
  creditCards: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: false,
    defaultValue: [],
  },
  balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  },
  cart: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: false,
    defaultValue: [],
  },
};

/**
 * Initialize the Customer model.
 * 
 * This method maps the Customer class to the customers table in the database.
 * It defines the schema of the customers table, including column types and constraints.
 */
Customer.init({
  ...User.getAttributes(),
  ...customerAttributes
}, {
    sequelize,
    tableName: 'customers',
});

export default Customer;

export interface ProductWithQuantity {
  product: Product;
  quantity: number;
}