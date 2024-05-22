export interface DeliveryPlan {
  type: "standard" | "express";
  price: number;
  deliveryDate: string;
  sentDate: string;
}
