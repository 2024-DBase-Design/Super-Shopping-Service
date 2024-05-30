import { DeliveryPlan } from '../delivery/DeliveryPlan';
import { ShoppingCartItem } from './ShoppingCartItem';
import CreditCard from '../user/CreditCard';
import { Model, Optional, DataTypes } from 'sequelize';
import sequelize from '../../server/sequelize';

/**
 * Enum defining the possible statuses for an Order.
 */
export enum OrderStatus {
  ISSUED = 'issued',
  SENT = 'sent',
  RECEIVED = 'received'
}

/**
 * Interface defining the unique attributes of the Order model.
 */
export interface OrderAttributes {
  id: string;
  customerId: string;
  items: ShoppingCartItem[];
  status: OrderStatus;
  cardUsed: CreditCard;
  deliveryPlan: DeliveryPlan;
}

export interface OrderCreationAttributes
  extends Optional<OrderAttributes, 'id'> {}

/**
 * Order model class definition.
 *
 * This class extends the Sequelize Model class and implements the OrderAttributes interface.
 * It defines the shape of the Order table and includes methods for interacting with order data.
 */
export class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: string;
  public customerId!: string;
  public items!: ShoppingCartItem[];
  public status!: OrderStatus;
  public cardUsed!: CreditCard;
  public deliveryPlan!: DeliveryPlan;
}

/**
 * Define the unique attributes for the Order model.
 */
Order.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    customerId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    items: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: []
    },
    status: {
      type: DataTypes.ENUM(...Object.values(OrderStatus)),
      allowNull: false,
      defaultValue: OrderStatus.ISSUED
    },
    cardUsed: {
      type: DataTypes.JSON,
      allowNull: false
    },
    deliveryPlan: {
      type: DataTypes.JSON,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'orders'
  }
);
