import { User } from "./User";
import { CreditCard } from "./CreditCard";
import { Product } from "../product/Product";

export interface ProductWithQuantity {
  product: Product;
  quantity: number;
}

export interface Customer extends User {
  creditCards: CreditCard[];
  balance: number;
  cart: ProductWithQuantity[];
}
