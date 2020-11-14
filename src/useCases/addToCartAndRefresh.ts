import { Product } from '../domain/Product';
import AddToCartUseCase, { AddToCartEffect, AddToCartEffectType, AddToCartFlow } from './addToCart';
import { EffectHandler } from './EffectHandler';
import { ListProductsFlow } from './listProducts';

class AddToCartEffectHandler implements EffectHandler<AddToCartEffect> {
  constructor(private readonly listProducts: ListProductsFlow) {}

  handle(effect: AddToCartEffect): void {
    if (effect.type === AddToCartEffectType.NOTIFY_ADDED_TO_CART) {
      this.listProducts.execute();
    }
  }
}

export default class AddToCartAndRefreshUseCase implements AddToCartFlow {
  constructor(private readonly addToCart: AddToCartUseCase, private readonly listProducts: ListProductsFlow) {
    this.addToCart.addEffectHandler(new AddToCartEffectHandler(this.listProducts));
  }

  confirmAddDuplicates(): void {
    this.addToCart.confirmAddDuplicates();
  }

  abortAddDuplicates(): void {
    this.addToCart.abortAddDuplicates();
  }

  addProducts(products: Product[]): void {
    this.addToCart.addProducts(products);
  }
}
