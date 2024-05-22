import { Product } from "./Product";

export interface AddProductRequest extends Product {
  price: number;
}
