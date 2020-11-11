import { Product } from "../domain/Product";
import { EffectHandler } from "./EffectHandler";
import UseCase from './useCase';

export enum ListProductsEffectType {
  LIST_PRODUCTS = "LIST_PRODUCTS",
  NOTIFY_LIST_PRODUCTS_FAILED = "NOTIFY_LIST_PRODUCTS_FAILED",
}

export interface ListProductsEffect {
  type: ListProductsEffectType;
  products: Product[];
}

export type ListProductsEffectHandler = EffectHandler<ListProductsEffect>;

export interface ListProductsRepository {
  getProducts(): Product[];
}

export default class ListProducts extends UseCase<ListProductsEffect> {
  constructor(private readonly repository: ListProductsRepository) {
    super();
  }

  execute() {
    let products;
    try {
      products = this.repository.getProducts();
      this.handleEffect({ type: ListProductsEffectType.LIST_PRODUCTS, products });
    } catch (err) {
      this.handleEffect({ type: ListProductsEffectType.NOTIFY_LIST_PRODUCTS_FAILED, products: [] });
    }
  }
}
