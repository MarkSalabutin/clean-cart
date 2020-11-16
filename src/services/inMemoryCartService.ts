import { Product } from '../domain/Product';
import { CartService } from './cartService';

export default class InMemoryCartService implements CartService {
  private products: Product[] = [];

  getProducts(): Product[] {
    return this.products;
  }

  addProducts(products: Product[]): void {
    this.products = this.products.concat(products);
  }
}
