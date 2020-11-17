import { Product } from '../domain/Product';

export interface CartService {
  getProducts(): Product[];
  addProducts(products: Product[]): void;
}