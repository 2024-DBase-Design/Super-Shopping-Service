enum DeliveryPlanType {
  Standard = 'standard',
  Express = 'express'
}

export interface DeliveryPlan {
  type: DeliveryPlanType;
  price: number;
  deliveryDate: string;
  sentDate: string;
}
