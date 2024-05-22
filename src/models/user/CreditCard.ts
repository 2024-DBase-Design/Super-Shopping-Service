import { Address } from "./Address";

export interface CreditCard {
  id: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  billingAddress: Address;
}
