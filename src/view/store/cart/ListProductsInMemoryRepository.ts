import { Product } from "../../../domain/Product";
import { ListProductsRepository } from "../../../useCases/listProducts";

export default class ListProductsInMemoryRepository implements ListProductsRepository {
  getProducts(): Product[] {
    return [];
  }
}
