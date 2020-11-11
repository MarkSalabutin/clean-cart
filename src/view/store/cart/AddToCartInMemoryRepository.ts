import { Product } from "../../../domain/Product";
import { AddToCartRepository } from "../../../useCases/addToCart";

export default class AddToCartInMemoryRepository
  implements AddToCartRepository {
  private products: Product[] = [];

  addProducts(products: Product[]): void {
    this.products = this.products.concat(products);
  }

  getProducts(): Product[] {
    return this.products;
  }
}
