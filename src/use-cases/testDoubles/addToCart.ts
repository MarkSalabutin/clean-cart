import { Product } from "../../domain/Product";
import { AddToCartRepository, AddToCartEffectHandler, AddToCartEffect } from "../addToCart";

export class MockAddToCartRepository implements AddToCartRepository {
  products: Product[] = [];

  addProducts(products: Product[]) {
    this.products = this.products.concat(products);
  }

  getProducts() {
    return this.products;
  }
}

export class MockAddToCartEffectHandler implements AddToCartEffectHandler {
  handledEffects: AddToCartEffect[] = []
  handle(effect: AddToCartEffect): void {
    this.handledEffects.push(effect)
  }
}
