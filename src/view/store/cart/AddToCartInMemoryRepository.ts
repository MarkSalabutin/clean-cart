import { Product } from "../../../domain/Product";
import { CartService } from '../../../services/cartService';
import { AddToCartRepository } from "../../../useCases/addToCart";

export default class AddToCartInMemoryRepository implements AddToCartRepository {
  constructor(private readonly cartService: CartService) {}

  addProducts(products: Product[]): void {
    this.cartService.addProducts(products);
  }

  getProducts(): Product[] {
    return this.cartService.getProducts();
  }
}
