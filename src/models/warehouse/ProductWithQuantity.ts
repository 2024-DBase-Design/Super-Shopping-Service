import Product from '../product/Product';

export interface ProductWithQuantity {
  product: Product;
  quantity: number;
}
