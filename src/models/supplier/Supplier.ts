import { Address } from "../user/Address";
import { Product } from "../product/Product";

export interface Supplier {
  name: string;
  address: Address;
  products: Product[];
}
