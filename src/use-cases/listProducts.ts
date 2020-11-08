import { Product } from "../domain/Product";
import { EffectHandler } from "./EffectHandler";

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

export default class ListProducts {
  constructor(private readonly effectHandler: ListProductsEffectHandler, private readonly repository: ListProductsRepository) {}
  execute() {
    let products;
    try {
      products = this.repository.getProducts();
      this.effectHandler.handle({ type: ListProductsEffectType.LIST_PRODUCTS, products });
    } catch (err) {
      this.effectHandler.handle({ type: ListProductsEffectType.NOTIFY_LIST_PRODUCTS_FAILED, products: [] });
    }
  }
}
