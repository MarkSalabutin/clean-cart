import { Product } from "../../../domain/Product";
import { CartService } from '../../../services/cartService';
import { ListProductsRepository } from "../../../useCases/listProducts";

export default class ListProductsInMemoryRepository implements ListProductsRepository {
  constructor(private readonly cartService: CartService) {}

  getProducts(): Product[] {
    return this.cartService.getProducts();
  }
}
