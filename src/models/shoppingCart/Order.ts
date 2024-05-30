import { DeliveryPlan } from "../delivery/DeliveryPlan";
import { ShoppingCartItem } from "./ShoppingCartItem";
import CreditCard from "../user/CreditCard";
import { Model, Optional, DataTypes } from "sequelize";
import sequelize from "../../server/sequelize";

/**
 * Enum defining the possible statuses for an Order.
 */
export enum OrderStatus {
  ISSUED = "issued",
  SENT = "sent",
  RECEIVED = "received"
}

/**
 * Interface defining the unique attributes of the Order model.
 */
export interface OrderAttributes  {
  id: string;
  customerId: string;
  items: ShoppingCartItem[];
  status: OrderStatus;
  cardUsed: CreditCard;
  deliveryPlan: DeliveryPlan;
}

export interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

export class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: string;
  public customerId!: string;
  public items!: ShoppingCartItem[];
  public status!: OrderStatus;
  public cardUsed!: CreditCard;
  public deliveryPlan!: DeliveryPlan;
}

Order.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    customerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    items: {
      type: DataTypes.JSONB, // Use JSONB to store array of objects
      allowNull: false,
      defaultValue: [],
    },
    status: {
      type: DataTypes.ENUM(...Object.values(OrderStatus)),
      allowNull: false,
      defaultValue: OrderStatus.ISSUED,
    },
    cardUsed: {
      type: DataTypes.JSONB, // Use JSONB to store the CreditCard object
      allowNull: false,
    },
    deliveryPlan: {
      type: DataTypes.JSONB, // Use JSONB to store the DeliveryPlan object
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'orders',
  }
);