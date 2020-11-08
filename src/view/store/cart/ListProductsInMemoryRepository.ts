import { Product } from "../../../domain/Product";
import { ListProductsRepository } from "../../../use-cases/listProducts";

export default class ListProductsInMemoryRepository implements ListProductsRepository {
  getProducts(): Product[] {
    return [];
  }
}
