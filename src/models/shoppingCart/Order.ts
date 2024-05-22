import { DeliveryPlan } from "../delivery/DeliveryPlan";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { CreditCard } from "../user/CreditCard";

export interface Order {
  id: string;
  customerId: string;
  items: ShoppingCartItem[];
  status: "issued" | "sent" | "received";
  cardUsed: CreditCard;
  deliveryPlan: DeliveryPlan;
}
